const db = require("../db");

// http://localhost:5000/api/products/update

module.exports = async (req, res, next) => {
  const params = req.query;
  try {
    results = await db.updateProduct(
      params.name,
      params.purchase_cost,
      params.selling_cost,
      params.productID
    );
    res.json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
