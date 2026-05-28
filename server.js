
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(express.static("public"));


// ================= MONGODB =================
mongoose.connect("mongodb+srv://masapenev2005_db_user:mashaaa2005@cluster0.x07ngos.mongodb.net/shop")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));




// USER
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model("User", userSchema);


// PRODUCT
const productSchema = new mongoose.Schema({
    title: String,
    shortDescription: String,
    price: Number,
    image: String
});

const Product = mongoose.model("Product", productSchema);


// ORDER
const orderSchema = new mongoose.Schema({
    customerName: String,
    address: String,
    productId: String
});

const Order = mongoose.model("Order", orderSchema);


// REVIEW
const reviewSchema = new mongoose.Schema({
    productId: String,
    text: String
});

const Review = mongoose.model("Review", reviewSchema);




// HOME
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});



app.post("/register", async (req, res) => {

    const { username, email, password } = req.body;

    try {

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const user = new User({
            username,
            email,
            password
        });

        await user.save();

        res.status(201).json({
            message: "User registered"
        });

    } catch (err) {
        res.status(500).json({
            message: "Server error"
        });
    }
});



app.post("/login", async (req, res) => {

    const { username, password } = req.body;

    try {

        const user = await User.findOne({
            username,
            password
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid login"
            });
        }

        res.json({
            message: "Login successful"
        });

    } catch (err) {
        res.status(500).json({
            message: "Server error"
        });
    }
});



app.get("/products", async (req, res) => {
    const products = await Product.find();
    res.json(products);
});


// TEST DATA (seed)
app.get("/seed", async (req, res) => {

    await Product.insertMany([
        {
            title: "Romeo and Juliet",
            shortDescription: "Classic love story",
            price: 12,
            image: "images/b1.jpg"
        },
        {
            title: "Animal Farm",
            shortDescription: "Political satire",
            price: 15,
            image: "images/b2.jpg"
        },
        {
            title: "The Great Gatsby",
            shortDescription: "American dream story",
            price: 16,
            image: "images/b3.jpg"
        },
        {
            title: "Emma",
            shortDescription: "Romance novel",
            price: 14,
            image: "images/b4.jpg"
        },
        {
            title: "Dorian Gray",
            shortDescription: "Dark moral story",
            price: 12,
            image: "images/b5.jpg"
        }
    ]);

    res.send("Products inserted");
});



app.post("/orders", async (req, res) => {

    const { customerName, address, productId } = req.body;

    const order = new Order({
        customerName,
        address,
        productId
    });

    await order.save();

    res.json({ message: "Order saved" });
});

app.get("/orders", async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
});



app.post("/reviews", async (req, res) => {

    const { productId, text } = req.body;

    const review = new Review({
        productId,
        text
    });

    await review.save();

    res.json({ message: "Review saved" });
});

app.get("/reviews/:productId", async (req, res) => {

    const reviews = await Review.find({
        productId: req.params.productId
    });

    res.json(reviews);
});



app.get("/admin/products", async (req, res) => {
    res.json(await Product.find());
});

app.get("/admin/orders", async (req, res) => {
    res.json(await Order.find());
});

app.get("/admin/reviews", async (req, res) => {
    res.json(await Review.find());
});



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

