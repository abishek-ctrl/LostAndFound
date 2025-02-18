const Book= require('../models/Book');

const getBook = async(req,res)=>{
    try{
        const books= await Book.find({});
        if(books.length>0){
            res.status(200).json({"message": "Books retrieved successfully", "data": books});
        }
        else{
            res.status(404).json({message: "There are no books stored yet :("});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Something went wrong bro!"});
    }
}

const getBookbyID = async(req,res)=>{
    try{
        const bookparams= req.params;
        const book= await Book.findById(bookparams.id);
        if(book){
            res.status(200).json({"message": `Book of ID ${bookparams.id} retrieved successfully`, "data": book});
        }
        else{
            res.status(404).json({message: `Book of ID ${bookparams.id} not found`});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Something went wrong bro!"});
    }
}

const addBook = async(req,res)=>{
    try{
        const bookbody= req.body;
        const newBook= await Book.create(bookbody);
        if(newBook){
            res.status(201).json({"message": "Book added successfully", "data": newBook});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Something went wrong bro!"});
    }
}

const updateBook = async(req,res)=>{
    try{
        const bookparams=req.params.id;
        const bookbody=req.body;
        const updatedBook= await Book.findByIdAndUpdate(bookparams,bookbody,{new:true});
        if(!updatedBook){
            res.status(404).json({message: `Book of ID ${bookparams} not found`});
        }
        res.status(200).json({"message": `Book of ID ${bookparams} updated successfully`, "data": updatedBook});
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Something went wrong bro!"});
    }
}

const deleteBook = async(req,res)=>{
    try{
        const bookparams = req.params;
        const deletedBook= await Book.findByIdAndDelete(bookparams.id);
        if(!deletedBook){
            res.status(404).json({message: `Book of ID ${bookparams.id} not found`});
        }
        res.status(200).json({"message": `Book of ID ${bookparams.id} deleted successfully`, "data": deletedBook});

    }catch(err){
        console.log(err);
        res.status(500).json({message: "Something went wrong bro!"});
    }
}

module.exports={getBook, getBookbyID, addBook, updateBook, deleteBook};