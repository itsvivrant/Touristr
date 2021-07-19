import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useHistory, Redirect} from 'react-router-dom';
import {getComments, createComment, editComment, removeComment} from '../../store/comment';

const Comment = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();

    const [comment, setComment] = useState('')

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

        const newComment = await dispatch(createComment(commentData))
            if (newComment) {
            setComment('')
        }
    }

    return (
        <div className='comment-container'>
            <div>
                {usersComments?.map((comment)=>(
                    <>
                        <h3>Comment By: {comment.User?.username}</h3>
                        <p>{comment.comment}</p>
                    </>
                ))}
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input placeholder='Add a comment' value={comment} onChange={(e) => setComment(e.target.value)} required></input>
                    <button onClick={handleSubmit}>Comment</button>
                </form>
            </div>
        </div>
    )
}

export default Comment
