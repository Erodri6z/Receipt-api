const express = require('express');
const app = express();
const PORT = 8080;


app.use( express.json() );

app.listen(PORT,
  () => console.log('its running')
); 

const reciepts = [
  { 
    id: 398916030109,
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
    id: 263620709779,
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
  },{
    id: 1074547554827,
    retailer: "Target",
    purchaseDate: "2022-01-01",
    purchaseTime: "13:01",
    items: [
      {
        shortDescription: "Mountain Dew 12PK",
        price: "6.49"
      },{
        shortDescription: "Emils Cheese Pizza",
        price: "12.25"
      },{
        shortDescription: "Knorr Creamy Chicken",
        price: "1.26"
      },{
        shortDescription: "Doritos Nacho Cheese",
        price: "3.35"
      },{
        shortDescription: "Klarbrunn 12PK 12 FL OZ",
        price: "12.00"
      }
    ],
    total: "35.35"
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
  reciepts.push(reciept)
  res.send(reciept)
});

app.get(`/reciepts/:id`, (req, res) => {
  let thisReciept = reciepts.find(r => r.id === parseInt(req.params.id))
  res.send(thisReciept)
})

app.get('/reciepts/:id/points', (req, res) => {
  let thisReciept = reciepts.find(r => r.id === parseInt(req.params.id))

  let points = 0

  
  const getTimePoints = () => {
    const hour = thisReciept.purchaseTime.slice(0, -2)
    if(parseInt(hour) >= 14 && parseInt(hour) <= 16){
      points = points + 10
    }
  }
  
  
  const getRetailerPoints = () => {
    const retailer = thisReciept.retailer
    points = points + retailer.split('').length
  }
  
  const isTheDayOdd = () => {
    const day = parseInt(thisReciept.purchaseDate.slice(5, -2))
    if(day % 2 !== 0) {
      points = points + 6
    }
  }
  
  const isEvenPrice = () => {
    const price = thisReciept.total 
    const cents = price.slice(-4)
    if (cents == parseInt('00')) {
      points = points + 50
    }
  }
  
  const divideByTwentyFive = () => {
    const price = thisReciept.total
    if (price % 0.25 === 0) {
      points = points + 25
    }
  }
  
  const forEveryTwoItems = () => {
    const numOfItems = thisReciept.items.length
    if (numOfItems % 2 !== 0 ) {
      const divided = numOfItems / 2
      const pairs = divided.toString().slice(0, -1)
      points = points + parseInt(pairs * 5)
    } else {
      const pairs = numOfItems / 2 
      points = points + pairs * 5
    }
  }
  
  const multipleOfThree = () => {
    thisReciept.items.forEach(item => {
      let charCount = item.shortDescription.length
      if (charCount % 3 === 0){
        const point = Math.ceil(item.price * 0.2)
        console.log(point)
        points = points + point
      } 
    })
  }
  
  getRetailerPoints()
  getTimePoints()
  isTheDayOdd()
  isEvenPrice()
  divideByTwentyFive()
  forEveryTwoItems()
  multipleOfThree()
  
  const totalPoints ={
    points: points
  }
  res.send(totalPoints)
})
