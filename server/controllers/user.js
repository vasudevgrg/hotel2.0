const db= require("../models/index");

const createUser= async (req, res)=>{
    const {name, username, password, role}= req.body;

    const user= await db.User.create({name, username, password, role});
    res.send({message:"user created", user: user});
};

module.exports={createUser};