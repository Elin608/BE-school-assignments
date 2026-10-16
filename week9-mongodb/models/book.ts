  import mongoose from "mongoose";

  
  const bookSchema  = new mongoose.Schema ({
        title: {
       type: String,
        required: [true, "Book title is required"]
    },
        genre: {
        type: String,
        enum :["fantasy", "dystopian", "children", "classic"]
        },

        publishedYear:{
        type: Number,
        min: 1400,
        max:2026
        },
    
    
    author: {
        type: 
        mongoose.Schema.Types.ObjectId,
         ref:"Author"}
  
  }, {timestamps: true});
  
const Book = mongoose .model ("Book", bookSchema);

export default Book;