const express              = require('express');
const app                  = express();
const morgan               = require('morgan');
const bodyparser           = require('body-parser');
const prodectsRoutes       = require('./api/routes/products');
const ordersRoutes         = require('./api/routes/orders');
const mongoose             = require('mongoose');
const MongoClient          = require('mongodb').MongoClient;
require('dotenv').config();
uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@app.cwd2c.mongodb.net/<dbname>?retryWrites=true&w=majority`;
mongoose.connect(
   uri,
    (err) => {
        if(err) throw err;
        console.log("DB Connected Successfully");
    }
);
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

// routes app status
app.use(morgan('dev'));
//get post require
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
  });

// routes which should handil require
app.use('/prodects', prodectsRoutes);
app.use('/orders', ordersRoutes);
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status =404;
    next(error);
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message 
        }
    })
})

module.exports =app;