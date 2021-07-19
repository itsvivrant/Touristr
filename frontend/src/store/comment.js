import {csrfFetch} from './csrf';

const LOAD_COMMENTS = 'comments/LOAD_COMMENTS';
const ADD_COMMENT = 'comments/ADD_COMMENT';
const EDIT_COMMENT = 'comments/EDIT_COMMENT';
const DELETE_COMMENT = 'comments/DELTE_COMMENT';

const loadComments = comments => ({
    type: LOAD_COMMENTS,
    comments
});

const addComment = comment => ({
    type: ADD_COMMENT,
    comment
})


const editComment = comment => ({
    type: EDIT_COMMENT,
    comment
})

const deleteComment = comment => ({
    type: DELETE_COMMENT,
    comment
})

export const getComments = (id) => async dispatch => {
    const response = await csrfFetch(`/api/comments/photos/${id}`);
    if (response.ok) {
        const comments = await response.json();
        dispatch(loadComments(comments))
    }
};

export const createComment = (comment) => async dispatch => {
    const response = await csrfFetch(`/api/comments/photos/${comment.photoId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })

    if (response.ok) {
        const newComment = await response.json();
        dispatch(addComment(newComment))
    }
};

export const updateComment = (comment) => async dispatch => {
    const response = await csrfFetch(`api/comments/photos/${comment.photoId}`, {
        method: 'PUT',
        body: JSON.stringify(comment),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const editedComment = await response.json();
        dispatch(editComment(editedComment))
        return editedComment
    }
}

export const removeComment = (id) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${id}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        dispatch(deleteComment(id))
    }
}

const initialState = {}

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_COMMENTS: {
            const newAllComments = {}
            action.comments.forEach(comment => {
                newAllComments[comment.id] = comment
            });
            return {
                ...newAllComments,
                ...state
            }
        }

        case ADD_COMMENT: {
            const newAddComment = {...state}
            newAddComment[action.comment.id] = action.comment
            return newAddComment
        }

        case EDIT_COMMENT: {
            const newEditComment = {...state}
            newEditComment[action.comment.id] = action.comment
            return newEditComment
        }

        case DELETE_COMMENT: {
            const newDeleteComment = {...state}
            delete newDeleteComment[action.comment]
            return newDeleteComment
        }
        default:
            return state
    }
}

export default commentReducer
