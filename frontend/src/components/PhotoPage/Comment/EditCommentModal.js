import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, Redirect, useHistory} from 'react-router-dom';
import {Modal} from '../../../context/Modal';
import {getComments, updateComment} from '../../../store/comment';

import '../../PhotoPage/PhotoPage.css'


function EditCommentModal () {
    const {id} = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const comments = useSelector(state=>{
        return Object.values(state.comments)
    })

    const usersComments = comments.filter(comment => comment.photoId === Number(id))

    const [commentToUpdateId, setCommentUpdateId] = useState('');
    const [editedComment, setEditedComment] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(updateComment(id))
        dispatch(getComments(id))
    }, [dispatch, id, sessionUser.id, editedComment])

    if(!comments) return null;

    if(!sessionUser) {
        return <Redirect to='/login' />
    };

    const handleEditComment = async(e) => {

        const data = {id: commentToUpdateId, content: editedComment}
        await dispatch(updateComment(data))
        history.push(`/photos/${id}`)
        setShowModal(false)
    }

    const handleCancelEdit = (e) => {
        e.preventDefault();
        history.push(`/photos/${id}`)
        setShowModal(false)
    };

    return (
        <>
        <button className="far fa-edit" text="Edit Comment" onClick={() => {setShowModal(true)}}></button>
        {usersComments?.map((comment)=>(
            <div hidden={comment.userId !== sessionUser.id}>
                {showModal && (
                    <Modal>
                        <div className='edit-form-container'>
                            <form className="edit-form" onSubmit={handleEditComment}>
                                <h1>Update Comment</h1>
                                <div className="update-textarea">
                                    <textarea placeholder={comment.comment} className="comment-txt-area" type="textarea" value={editedComment.comment} onChange={(e) =>setEditedComment(e.target.value)}/>
                                </div>
                                <div className="update-bttn">
                                    <button onClick={e=> setCommentUpdateId(comment.id)}>Update Comment</button>
                                </div>
                                <div className="update-bttn">
                                    <button onClick={handleCancelEdit}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </Modal>
                )}
            </div>
        ))}
        </>
    )




}

export default EditCommentModal
