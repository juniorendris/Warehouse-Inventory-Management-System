const express = require("express");
const path = require("path");
const mysql = require("mysql2/promise");
const {createTable,pool} = require("./database");
// const pool = require("./database/pool");
const app = express();
const port = 3000;
app.use(express.static("project"));
app.use('/project_js',express.static(path.join(__dirname,'project_js')));
app.use(express.json());
// app.get("/index.js", async (req, res) => {
//   try {
//     res.status(200).sendFile(path.join(__dirname, "index.js"));
//   } catch (error) {
//     console.error("error occured inn routing the index.js", error.message);
//   }
// });
app.post("/insert-product", async (req, res) => {
  console.table(req.body);
  const {
    sku,
    product_name,
    category,
    price,
    stock_quantity,
    expiration_date,
  } = req.body;
  const valueToInsert = [
    sku,
    product_name,
    category,
    price,
    stock_quantity,
    expiration_date || null,
  ];
  const insertCmd = `INSERT INTO inventory (sku,
        product_name,
        category,
        price,
        stock_quantity,
        expiration_date)
VALUES (?, ?, ?, ?, ?, ?);`;
  try {
    console.log("data is being inserted wait...");
    const [result] = await pool.query(insertCmd, valueToInsert);
    console.log("congratulations data have been  inserted well");
    res
      .status(201)
      .json({ success: true, message: "DATA HAVE BEEN INSERTED SUCCESSFULLY" });
  } catch (error) {
    console.log("failed to inserted please try again later");
    res.status(500).json({
      success: false,
      message: "failed to inserted please try again later",
    });
  }
});

app.get("/products", async (req, res) => {
  const productListCmd = `SELECT *
FROM inventory;`;
  try {
    const [result] = await pool.query(productListCmd);
    if (result.length === 0) {
      console.log("no data inside the inventory table");
      res.status(404).json({
        success: false,
        message: "no data inside the inventory table",
      });
      return;
    }
    res.status(200).json({ success: true, data: result });
    console.log("data have been sent");
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "error have been occured please try again",
    });
  }
});

app.patch("/update-product/:sku", async (req, res) => {
  const { sku } = req.params;
  const { quantity } = req.body;
  const updateCmd = `UPDATE inventory
SET stock_quantity = ?
WHERE sku = ?; `;
  try {
    const [response] = await pool.query(updateCmd, [quantity, sku]);
    if (response.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "no such item in the stock" });
    } 
    res.status(200).json({ success: true, message: "Updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.delete("/delete-product/:delsku", async (req, res) => {
  const { delsku } = req.params;
  const deleteCmd = `DELETE FROM inventory 
WHERE sku = ?;`;
  try {
    const [result] = await pool.query(deleteCmd, [delsku]);
    if (result.affectedRows === 0) {
      console.log("no such product in your store");
      return res
        .status(404)
        .json({ success: false, message: "no such product in your store" });
    }
    res.status(200).json({
      success: true,
      message: "congra you delete the product succesfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "error occured please try again later",
    });
  }
});

app.get("/search-product/:category", async (req, res) => {
  const { category } = req.params;
  const searchCmd = `SELECT * FROM inventory WHERE category=?;`;
  try {
    const [result] = await pool.query(searchCmd, [category]);
    if (result.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: `no such item in ${category}` });
    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
app.get("/low-stock", async (req, res) => {
  const productListCmd = `SELECT* FROM inventory WHERE stock_quantity <= min_stock_level`;
  try {
    const [result] = await pool.query(productListCmd);
    if (result.length === 0) {
      console.log("no data inside the inventory table lower than 5");
      res.status(404).json({
        low: false,
        message: "no data inside the inventory table lower than 5",
      });
      return;
    }
    res.status(200).json({ low: true, data: result });
    console.log("data have been sent");
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "error have been occured please try again",
    });
  }
});

app.get("/expiring-soon", async (req, res) => {
 const productListCmd = `
  SELECT *
  FROM inventory
  WHERE expiration_date IS NOT NULL
    AND expiration_date <= DATE_ADD(CURDATE(), INTERVAL 3 MONTH)
`;
  try {
    const [result] = await pool.query(productListCmd);
    if (result.length === 0) {
      console.log("no data inside the inventory table to ex in next 3 months ");
      res.status(404).json({
        low: false,
        message: "no data inside the inventory table to ex in next 3 months",
      });
      return;
    }
    res.status(200).json({ low: true, data: result });
    console.log("data have been sent");
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "error have been occured please try again",
    });
  }
});

app.listen(port, () => {
  createTable();
  console.log("the server is on port 3000");
});


