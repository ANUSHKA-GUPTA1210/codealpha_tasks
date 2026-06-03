const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());


// ====================
// REGISTER
// ====================

app.post("/register", (req, res) => {

    const { name, email, password } = req.body;

    db.run(
        `INSERT INTO users(name,email,password)
         VALUES(?,?,?)`,
        [name, email, password],
        function(err){

            if(err){
                return res.status(400).json({
                    message:"User already exists"
                });
            }

            res.json({
                message:"Registration Successful"
            });
        }
    );
});


// ====================
// LOGIN
// ====================

app.post("/login",(req,res)=>{

    const { email,password } = req.body;

    db.get(
        `SELECT * FROM users
         WHERE email=? AND password=?`,
        [email,password],
        (err,user)=>{

            if(!user){

                return res.status(401).json({
                    message:"Invalid Credentials"
                });
            }

            res.json(user);
        }
    );
});


// ====================
// GET PRODUCTS
// ====================

app.get("/products",(req,res)=>{

    db.all(
        `SELECT * FROM products`,
        [],
        (err,rows)=>{

            res.json(rows);
        }
    );
});


// ====================
// GET SINGLE PRODUCT
// ====================

app.get("/products/:id",(req,res)=>{

    db.get(
        `SELECT * FROM products
         WHERE id=?`,
        [req.params.id],
        (err,row)=>{

            res.json(row);
        }
    );
});


// ====================
// PLACE ORDER
// ====================

app.post("/orders",(req,res)=>{

    const {
        customerName,
        customerEmail,
        items,
        total,
        date
    } = req.body;

    db.run(
        `INSERT INTO orders
        (
        customerName,
        customerEmail,
        items,
        total,
        date
        )
        VALUES(?,?,?,?,?)`,
        [
            customerName,
            customerEmail,
            JSON.stringify(items),
            total,
            date
        ],
        function(err){

            if(err){

                return res.status(500).json({
                    message:"Order Failed"
                });
            }

            res.json({
                message:"Order Placed"
            });
        }
    );
});


// ====================
// GET ORDERS
// ====================

app.get("/orders",(req,res)=>{

    db.all(
        `SELECT * FROM orders`,
        [],
        (err,rows)=>{

            res.json(rows);
        }
    );
});


// ====================
// DELETE ORDER
// ====================

app.delete("/orders/:id",(req,res)=>{

    db.run(
        `DELETE FROM orders
         WHERE id=?`,
        [req.params.id],
        function(err){

            res.json({
                message:"Order Cancelled"
            });
        }
    );
});



app.listen(5000,()=>{

    console.log(
        "Server Running On Port 5000"
    );
});