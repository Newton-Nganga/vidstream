
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import { Request,Response,NextFunction } from "express";
 const getAllWatchList = async(req:Request,res:Response,next:NextFunction)=>{
    // GET /users/:userId/watchlist
const watchlist = await prisma.watchList.findMany({
    where: {
      collection: {
        userId :req.params.userId 
      }
    }
  })
  
  res.json(watchlist)
}


 const addFavourites = async(req:Request,res:Response,next:NextFunction)=>{
    
}

 const deleteSpecificWatchlist = async(req:Request,res:Response,next:NextFunction)=>{
    if(!req.params.userId){
        res.status(400).json({message:"A user must be logged in first!"})
    }

    try{
    await prisma.watchList.delete({
        where:{
            id:req.params.watchid
        }
    })
    res.status(200).json({message:`Movie with the id:${req.params.userId} removed from watchlist`})
    }catch(error:any){
    next(error.message)
  }
}

 const deleteAllFavourites = async(req:Request,res:Response,next:NextFunction)=>{

}

