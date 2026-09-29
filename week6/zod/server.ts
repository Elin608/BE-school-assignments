import { z } from "zod";
import express from "express";
const app = express();
app.use(express.json());
const PORT = 3000;

const personSchema = z.object({
    results: z.array(z.object({
        name: z.object({
            first: z.string(),
            last: z.string(),
        }),
        location: z.object({
            country: z.string(),
        }),
    })
    ),
});

app.get("/random-person",
    async (req, res) => {
        const response = await fetch("https://randomuser.me/api/");
        const data = await response.json();
        const result = personSchema.safeParse(data);
        if (!result.success) {
            return res.status(500).json({
                error: "Invalid data"
            });
        }
        const person = result.data.results[0];
        res.json({
            name: `${person.name.first} ${person.name.last}`, country: person.location.country,
        });
    });


const userSchema = z.object({
    name: z.string().min(3).max(12),
    age: z
        .number()
        .min(18, { message: "You must be at least 18years old." })
        .max(100, { message: "You most de at moste 100 years old." })
        .optional()
        .default(28),
    email:
        z.string().email()
            .toLowerCase(),
});


app.post("/users", (req, res) => {

    const result = userSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            Error: "Invalid user data",
        })
    }

    return res.status(201).json(result.data);
}
);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




