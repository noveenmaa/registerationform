const mongoose=require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/userdb',{ useUnifiedTopology: true,
useNewUrlParser: true,

autoIndex: true })
.then(()=>{
    console.log("the connection to database is setuped")
}).catch((err)=>{
    console.log(err)
})