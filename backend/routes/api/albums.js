const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const {requireAuth} = require('../../utils/auth')
const { handleValidationErrors } = require('../../utils/validation');
const { Photo, User, Album, AlbumPhotos} = require('../../db/models');

//user albums
router.get('/user/:id', asyncHandler(async(req, res) =>  {
    const userAlbums = await Album.findAll({
        where: {userId: req.params.id},
        include: Photo
    })
    return res.json(userAlbums)
}))


//single album
router.get("/:id(\\d+)", asyncHandler (async( req, res) => {
    const album = await Album.findByPk(req.params.id, {include: {model: Photo, User}})
    return res.json(album)
}))

//create album
router.post('/create', requireAuth, asyncHandler(async (req, res) => {
    const {title, description, userId} = req.body;
    const newAlbum = await Album.create({title, description, userId});
    return res.json(newAlbum)
}))

//add onto album
router.post('/:id(\\d+)', asyncHandler(async(req, res) =>  {
    const {photoId, albumId} = req.body;
    await AlbumPhotos.create({photoId, albumId})
}))

//update album info
router.put("/:id(\\d+)/edit", requireAuth, asyncHandler(async(req, res) => {
    const {title, description} = req.body;
    const album = await Album.findByPk(req.params.id);

    await album.update({
        title,
        description
    });

    return res.json(album)

}));

//delete
router.delete("/:id(\\d+)/delete", requireAuth, asyncHandler(async(req, res) => {
    const album = await Album.findByPk(req.params.id);
    await album.destroy();
    res.status(204).end()
}))







module.exports = router;
