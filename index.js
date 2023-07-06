const express = require('express')
const app = express()
const dotenv = require("dotenv")
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
const mongoose = require('mongoose')
dotenv.config()

let PORT = process.env.MY_PORT
let URI = process.env.MONGO_URI

mongoose.connect(URI)
.then(()=>{
    console.log('mongoose is connected');
})
.catch((err)=>{
    console.log(err);
})

let itemSchema = {
    item: {type: String, required: true, unique: true},
    price: {type: String, required: true},
    quantity: {type: String, required: true}
}

let budgetModel = mongoose.model('myNewBudget',itemSchema)


app.set('view engine','ejs')

app.get('/',(req,res)=>{
    res.render('items')
})

app.post('/details',(req,res)=>{
    let info = req.body;
    form = budgetModel(req.body)
    form.save()
    .then((result)=>{
        console.log(result);
        res.redirect('cart')
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.get('/cart',(req,res)=>{
    budgetModel.find() 
    .then((result)=>{
     res.render('cart',{itemDetails:result})
    })
    .catch((err)=>{
     console.log(err);
    })
 })
 app.post('/delete',(req,res)=>{
    budgetModel.deleteOne({item:req.body.newItem})
    .then((result)=>{
        console.log(result);
        res.redirect('cart')
    })
})

app.post('/edit',(req,res)=>{
    budgetModel.findOne({item:req.body.newItem})
    .then((result)=>{
        console.log(result);
        res.render('editusers',{newInfo:result})
    })
    .catch((err)=>{
        console.log(err);
    })
})
app.post('/update',(req,res)=>{
    budgetModel.updateOne({item:req.body.item},req.body)
    .then((result)=>{
        console.log(result);
        res.redirect('cart')
    })
    .catch((err)=>{
        console.log(err);
    })
})





app.listen(PORT,()=>{
    console.log(`connected at port ${PORT}`);
})