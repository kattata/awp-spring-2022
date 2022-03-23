import { mongoose } from "mongoose";

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: String,
  author: String,
  price: Number,
  currency: String,
  isbn13: String,
  description: String,
  starRating: Number,
  ratingsCount: Number,
  language: String,
  publicationDate: Date,
  publisher: String,
  categories: Array,
  reviews: [
    {
      author: String,
      description: String,
      starRating: Number,
    },
  ],
});

export const models = [
  {
    name: "Book",
    schema: bookSchema,
    collection: "books",
  },
];
