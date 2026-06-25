const pool = require('./pool');
 async function createTable(){
    const createCmd= `
    CREATE TABLE IF NOT EXISTS inventory (
      product_id INT AUTO_INCREMENT PRIMARY KEY,
      sku VARCHAR(20) NOT NULL UNIQUE,
      product_name VARCHAR(100) NOT NULL,
      category VARCHAR(50) NOT NULL,
      price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
      stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
      min_stock_level INT NOT NULL DEFAULT 5 CHECK (min_stock_level >= 0),
      expiration_date DATE,
      is_active BOOLEAN DEFAULT TRUE
    );
  `;
  try{
    console.log('table is being created')
    await pool.query(createCmd); 
    console.log("table've been  created successfully");
  }
  catch(error){
    console.error(error.message);
  }
 }
 module.exports=createTable;