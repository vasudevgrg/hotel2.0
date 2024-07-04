const express= require("express");
const { createhotel, signedUrl, handleCitySuggestion, getHotels } = require("../controllers/hotel");
const router= express.Router();

router.post("/createhotel",createhotel );
router.get("/signedurl", signedUrl);
router.post("/citysuggessions", handleCitySuggestion);
router.post("/gethotels", getHotels);

module.exports=router;