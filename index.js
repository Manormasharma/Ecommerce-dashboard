const express = require("express");
require("./db/config");
const User = require("./db/users");
const Product = require("./db/products");
const app = express();
const cors = require("cors");
const JWT = require("jsonwebtoken");
const jwtKey = 'e-comm'


app.use(express.json());
app.use(cors());
app.post("/register", async(req,res)=>{
    let user = new User(req.body);
    let result = await user.save()
    result = result.toObject();
    delete result.password
    JWT.sign({result},jwtKey, {expiresIn: "2h"}, (err, token)=>{
        if(err){
            res.send({result: "Something went wrong, Please try after some time"})
        }
        res.send({result, auth:token})  
    })
})
app.post("/login", async(req,res)=>{
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select("-password")
        if(user){
            JWT.sign({user},jwtKey, {expiresIn: "2h"}, (err, token)=>{
                if(err){
                    res.send({result: "Something went wrong, Please try after some time"})
                }
                res.send({user, auth:token})  
            })
        }else{
            res.send("No User Found")
        }    
    }else{
        res.send("No User Found")
    }

})
app.post('/addproduct', async(req, res)=>{
    let products = new Product(req.body)
    let result = await products.save()
    res.send(result)
})
// what save and send does
// what express json does (middle ware)? app.use

app.get("/products",async (req,res)=>{
    let products = await Product.find()
    if(products.length>0){
        res.send(products)    
    }else{
        res.send({result:"No Product Found"})
    }
});

app.delete("/product/:id", async(req, res)=>{
    let result = await Product.deleteOne({_id:req.params.id})
    res.send(result)
})

app.get("/product/:id", async(req,res)=>{
    let result = await Product.findOne({_id:req.params.id})
    if(result){
        res.send(result)
    }else{
        res.send({result: "No Record found"})
    }
})

app.get("/product/:id", async(req,res)=>{
    let result = await Product.findOne({_id:req.params.id})
    if(result){
        res.send(result)
    }else{
        res.send({result: "No Record found"})
    }
})
app.put("/product/:id", async(req,res)=>{
    let result = await Product.updateOne(
        {_id:req.params.id},
        {$set: req.body}
    )
    res.send(result)
    
})
app.get("/search/:key",async(req,res)=>{
    let result = await Product.find({
        "$or": [
            { product : {$regex: req.params.key} },
            { price : {$regex: req.params.key} },
            { category : {$regex: req.params.key} },
            { company : {$regex: req.params.key} },
        ]
    })
    if(result){ 
        res.send(result)
    }else{
        res.send({Result: "No Record Found"})
    }
})
app.listen(5000)