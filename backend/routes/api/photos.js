const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth} = require('../../utils/auth');
const { Photo, User} = require('../../db/models');
const {singlePublicFileUpload, singleMulterUpload} = require('../../awsS3')

//GET all photos
router.get('/', asyncHandler(async(req, res) => {
    const photos = await Photo.findAll({
        include: [{model: User, attributes: ['username']}]
    })
    res.json(photos)
}))


// const photoNotFoundError = (tweetId) => {
//     const error = Error('Photo is not found');
//     error.errors = [`Photo ${photo} is not found`]
//     error.title = "Photo Not found"
//     error.status = 404;
//     return error
// }

//GET one photo
router.get('/:id(\\d+)', asyncHandler(async(req,res) => {
    const photo = await Photo.findByPk(req.params.id, {
        include: [User]
    })
    res.json(photo)
}));

// POST upload a picture
router.post('/', singleMulterUpload("imgFile"), requireAuth, asyncHandler(async(req, res) => {
    let imgURL;
    const {userId, title, caption, locationId} = req.body
    let imgFile;
    if (req.file) imgFile = await singlePublicFileUpload(req.file);
    imgURL = req.body.imgURL || imgFile
    console.log("IMAGE FILE         :", imgURL)
    const pictureUpload = await Photo.create({
        imgFile,
        imgURL,
        title,
        caption,
        userId,
        // locationId
    })

    return res.json(pictureUpload)
}))

//PUT update picture info
router.put('/:id', requireAuth, asyncHandler(async(req, res) => {
    const photoId = parseInt(req.params.id, 10)
    const {title, caption, locationId} = req.body
    const photo = await Photo.findOne({
        where: {
            id: photoId
        },
    })

    await photo.update({title, caption, locationId});
    res.json(photo)
}))


//DELETE delete photo
router.delete('/:id', asyncHandler(async(req, res) => {
    const photoId = parseInt(req.params.id, 10)
    const photo = await Photo.findOne({
        where: {id: photoId},
    });
    await photo.destroy();
    res.status(204).end();

}))




module.exports = router;
