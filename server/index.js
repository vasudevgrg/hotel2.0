const express= require("express");
const cookieParser= require("cookie-parser");
const cors= require("cors");

const app= express();
const hotelRoutes= require("./routes/hotel");
const userRoutes= require("./routes/user");


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

app.use("/hotel", hotelRoutes);

app.use("/user", userRoutes);

app.listen(5002, ()=>console.log("listening to 5002"))
