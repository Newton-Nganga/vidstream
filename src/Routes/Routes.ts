
import { Router } from "express";
import { createUserObject } from "../controllers/Users/user.create";
import { deleteUserObject } from "../controllers/Users/user.delete";
import { fetchOrUpdateUser } from "../controllers/Users/fetchorupdate.user";


//favourites
import { deleteAllUserFavorites } from "../controllers/Favourites/deleteAll.favourites";
import { deleteUserFavorite } from "../controllers/Favourites/delete.favourites";
import { addUserFavoriteMovie } from "../controllers/Favourites/add.favourites";
import { fetchUserFavoriteById } from "../controllers/Favourites/get.favourites";
import { fetchUserFavorites } from "../controllers/Favourites/getAll.favourites";

//watchlist
import { fetchUserWatchList } from "../controllers/WatchList/getAll.watchlist";
import { fetchUserWatchListById } from "../controllers/WatchList/get.watchlist";
import { deleteAllUserWatchList } from "../controllers/WatchList/deleteAll.watchlist";
import { deleteUserWatchList } from "../controllers/WatchList/delete.watchlist";
import { addUserWatchList } from "../controllers/WatchList/add.watchlist";


import { userIdExists } from "../Middlewares/userid.exists";




const router = Router()



//* An user object is created and maintained using the .patch call
//* but deleted using the .delete and created during sign up via .post
// ** User Routes
//route called every time the /account page is visited
router.patch('/users/:userId',userIdExists,fetchOrUpdateUser)
//route called to delete the account
router.delete('/users/:userId',userIdExists,deleteUserObject)
//function to create user on sign up
router.post('/users/:userId',userIdExists,createUserObject)



// * A movie or show can only be added or deleted into favourites and watchlists
// ** Favourites Routes

//Route to return all the favourites collection for a user
router.get('/users/:userId/favourites',userIdExists,fetchUserFavorites)
//Route to add a movie to the favourites
router.post('/users/:userId/favourites',userIdExists,addUserFavoriteMovie)
//Route called to remove a specific favourite
router.delete('/users/:userId/favourites/:favouriteId',userIdExists,deleteUserFavorite)
//Route called to delete all the favourites in the collection
router.delete("/users/:userId/favourites",userIdExists,deleteAllUserFavorites)


//** Watchlist Routes

//Route to return all the watchlist for the user
router.get('/users/:userId/watchlist',userIdExists,fetchUserWatchList)
//Route to add a movie or show to the watchlist
router.post('/users/:userId/watchlist',userIdExists,addUserWatchList)
//delete a movie from the watchlist
router.delete('/users/:userId/watchlist/:watchListId',userIdExists,deleteUserWatchList)
//delete all the users watchlist collection
router.delete('/users/:userId/watchlist',userIdExists,deleteAllUserWatchList)



router.get('/',(req,res)=>{
    res.status(200).json("Bingoo you are in")
})
export default router