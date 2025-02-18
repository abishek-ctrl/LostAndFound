require('dotenv').config();
const mongoose = require('mongoose');
const connectDB= require('./databases/db');
const bookRoutes = require('./routes/book-routes');

express=require("express");
app=express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.use('/api/book',bookRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
