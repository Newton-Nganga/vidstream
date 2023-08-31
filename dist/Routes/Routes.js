"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_create_1 = require("../controllers/Users/user.create");
var user_delete_1 = require("../controllers/Users/user.delete");
var fetchorupdate_user_1 = require("../controllers/Users/fetchorupdate.user");
//favourites
var deleteAll_favourites_1 = require("../controllers/Favourites/deleteAll.favourites");
var delete_favourites_1 = require("../controllers/Favourites/delete.favourites");
var add_favourites_1 = require("../controllers/Favourites/add.favourites");
var getAll_favourites_1 = require("../controllers/Favourites/getAll.favourites");
//watchlist
var getAll_watchlist_1 = require("../controllers/WatchList/getAll.watchlist");
var deleteAll_watchlist_1 = require("../controllers/WatchList/deleteAll.watchlist");
var delete_watchlist_1 = require("../controllers/WatchList/delete.watchlist");
var add_watchlist_1 = require("../controllers/WatchList/add.watchlist");
var userid_exists_1 = require("../Middlewares/userid.exists");
var router = (0, express_1.Router)();
//* An user object is created and maintained using the .patch call
//* but deleted using the .delete and created during sign up via .post
// ** User Routes
//route called every time the /account page is visited
router.patch('/users/:userId', userid_exists_1.userIdExists, fetchorupdate_user_1.fetchOrUpdateUser);
//route called to delete the account
router.delete('/users/:userId', userid_exists_1.userIdExists, user_delete_1.deleteUserObject);
//function to create user on sign up
router.post('/users/:userId', userid_exists_1.userIdExists, user_create_1.createUserObject);
// * A movie or show can only be added or deleted into favourites and watchlists
// ** Favourites Routes
//Route to return all the favourites collection for a user
router.get('/users/:userId/favourites', userid_exists_1.userIdExists, getAll_favourites_1.fetchUserFavorites);
//Route to add a movie to the favourites
router.post('/users/:userId/favourites', userid_exists_1.userIdExists, add_favourites_1.addUserFavoriteMovie);
//Route called to remove a specific favourite
router.delete('/users/:userId/favourites/:favouriteId', userid_exists_1.userIdExists, delete_favourites_1.deleteUserFavorite);
//Route called to delete all the favourites in the collection
router.delete("/users/:userId/favourites", userid_exists_1.userIdExists, deleteAll_favourites_1.deleteAllUserFavorites);
//** Watchlist Routes
//Route to return all the watchlist for the user
router.get('/users/:userId/watchlist', userid_exists_1.userIdExists, getAll_watchlist_1.fetchUserWatchList);
//Route to add a movie or show to the watchlist
router.post('/users/:userId/watchlist', userid_exists_1.userIdExists, add_watchlist_1.addUserWatchList);
//delete a movie from the watchlist
router.delete('/users/:userId/watchlist/:watchListId', userid_exists_1.userIdExists, delete_watchlist_1.deleteUserWatchList);
//delete all the users watchlist collection
router.delete('/users/:userId/watchlist', userid_exists_1.userIdExists, deleteAll_watchlist_1.deleteAllUserWatchList);
router.get('/', function (req, res) {
    res.status(200).json("Bingoo you are in");
});
exports.default = router;
