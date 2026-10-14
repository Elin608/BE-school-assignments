import { z } from "zod";
const categorySchema = z.enum(["Gifts", "Lifestyle", "Pets"]);
async function getProducts (req: any,pool:any) {
    const category = categorySchema.parse(req.query.category);
    const result = await pool.query(
        `SELECT name, description FROM products WHERE category = $1 AND released = 1`,
        [category]
    );
     return result.rows;
   }