const express = require('express');
const app = express();
const PORT = 8080;


app.use( express.json() );

app.listen(PORT,
  () => console.log('its running')
); 

const reciepts = [
  { 
    id : 398916030109,
    retailer: "Walgreens",
    purchaseDate: "2022-01-02",
    purchaseTime: "08:13",
    total: "2.65",
    items: [
      {
        shortDescription: "Pepsi - 12-oz",
        price: "1.25"
      }
    ]
  },
  {
    id : 263620709779,
    retailer: "Target",
    purchaseDate: "2022-01-02",
    purchaseTime: "13:13",
    total: "1.25",
    items: [
      {
        shortDescription: "Pepsi - 12-oz",
        price: "1.25"
      }
    ]
  }
]

app.get('/reciepts', (req, res) => {
  res.status(200).send(reciepts)
});

app.post('/reciepts/process', (req, res) => {
  const reciept = {
    id: parseInt(Math.floor(Math.random() * Date.now())),
    retailer : req.body.retailer,
    purchaseDate: req.body.purchaseDate,
    purchaseTime: req.body.purchaseDate,
    total: req.body.total,
    items: req.body.items
    }
  // const { retailer } = req.body.retailer
  // const { purchaseDate } = req.body.purchaseDate
  // const { purchaseTime } = req.body.purchaseTime
  // const { total } = req.body.total
  // const  items  = req.body.items

  res.send(reciept)
});

app.get(`/receipts/:id`, (req, res) => {
  const reciept = reciept.find(r => r.id === parseInt(req.params.id))
  res.status(200).send(reciept)
})
