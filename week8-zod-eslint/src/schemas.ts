import { z } from "zod";

export const bookSchema = z.object({
  title: z
    .string()
    .min(2, { message: "A book needs a title" })
    .max(50, { message: "Title must be at most 50 characters long" })
  ,

  author: z
    .string()
    .min(2, { message: "Author must be at least 2 characters long" })
    .max(100, { message: "Author must be at most 100 characters long" })
  ,
  genre: z
    .string()
    .min(2, { message: "Genre must be at least 2 characters long" })
  ,
  publisher_year: z
    .number()
    .int()
    .min(1900,)
    .max(new Date().getFullYear(),)
  ,
  author_id: z.number().int().nullable().optional()
});

export const genreSchema = z.object({
  genre: z.string().optional(),
  sort: z.enum(["title", "publisher_year", "genre"]).optional(),
});

export const authorSchema =
        z.object({
          name:
                z.string().trim().min(1),
        });

export type Book = z.infer<typeof bookSchema>;