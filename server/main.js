import express from 'express'
import path from 'path'
import client from './client.js'


const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    client.getUsers(null,(err,data)=>{
        if(!err){
            res.send(data)
        }else{
            console.log(err);
            res.status(500).send({
                msg:"there was some issue"
            })
        }
    })
})

app.post("/add",(req,res)=>{
    const user =req.body;

    client.addUser(user,(err,data)=>{
        if(!err){
           console.log(data);
           res.send({
            messsage:"Data added successfully"
           })

        }else{
             console.log(err);
             res.status(500).send({
                msg:'There was some issue while adding user'
             })
        }
    })
})

app.listen(5000,()=>{
    console.log("Server started");
});
 
