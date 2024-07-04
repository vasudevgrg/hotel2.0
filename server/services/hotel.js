const db= require("../models/index")
class hotelServices{
    filterRooms=async (hotel, largeRooms, smallRooms)=>{
        const rooms= await db.Room.findAll({
            where:{
                hotel_id: hotel.id
            }
        });
        let large=0;
        let small=0;

        rooms.map(e=>{
            if(e.vacancy==true){
                if(e.size=="large"){
                    large++;
                }else{
                    small++;
                }
            }
        });

        return large>=largeRooms && small>=smallRooms;
    }
};

module.exports= new hotelServices();
