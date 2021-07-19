const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const {requireAuth} = require('../../utils/auth')
const { Photo, User, Comment} = require('../../db/models');

router.get('/photos/:id', asyncHandler(async(req, res) => {
    const {id} = req.params
    const comments = await Comment.findAll({
        where: {photoId: id},
        include: User
    });
    return res.json(comments)
}));

router.post('/photos/:id', requireAuth, asyncHandler(async(req, res) => {
    const {id} = req.params
    const {comment, userId} = req.body;
    const createComment = await Comment.create({
        comment,
        userId,
        photoId: id
    })

    const newComment = await Comment.findByPk(createComment.id, {
        include: User
    })
    return res.json(newComment)

}));

router.put('/photos/:id', requireAuth, asyncHandler(async(req, res) => {
    const {id} = req.params;
    const comment = await Comment.findOne({
        where: {photoId: id}
    });
    await comment.update({comment});
    return res.json(comment)
}));

router.delete('/:id', requireAuth, asyncHandler(async(req, res) => {
    const {id} = req.params
    const comment = await Comment.findByPk({
        where: {photoId: id}
    });

    await comment.destroy();
    res.status(204).end()
}))



module.exports = router;
