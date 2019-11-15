
const mongoose=require('mongoose');

const Schema=mongoose.Schema


const UserSchema=new Schema({
    user_name: String,
    mobile: String,
    password: String
})
var Users=mongoose.model('user',UserSchema,'RegistrationDetails');


const Orderdetails=new Schema({
    src: String,
    name: String,
    price: String,
    description:String,
    size:String,
    crust:String,
    mobile:String,
    user_name:String,
    date: { type: Date, default: Date.now },
})
var orders = mongoose.model('order',Orderdetails, 'OrderDetails');


module.exports = {
 Users: Users,
 orders: orders,
};