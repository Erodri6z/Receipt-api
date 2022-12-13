const express = require('express');
const app = express();
const PORT = 8080;


app.use( express.json() );

app.listen(PORT,
  () => console.log('its running')
); 

app.get('/reciepts', (req, res) => {
  res.status(200).send({
    "retailer": "Walgreens",
    "purchaseDate": "2022-01-02",
    "purchaseTime": "08:13",
    "total": "2.65",
    "items": [
        {"shortDescription": "Pepsi - 12-oz", "price": "1.25"}
    ]
  })
});

app.post('/reciepts/process', (req, res) => {
  const  id  = parseInt(Math.floor(Math.random() * Date.now()))
  const { retailer } = req.body
  const { purchaseDate } = req.body
  const { purchaseTime } = req.body
  const { total } = req.body
  const  items  = req.body
  console.log( req.body )
  res.send({
    id: `${id}`,
    reciept : req.body
  })
});