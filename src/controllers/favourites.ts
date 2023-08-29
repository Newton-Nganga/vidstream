import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

import { Request,Response,NextFunction } from "express";

export const getAllFavourites=async(req:Request,res:Response,next:NextFunction)=>{
    // GET /users/:userId/favorites
const favorites = await prisma.favourites.findMany({
    where: {
      collection: {
        userId :req.params.userId 
      }
    }
  })
  //returns an array of Favourite Objects
  res.json(favorites)
}

export const addFavourites = async(req:Request,res:Response,next:NextFunction)=>{
    if(!req.body){
        return res.status(400).json({Message:"You must provide the ovie or show to add"})
    }

    const {movie_id,movie_title,poster_path,backdrop_path} = req.body

    try{
    const user = await prisma.user.findUnique({
        where: { clientId: req.params.userId },
        include:{
         collections:true
        }
      });
      user?.collections.
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      
      const favourite = await prisma.favourites.create({
        data:{
           movie_id,
           movie_title,
           poster_path,
           backdrop_path
        }
      })

      res.status(200).json({data:favourite,Message:"Success : Movie / show added to favourites"})
    }catch(err){
        return res.status(500).json({Message:"An error was caught while adding to favourites"})
    }
}

export const deleteSpecificFavourite =async(req:Request,res:Response,next:NextFunction)=>{
    const {userId} = req.params
    try{
      //check if the user exists
     const user = await prisma.user.findUnique({
        where:{clientId:userId}
     })
     
     if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      //check if the favourite movie exists
      const favourite =await prisma.favourites.findUnique({where:{id:req.params.favid}})

      if (!favourite) {
        return res.status(404).json({ message: 'User not found.' });
      }

      //delete the favourite
      await prisma.favourites.delete({
        where:{
            id:req.params.favid
        }
     })

     res.status(200).json({message:`Movie with the id:${req.params.userId} removed from favourites`})

    }catch(error:any){
    return res.status(400).json({Message:"Error : An error was caught while deleting the movie"})
  }
 }

 export const deleteAllFavourites = async(req:Request,res:Response,next:NextFunction)=>{

    const {userId} = req.params

    try{
        //check if user exists
        const user = await prisma.user.findUnique({
            where:{clientId:userId},
            include:{collections:{include : {favourites:true}}}
        })
        
        if(!user){
            return res.status(400).json({Message:"Error : User does not exist!"})
        }
        
        user.collections.forEach(async(collection)=>{
            await prisma.favourites.deleteMany({
                where: { collectionId: collection.id },
              });
        })
        return res.status(200).json({Message:"Success : All the favourites deleted"})
      
       
    }catch(err){
        return res.status(500).json({Message:"An error was caught while deleting favourites"})
    }
 }