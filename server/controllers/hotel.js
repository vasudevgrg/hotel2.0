const { defaults } = require("pg");
const db= require("../models/index");
const fileUploadServices= require("../services/file-upload");
const hotelServices= require("../services/hotel");

const createhotel= async (req, res)=>{
    const {name, hotel_pic, location, rooms,smallRoomPrice, largeRoomPrice, amenities}= req.body;
  
    const loc = await db.Location.findOrCreate({
        where:{
            name:location.trim()
        },
        defaults:{
            name:location.trim()
        }
    });

 
     const hotel= await db.Hotel.create({name:name, location_id:loc.id, hotel_pic: hotel_pic,user_id: req.cookies.id });

     rooms.map(async e=>{
        if(e.size=="small"){
        await db.Room.create({room_no: e.room_no, size:e.size, vacancy:true, price: smallRoomPrice})
        }else{
            await db.Room.create({room_no: e.room_no, size:e.size, vacancy:true, price: largeRoomPrice})
        }
     });
if(Array.isArray(amenities)){
     amenities.map(async e=>{
        const amenity= await db.Amenity.findOrCreate({
            where: {
                name: e.trim()
            },
            defaults:{
                name:e.trim()
            }
        });
        await hotel.addAmenity(amenity);
     });
    }else{
        const amenity=await db.Amenity.create({name:amenities});
        await hotel.addAmenity(amenity);
      }

     res.send({message:"Hotel is Registered"});

};


const signedUrl= async (req, res)=>{
    const obj= await fileUploadServices.createImageUpload();

res.send({signedUrl:obj});
};

const getHotels= async (req, res)=>{
    const {location, large, small}= req.body;
    const rawHotels= await db.Hotel.findAll({
       include:[{
        model: db.Location,
        where:{
            name:location
        }
       }]
    });

    let finalHotels=[];

    rawHotels.map(e=>{
        if(hotelServices.filterRooms(e)){
            finalHotels.push(e, large, small);
        }
    });
   res.send({hotels: finalHotels});
};

const handleCitySuggestion = async (req, res) => {
    const cityname = req.query.cityName;

    try {
        const cities = await db.Hotel.findAll({
            where: {
                location: {
                    [Op.like]: `%${cityname}%`
                }
            },
            limit: 5
        });
     
        res.send({ cities: cities });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

module.exports={createhotel, signedUrl, getHotels, handleCitySuggestion};



