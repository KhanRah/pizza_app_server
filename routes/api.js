const express=require('express')
const router=express.Router();
const User=require('../models/user')
//  const OOrder=require('../models/user')
const mongoose=require('mongoose')

const db="mongodb://khan:khan123@ds237196.mlab.com:37196/flutterproject";


mongoose.connect(db,err =>{
    if(err){
        console.error("Error"+err)
    }
    else{
        console.log("connected to database")
    }
})
router.get('/',(req,res)=>{


    res.send("msg from api")
})

router.post('/register', (req, res) => {
    const userData = req.body;
 
    User.Users.
    findOne({ mobile: userData.mobile }, (error, Users) => {
        //console.log(user);
        if (error) {
            console.log(error)
        }
        else {
            if (Users) {
                res.status(401).send('Number Already exists')
            }
            else {
                let user = new User.Users(userData)
    user.save((error, registerd) => {
 
        if (error) {
            console.log(error);
        }
        else {
            res.status(200).send(registerd)
        }
    })
 
            }
        }
    }
    )
 
 })


router.post('/orderdetails',(req,res)=>{
    const orderData=req.body;
    let order=new User.orders(orderData)
    
    order.save((error,orderplaced)=>{
        if(error){
            console.log(error);
        }
        else{
            var FCM = require('fcm-node');
            var serverKey = 'AAAAEBFihmc:APA91bHx_4I6vDqUmtPlCDZo-HkaaW6Q4te-NfBqo2KQNKXB2E9gtBiFYAfrlKGBVYXP13fiiFn2p3w_iDfRKPiNWiw2548BsV4nQeyqiCzbeMW93YahYgznCo44bdP7bMqcMDogxJci'; //put your server key here
            var fcm = new FCM(serverKey);
         
            var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                to: 'fRhK0MFw0bk:APA91bEktxUWxuWySq2NEIwMdYl4nGh5H01iTNY1RilPPxG2sLtzfvJAG8BnMzkUECGRJjZgpausFqt5xT8AZNwvUsqMP5sM4IHiAJjrwvWqVow0of4Sj1buZrjtaIQBP-8grpHS9_8V',
                // collapse_key: 'your_collapse_key',
         
                notification: {
                    title: 'Order Placed by '+orderData.user_name,
                    body: orderData.name+' '+'with'+' '+orderData.size+' '+'and'+' '+orderData.crust,
                }
         
                // data: {  //you can send only notification or only data(or include both)
                //     my_key: 'my value',
                //     my_another_key: 'my another value'
                // }
            };
         
            fcm.send(message, function(err, response){
                if (err) {
                    console.log("Something has gone wrong!");
                } else {
                    console.log("Successfully sent with response: ", response);
                }
            })
            res.status(201).send(orderplaced)
        }
    })
})


router.post('/userorders',(req,res)=>{

    let userData=req.body;
 
    User.orders.
    find({ mobile: userData.mobile }, (error, orders) => {
        //console.log(user);
        if (error) {
            console.log(error)
        }
        else {
            if (orders.length==0) {
                res.status(401).send('No Orders Found')
            }
            else
                 {
                    res.status(200).send(orders)
 
            }
        }
    }
    )
 
 
 })



