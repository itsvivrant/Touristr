import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, Redirect, Link} from 'react-router-dom';
import EditCommentModal from './EditCommentModal';
import {getComments, createComment,removeComment} from '../../../store/comment';

import '../../PhotoPage/PhotoPage.css'

const Comment = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [comment, setComment] = useState('');
    const [commentToDeleteId, setCommentToDeleteId] = useState('');


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



    return (
        <div className='comment-container'>
            {usersComments?.map((comment)=>(
                <div class="comments-container">
                    <h4><Link className="link-comment-user" to={`/users/${comment.userId}`}>{comment.User?.username}</Link></h4>
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
                            <div hidden={comment.userId !== sessionUser.id} className="edit-comment">
                                <EditCommentModal />
                            </div>
                        </div>
                    </div>
                </div>
            ))}




            <div className="comment-form-container">
                <form className="comment-form" onSubmit={handleSubmit}>
                    <div className="comment-textarea">
                        <textarea placeholder='Add a comment' value={comment} onChange={(e) => setComment(e.target.value)} required></textarea>
                    </div>
                    <div>
                        <button className='post-comment-bttn' onClick={handleSubmit}>Post Comment</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Comment
