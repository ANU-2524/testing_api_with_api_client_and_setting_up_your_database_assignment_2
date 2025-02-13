const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const data = require("./data.json")
app.use(express.json()) ;
app.use(express.urlencoded({embeded : true})) ;

// app.get("/" , (req , res)=>{
//   res.send(data) ;
// })
app.use(bodyParser.json());

app.get("/books" , (req , res)=>{
  res.send(data.map((ele)=>{
    return ele ;
  }))
})

app.get("/books/:id" , (req , res)=>{
  const bookId = parseInt(req.params.id) ; 
  const book = data.find((i)=>i.book_id == bookId) ;
  if (!book){
        res.status(404).json({message : 'Book not found'}) ; 
  }
  res.status(201).json(book) ;

})

app.post("/books" , ( req , res )=>{
  const {book_id, title, author, genre, year, copies}= req.body
  
  if(!book_id || !title || !author || !genre || !year || !copies){

    res.status(400).send({message: 'Bad request'})
  }
  const newBook = {book_id, title, author, genre, year, copies} ; 
  data.push(newBook) ; 
  res.status(200).json({book:newBook}) ;
})

app.delete("/books/:id" , (req , res)=>{
  const id = parseInt(req.params.id) ;
  const BookIndex = data.findIndex((b)=>{
    return b.book_id == id ;
  })
  if (BookIndex == -1){
    res.status(404).json("Book not Found !") ;
  }
  data.splice(BookIndex , 1) ;
  res.status(201).json("Book deleted succesfully !") ;
  // const newArr = data.filter((ele)=>{
  //   return ele.book_id != id ; 
  // })
  // res.send(newArr) ;
  // res.send(data.map((del)=>{
  //   return del.book_id != id ;
  // }))
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
