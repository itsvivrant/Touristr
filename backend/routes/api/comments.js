const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const {requireAuth} = require('../../utils/auth')
const { Photo, User, Comment} = require('../../db/models');

router.get('/:id', asyncHandler(async(req, res) => {
    const {id} = req.params
    const comments = await Comment.findAll({
        where: {photoId: id},
        include: User
    });
    return res.json(comments)
}));

router.post('/:id', requireAuth, asyncHandler(async(req, res) => {
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

router.put('/:id', requireAuth, asyncHandler(async(req, res) => {
    const {content} = req.body;
    const {id} = req.params;
    const comment = await Comment.findByPk(id);
    await comment.update({comment: content});
    return res.json(comment)
}));

router.delete('/:id', requireAuth, asyncHandler(async(req, res) => {
    const {id} = req.params
    const comment = await Comment.findByPk(id)

    await comment.destroy();
    res.status(204).end()
}))



module.exports = router;
