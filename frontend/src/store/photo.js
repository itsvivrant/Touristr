import {csrfFetch} from './csrf';

const LOAD_PHOTOS = 'photos/LOAD_PHOTOS'

// action creator
const loadPhotos = photos => ({
    type: LOAD_PHOTOS,
    photos
})

//thunk action creator
export const getPhotos = () => async dispatch => {
    const response = await csrfFetch('/api/photos');

    if (response.ok) {
        const photos = await response.json();
        dispatch(loadPhotos(photos))
    }
}

//reducer
const initialState = {}

const photoReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PHOTOS: {
            const allPhotos = {};
            action.photos.forEach(photo => {
                allPhotos[photo.id] = photo
            });
            return {
                ...allPhotos, ...state
            }
        }
        default:
            return state;
    }

}

export default photoReducer
