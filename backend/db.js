const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db", (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("SQLite Connected");
    }
});

// Users Table
db.run(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT
)
`);

// Products Table
db.run(`
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    category TEXT,
    price INTEGER,
    image TEXT,
    description TEXT
)
`);

// Orders Table
db.run(`
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customerName TEXT,
    customerEmail TEXT,
    items TEXT,
    total INTEGER,
    date TEXT
)
`);

module.exports = db;
db.serialize(() => {

    db.run(`DELETE FROM products`);

    db.run(`
        INSERT INTO products (name, category, price, image, description)
        VALUES 
        ('iPhone 15', 'Electronics', 79999, 'images/iphone.jpg', 'Latest Apple iPhone'),
        ('Laptop', 'Electronics', 65999, 'images/laptop.jpg', 'High performance laptop'),
        ('T-Shirt', 'Fashion', 899, 'images/tshirt.jpg', 'Premium cotton t-shirt'),
        ('Headphones', 'Accessories', 2999, 'images/headphones.jpg', 'Noise cancelling headphones')
    `);

});