router.post('/login', (req, res) => {
    let userData = req.body;
 
    User.Users.
    findOne({ mobile: userData.mobile }, (error, Users) => {
        //console.log(user);
        if (error) {
            console.log(error)
        }
        else {
            if (!Users) {
                res.status(401).send('Invalid Mobile Number')
            }
            else {
                if (Users.password !== userData.password) {
                    res.status(401).send('Invalid Password')
                }
                else {
                    res.status(200).send(Users)
                }
            }
        }
    }
    )
 })
    router.put('/userupdate',(req,res)=>
{
console.log(req.body);
let userData=req.body;
var object=new mongoose.Types.ObjectId(userData._id);
       User.Users.update({"_id":object},{$set:{
"user_name":userData.user_name,
"mobile":userData.mobile,
}},(err,result)=>{
if(err) throw err;
// User.findOne({mobile:userData.mobile},(error,user)=>{
//     if(error){
//         console.log(error)
//     }
//         // else{
//         //     if(!user){
//         //         res.status(401).send('Invalid Mobile Number')
//         //     }
//         //     else{
//         //         if(user.password!==userData.password){
//         //             res.status(401).send('Invalid Password')
//         //         }
//                 // else{
//                 //     res.status(200).send(user)
//                 // }
//                 res.status(200).send("Updated Successfully")
//     }
// )
res.status(200).send('Updated Successfully')

})
})

    router.get('/vegitems',(req,res)=>{
        let vegitems=[{
            "src":"https://cdn.pixabay.com/photo/2016/02/19/11/30/pizza-1209748_1280.jpg",
            "name":"Deluxe Veggie",
            "price":"355",
            "description":"Veg delight-Onion,Capsicum,Grilled Mushroom,Corn and Paneer",
        },
        {
            "src":"https://image.shutterstock.com/image-photo/homemade-margarita-flatbread-pizza-tomato-450w-267495434.jpg",
            "name":"Veg Extravagnza",
            "price":"400",
            "description":"Olives,Veg delight-Onion,Capsicum,Grilled Mushroom,Corn.",
        },
        {
            "src":"https://cdn.pixabay.com/photo/2014/04/22/02/56/pizza-329523_1280.jpg",
            "name":"Farm House",
            "price":"325",
            "description":"Flavorful trio of juicy paneer,Crisp Capsicum.",
        },
        {
            "src":"https://cdn.pixabay.com/photo/2017/02/15/10/57/pizza-2068272_1280.jpg",
            "name":"Aussie Barbecue Veg",
            "price":"525",
            "description":"Straight Australian Outback",
        },
        {
            "src":"https://cdn.pixabay.com/photo/2016/02/19/11/30/pizza-1209748_1280.jpg",
            "name":"Indi Tandoori Paneer",
            "price":"345",
            "description":"It's hot.It's Spicy,Red papparika & mint mayo",
        },
      ]

        res.json(vegitems)

    }),
    router.get('/nonveg',(req,res)=>{
        let nonvegitems=[{
            "src":"https://media.gettyimages.com/photos/grilled-chicken-with-basil-pesto-sauce-and-goat-cheese-picture-id613556416",
            "name":"Non Veg Supreme",
            "price":"355",
            "description":"Supreme Combination of barbecue chicken and olives.",
        },
        {
            "src":"https://media.gettyimages.com/photos/chicken-pizza-picture-id503700873",
            "name":"Chicken Peproni",
            "price":"400",
            "description":"A Classic American taste!",
        },
        {
            "src":"https://media.gettyimages.com/photos/pizza-with-chicken-meat-and-broccoli-on-the-plate-picture-id1062103108",
            "name":"Chicken Golden Delight",
            "price":"345",
            "description":"Double pepper Barbecue Chicken",
        },
        {
            "src":"https://cdn.pixabay.com/photo/2015/02/01/05/20/supreme-pizza-619133_1280.png",
            "name":"Chicken Dominator",
            "price":"525",
            "description":"Loaded with double pepper barbecue chicken,peri-peri",
        },
        {
            "src":"https://cdn.pixabay.com/photo/2017/01/22/19/20/pizza-2000614_1280.jpg",
            "name":"Aussie Barbecue Chicken",
            "price":"345",
            "description":"Seasoned with herbs & Excotic Jamaican",
        }]

        res.json(nonvegitems)

    })

    router.get('/sides',(req,res)=>{
        let sides=[{
            "src":"https://cdn.pixabay.com/photo/2014/01/24/04/05/fried-chicken-250863_1280.jpg",
            "type":"https://pngimage.net/wp-content/uploads/2018/06/veg-logo-png-1.png",
            "name":"Marinated barbecue chicken.",
            "price":"229",
            "description":"Marinated with Olives and Juices from the Chicken",
        },
        {
            "src":"https://cdn.pixabay.com/photo/2017/09/03/07/10/shish-kebab-2709499_1280.jpg",
            "type":"https://pngimage.net/wp-content/uploads/2018/06/veg-logo-png-1.png",
            "name":"Rotisserie chicken",
            "price":"399",
            "description":"Freshly Baked Chicken with Steaks",
        },
        {
            "src":"https://cdn.pixabay.com/photo/2016/03/05/21/39/batter-1239027_1280.jpg",
            "type":"https://pngimage.net/wp-content/uploads/2018/06/veg-logo-png-1.png",
            "name":"Country Captain",
            "price":"179",
            "description":"Ultimate taste of chicken,With Country spices",
        }]
     
        res.json(sides)
     
     })
     
     router.get('/drinks',(req,res)=>{
        let drinks=[{
            "src":"https://cdn.pixabay.com/photo/2015/03/30/12/35/mojito-698499_1280.jpg",
            "name":"White Peach Mojito",
            "price":"169",
            "description":"Contains Lemon and Natural Contents",
        },
        {
            "src":"https://cdn.pixabay.com/photo/2018/11/28/15/19/alcohol-3843923_1280.jpg",
            "name":"Cherry Mojito",
            "price":"157",
            "description":"Muddle mint leaves with sugar",
        },
        {
            "src":"https://cdn.pixabay.com/photo/2015/09/02/13/26/cocktail-919074_1280.jpg",
            "name":"StrawBerry Mojito",
            "price":"189",
            "description":"Contains berry flavour and sugar",
        },
        {
            "src":"https://cdn.pixabay.com/photo/2016/12/14/07/11/fit-1905733_1280.jpg",
            "name":"Kentucky Mojitos",
            "price":"197",
            "description":"Mojito join the dark side by using dark rum instead of white.",
        }]
     
        res.json(drinks)
     
     })
     
     router.get('/dessertss',(req,res)=>{
        let desserts=[{
            "src":"https://cdn.pixabay.com/photo/2019/04/10/15/36/cake-4117292_1280.jpg",
            "name":"Cake Blue Berry Pie",
            "price":"389",
            "description":"Pie Delight With A Gooey Berry Volcano Centre",
        },
        {
            "src":"https://cdn.pixabay.com/photo/2016/11/29/11/38/blur-1869227_1280.jpg",
            "name":"Choco Truffle Cake",
            "price":"250",
            "description":"Classic Favourite, Rich Choco Cake",
        },
        {
            "src":"https://cdn.pixabay.com/photo/2017/04/18/21/28/bisquit-2240471_1280.jpg",
            "name":"Biquit Cake",
            "price":"379",
            "description":"Raspberry flovaour with creamy Vannila delight",
        }]
     
        res.json(desserts)
     
     })

    router.get('/customizze',(req,res)=>{
        let nonvegitems=[
            // {
            //     // "size":["Small","Medium","Large"],
            //     // "Crust":["Hand Tossed","White Thin Crust","Cheese Brust"]
            // },
             {
                "size":"small",
                "crust":"Hand Tossed"
            },
            {
                "size":"Medium",
                "crust":"White Thin Crust"
            },
            {
                "size":"Large",
                "crust":"Cheese Brust"
            },
           
        ]

        res.json(nonvegitems)

    }),

    router.get('/dessertcustomize',(req,res)=>{
        let nonvegitems=[
            // {
            //     // "size":["Small","Medium","Large"],
            //     // "Crust":["Hand Tossed","White Thin Crust","Cheese Brust"]
            // },
             {
                "size":"Half Kg",
                "crust":"Choco Chips"
            },
            {
                "size":"1 Kg",
                "crust":"Vannila Chips"
            },
            {
                "size":"2 Kg",
                "crust":"Berries"
            },
           
        ]

        res.json(nonvegitems)

    })


    router.get('/sidescustomize',(req,res)=>{
        let nonvegitems=[
            // {
            //     // "size":["Small","Medium","Large"],
            //     // "Crust":["Hand Tossed","White Thin Crust","Cheese Brust"]
            // },
             {
                "size":"Tomato Sauce",
                "crust":"Smoky Grilled"
            },
            {
                "size":"Bechamel Sauce",
                "crust":"Charcoal Grill"
            },
            {
                "size":"Veloute Sauce",
                "crust":"Electric Grill"
            },
           
        ]

        res.json(nonvegitems)

    })


    router.get('/beveragecustomize',(req,res)=>{
        let nonvegitems=[
            // {
            //     // "size":["Small","Medium","Large"],
            //     // "Crust":["Hand Tossed","White Thin Crust","Cheese Brust"]
            // },
             {
                "size":"90 ML",
                "crust":"Mint Leaves"
            },
            {
                "size":"180 ML",
                "crust":"Apple Slices"
            },
            {
                "size":"250 ML",
                "crust":"Strawberry Glaze Toppin"
            },
           
        ]

        res.json(nonvegitems)

    })

    router.get('/testroute',(req,res)=>{
        
        User.find((err,result)=>{
            if(err) throw err;
            res.json(result)

        })

        
    })


    router.get('/sendFCM', (req, res) => {
        const userData = req.body;
        var FCM = require('fcm-node');
        var serverKey = 'AAAAEBFihmc:APA91bHx_4I6vDqUmtPlCDZo-HkaaW6Q4te-NfBqo2KQNKXB2E9gtBiFYAfrlKGBVYXP13fiiFn2p3w_iDfRKPiNWiw2548BsV4nQeyqiCzbeMW93YahYgznCo44bdP7bMqcMDogxJci'; //put your server key here
        var fcm = new FCM(serverKey);
     
        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            to: 'cMq9Cxgnj7w:APA91bE72xqjm7ocSzz-hNHl9YbJkVSAnIc-qDsR2h11xOsWCFBimm9syVk6pJe3DOJTcAd6KK5Nyg-xJzCidf3bQUuPQ4-YDG4oEbozPlZO2Sq05S846HjGNivUCCCsdYeMHrag_W2e',
            // collapse_key: 'your_collapse_key',
     
            notification: {
                title: 'Order Placed',
                body: 'Khan ordered Garlic Bread'
            }
     
            // data: {  //you can send only notification or only data(or include both)
            //     my_key: 'my value',
            //     my_another_key: 'my another value'
            // }
        };
     
        fcm.send(message, function(err, response){
            if (err) {
                console.log("Something has gone wrong!");
            } else {
                console.log("Successfully sent with response: ", response);
            }
        })
     })
module.exports= router;