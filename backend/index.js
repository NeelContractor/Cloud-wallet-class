require("dotenv")
const express = require("express");
// const { userModel } = require("./models");
const bs58 = require('bs58');
const { Keypair, Transaction, Connection } = require("@solana/web3.js");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const JWT_SECRET = "123456"
const connection = new Connection("https://api.devnet.solana.com");

// app.post("/api/v1/signup", async (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     // validate the inputs using zod, check if the user aleeady exists, hash the password

//     const keypair = new Keypair();

//     await userModel.create({
//         username,
//         password,
//         publicKey: keypair.publicKey.toString(),
//         privateKey: keypair.secretKey.toString()
//     })

//     res.json({
//         message: keypair.publicKey.toString()
//     })
// })

// app.post("/api/v1/signin", async (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;

//     const user = await userModel.findOne({
//         username: username,
//         password: password
//     })

//     if (user) {
//         const token = jwt.sign({
//             id: user
//         }, JWT_SECRET)
//         res.json({
//             token
//         })
//     } else {
//         res.status(403).json({
//             message: "Credentials are incorrect"
//         })    
//     }

//     res.json({
//         message: "Sign In"
//     })
// })

app.post("/api/v1/txn/sign", async (req, res) => {
    const serializedTransaction = req.body.message;

    console.log("before serialise")
    console.log(serializedTransaction)
    const tx = Transaction.from(Buffer.from(serializedTransaction));

    console.log("after serialise")

    // const user = await userModel.find({
    //     where: {
    //         _id: ""
    //     }
    // })
    // const privateKey = user.privateKey;

    console.log(bs58)
    const keypair = Keypair.fromSecretKey(bs58.decode(PRIVATE_KEY))
    console.log("after keypair")

    tx.sign(keypair)
    const { blockhash } = connection.getLatestBlockhash();
    tx.blockhash = blockhash
    tx.feePayer = keypair.publicKey

    const signature = await connection.sendTransaction(tx, [keypair]);
    console.log(signature);

    res.json({
        message: "Sign Up"
    })
})

app.get("/api/v1/txn", (req, res) => {
    res.json({
        message: "Sign Up"
    })
})

app.listen(3000);