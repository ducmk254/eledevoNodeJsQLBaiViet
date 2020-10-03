const express = require('express'),
      app = express(),
      port = process.env.PORT || 5000,
      mongoClient = require('mongoose'),
      bodyParsor = require('body-parser'),
      route = require('./API/routes/indexRoutes')
app.use(bodyParsor.json())
   .use(bodyParsor.urlencoded({extended:true}))
mongoClient.connect('mongodb://localhost;27017/quanlybaiviet',{useFindAndModify:false,useNewUrlParser:true,useUnifiedTopology:true})
route(app)




app.listen(port,()=>console.log(`Server is start with ${port}`))