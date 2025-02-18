const express= require("express");
const {getBook,getBookbyID,addBook,updateBook,deleteBook}=require('../controllers/book-controllers');

router=express.Router();

router.get('/get',getBook);
router.get('/get/:id',getBookbyID);
router.post('/add',addBook);
router.put('/update/:id',updateBook);
router.delete('/delete/:id',deleteBook);

module.exports=router;