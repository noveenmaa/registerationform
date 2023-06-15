const express=require('express')
const app = express()
const db=require('./db/connection')
const path=require('path')
const hbs=require('hbs')
const Register=require('./models/resgister')
const bcrypt = require("bcrypt");
const port=8000


app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,"../public")))

app.set('views',(path.join(__dirname,"../templates/views")))

app.set('view engine','hbs')

hbs.registerPartials((path.join(__dirname,"../templates/partials")))

app.get('/',(req,res)=>{
  res.render('index')
})  
app.get('/login',(req,res)=>{
    res.render('login')
  })  
  
  app.get('/resgister',(req,res)=>{
    res.render('resgister')
  })  

  app.get('/adim',(req,res)=>{
    res.render('adim')
  })  


  
  app.post('/resgister',async(req,res)=>{
    
    try {

     const password=req.body.password
     const cpassword=req.body.confirmpassword
    
     //console.log(req.body.age,req.body.phonenumber,req.body.gender,req.body.lastName,req.body.email)

     if(password===cpassword)
     {
   const employeeeData=new Register({
    
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    password:password,
    confirmpassword:cpassword,
    gender:req.body.gender,
    email:req.body.email,
    phonenumber:req.body.phonenumber,
    age:req.body.age
    

   })

const result=await employeeeData.save()
res.status(201).render("index")
//console.log(result)

     }
     else{
      res.send("the password are not matching")
     }
      
    } catch (error) {
      res.status(404).send(error)
    }
  })  


  app.post('/login',async(req,res)=>{

    try {
     
      const email=req.body.email
      const password=req.body.password

    const useremail=await Register.findOne({email:email})
    // res.send(useremail.password)
     console.log(useremail.password)
     console.log(password)

const databasepawrd= await bcrypt.compare(password,useremail.password)
console.log(databasepawrd)

if(databasepawrd){
  res.status(201).render("index")
}
else{
  res.status(401).send('the given detail is invalid')
}
      
    } catch (error) {
      res.status(404).send("the given detail is invalid")
    }

  })


app.listen(port,()=>{
    console.log("the port is listening ") 
})