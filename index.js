const express = require('express')
const Razorpay = require("razorpay");
const cors = require('cors')

const app = express()
app.use(cors())
const port = 3000

const instance = new Razorpay({
    key_id: "rzp_test_ywdHvXUYgtmY9y",
    key_secret: "ir53S5XSXsjcCBbnbiwY4rMP",
});

app.get('/', (req, res) => {
  
 var options = {
    amount: 10000,  // amount in the smallest currency unit
    currency: "INR",
    receipt: Math.random().toString()
  };

  instance.orders.create(options, function(err, order) {
    res.json({data:order})
  });

})

// webhook route
// webhook route must always be a post request 

app.post('/', (req, res) => {
    // console.log(req.headers)
    let secret = 'gautham'
    let reqBody= "",
    signature = req.headers["x-razorpay-signature"];
     req.on("data", (data) => {
      reqBody += data;
      console.log(reqBody)
    });
    req.on("end", (data) => {
      console.log("is signature valid");
      console.log(Razorpay.validateWebhookSignature(reqBody, signature, secret));

      if(Razorpay.validateWebhookSignature(reqBody, signature, secret))
      {
          console.log("Set Data to the database")
      }
      else{
          console.log("The data is wrong")
      }

     });
  
  
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// 1 --> 4 HTTP Methods --> GET POST PUT DELETE


// 1. Create your server and run the server in localhost
// 2. Create an account with ngrok(free) and make sure you like install it correctly
// 3. You should always run the localhost
// 4. You should use command ngrok http 3000  
// 5. Check whether the Signature sent by razorpay is valid or not

// 1. enable cors 