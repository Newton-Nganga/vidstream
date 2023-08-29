
import { Router } from "express";
import { createUserObject } from "./controllers/Users/user.create";
import { deleteUserObject } from "./controllers/Users/user.delete";
import { fetchOrUpdateUser } from "./controllers/Users/fetchorupdate.user";

import { deleteAllFavourites, deleteSpecificFavourite, getAllFavourites } from "./controllers/favourites";
import { deleteSpecificWatchlist, getAllWatchList } from "./controllers/watchlist";
import { userIdExists } from "./Middlewares/userid.exists";


const router = Router()


//* An user object is created and maintained using the .patch call
//* but deleted using the .delete and created during sign up via .post
// ** User Routes
//route called every time the /account page is visited
router.patch('/users/:userId',userIdExists,fetchOr)
//route called to delete the account
router.delete('/users/:userId',userIdExists,deleteUserObject)

//function to create user on sign up
router.post('/users/:userId',userIdExists,createUserObject)



// * A movie or show can only be added or deleted into favourites and watchlists
// ** Favourites Routes

//Route to return all the favourites collection for a user
router.get('/users/:userId/favourites',userIdExists,getAllFavourites)
//Route to add a movie to the favourites
router.put('/users/:userId/favourites',userIdExists,addFavourites)
//Route called to remove a specific favourite
router.delete('/users/:userId/favourites/:favid',userIdExists,deleteSpecificFavourite)
//Route called to delete all the favourites in the collection
router.delete("/users/:userId/favourites/all",userIdExists,deleteAllFavourites)


//** Watchlist Routes

//Route to return all the watchlist for the user
router.get('/users/:userId/watchlist',userIdExists,getAllWatchList)
//Route to add a movie or show to the watchlist
router.put('/users/:userId/favourites',userIdExists,addWatchlist)
//delete a movie from the watchlist
router.delete('/users/:userId/watchlist/:watchid',userIdExists,deleteSpecificWatchlist)
//delete all the users watchlist collection
router.delete('/users/:userId/watchlist/all',userIdExists,deleteSpecificWatchlist)

export default router