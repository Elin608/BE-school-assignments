// user input concatenated straight into the SQL string -- DO NOT do this 
async function getProducts(req: any,pool: any) {
const result = await pool.query(
`SELECT name, description FROM  products WHERE category = '${req.query.category}'
AND released = 1`,
);
}

