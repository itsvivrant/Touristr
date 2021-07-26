import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, Redirect, useHistory} from 'react-router-dom';
import {Modal} from '../../context/Modal'
import {getComments, createComment, updateComment, removeComment} from '../../store/comment';

import './PhotoPage.css'

const Comment = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [comment, setComment] = useState('');
    const [commentToDeleteId, setCommentToDeleteId] = useState('');
    const [commentToUpdateId, setCommentUpdateId] = useState('');
    const [editedComment, setEditedComment] = useState('');
    const [showModal, setShowModal] = useState(false);

    const {id} = useParams()

    const comments = useSelector(state=>{
        return Object.values(state.comments)
    })

    const usersComments = comments.filter(comment => comment.photoId === Number(id))

    useEffect(() => {
        dispatch(getComments(id))
    }, [dispatch, id])

    if(!comments) return null;

    if(!sessionUser) {
        return <Redirect to='/login' />
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const commentData = {
            comment: comment,
            userId: sessionUser.id,
            photoId: id
        }

        await dispatch(createComment(commentData))
        setComment('')
    }

    const handleDeleteComment = async (e) => {
        e.preventDefault();
        await dispatch(removeComment(commentToDeleteId))
    }

    const handleEditComment = async(e) => {
        e.preventDefault();
        const data = {id: commentToUpdateId, content: editedComment}
        await dispatch(updateComment(data))

        setShowModal(false)
    }

    const handleCancelEdit = (e) => {
        e.preventDefault();
        history.push(`/photos/${id}`)
        setShowModal(false)
    };

    return (
        <div className='comment-container'>
            {usersComments?.map((comment)=>(
                <div class="comments-container">
                    <h3>{comment.User?.username}</h3>
                    <div className="user-comment-info">
                        <div className="comment-p">
                            <p>{comment.comment}</p>
                        </div>
                        <div className="user-comment-delete-edit">
                            <div>
                                <form onSubmit={handleDeleteComment} hidden={comment.userId !== sessionUser.id}>
                                    <button className="fas fa-times" text="Delete Comment" onClick={e=> setCommentToDeleteId(comment.id)}></button>
                                </form>
                            </div>
                            <div className="edit-comment">
                                <div hidden={comment.userId !== sessionUser.id}>
                                    <button className="far fa-edit" text="Edit Comment" onClick={() => {setShowModal(true)}}></button>
                                    {showModal && (
                                        <Modal>
                                            <form className="edit-form" onSubmit={handleEditComment}>
                                                <h1>Update Comment</h1>
                                                <div className="update-textarea">
                                                    <textarea placeholder="Comment" className="comment-txt-area" type="textarea" value={editedComment.comment} onChange={(e) =>setEditedComment(e.target.value)}/>
                                                </div>
                                                <div className="update-bttn">
                                                    <button onClick={e=> setCommentUpdateId(comment.id)}>Update Comment</button>
                                                </div>
                                                <div className="update-bttn">
                                                    <button onClick={handleCancelEdit}>Cancel</button>
                                                </div>
                                            </form>
                                        </Modal>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div className="comment-form-container">
                <form className="comment-form" onSubmit={handleSubmit}>
                    <div className="comment-textarea">
                        <textarea placeholder='Add a comment....' value={comment} onChange={(e) => setComment(e.target.value)} required></textarea>
                    </div>
                    <div>
                        <button onClick={handleSubmit}>Post Comment</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Comment
