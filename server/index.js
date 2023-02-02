const mongoose =require("mongoose");
const express =require("express");
const bodyParser=require("body-parser");

const app=express();
const cors =require('cors');
const FileUpload=require("express-fileupload");
app.use(express.static('uploads'));
const cookieparser=require('cookie-parser');
const session =require('express-session');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());
const {MongoClient} = require('mongodb');
app.use(cookieparser());
app.use(session({
path:"/",
key:"vipul",
secret:"123456",
resave:false,
saveUninitialized:false,
cookie:{
  
  maxAge:7200000,
}, 

}));


app.use(cors({
    origin:["http://localhost:3009"],
    methods:["POST","GET"],
    credentials:true,
  
   
 }));

 app.use(function (request, res, next) {
    res.header("Access-Control-Allow-Origin","http://localhost:3009");
  
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
   
  });

const uri="mongodb+srv://vipularora44:vipularora44@carpagesmongodb.hnp3nbj.mongodb.net/carpages_mern?retryWrites=true&w=majority";
mongoose.set('strictQuery', false);
connectDB();
async function connectDB() 
{
  
 try
 {
    mongoose.connect(uri, {
        useNewUrlParser:true,
        
        
    }).then(()=>{
        console.log("connected");
        app.listen(3010,()=>{
            console.log("working fine on port 3010");
        });  
    }).catch(err=>{
    console.log(err);
    });
  
 }
 catch(error)
 {
  console.error(error);
 }
}


const client = new MongoClient(uri);
//run();
async function run() {
  try {
    const database = client.db("carpages_mern");
    const listings = database.collection("listings");
    // create a filter to update all movies with a 'G' rating
   
    const result = await listings.updateMany({}, [ {$set:{ 
    "mileage" : {$toInt: "$mileage"},
    "price" : {$toInt: "$price"}}} ], {multi:true});
    
  } finally {
    await client.close();
  }
}
app.use(require('express-useragent').express())

app.use(FileUpload({
    useTempFiles:true,
    tempFileDir:'../src/images/dealer-images'
 }));
 
const users=require("./routes/user_routes");
const categories=require("./routes/categories_routes");
const listings=require("./routes/listing_route");
const watchlist=require("./routes/watchlist_routes");
app.use("/categories",categories);
app.use("/users",users);
app.use("/listings",listings);
app.use("/watchlist",watchlist);



  


