const db= require("../models/index");

const createUser= async (req, res)=>{
    const {name, username, password, role}= req.body;

    const user= await db.User.create({name, username, password, role});
    res.cookie("user_id", user.id, {
        httpOnly:true, secure:false
    })
    res.send({message:"user created", user: user});
};

module.exports={createUser};