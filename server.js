const exp=require('express');
const bodyParser=require('body-parser');
const cors = require('cors')
const api=require('./routes/api')
var port = process.env.PORT || 4200;
const app=exp();
app.use(cors())
app.use(bodyParser.json());

app.use('/api',api);

const Port= port;

app.get('/',(req,res)=>{
res.send("hello from server");
})
app.listen(Port,()=>{
    console.log("server is running"+ port)
});