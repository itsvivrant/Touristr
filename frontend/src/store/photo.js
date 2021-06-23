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
        return photos
    }
}

//reducer
const initialState = {}

const photoReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PHOTOS: {
            const allPhotos = {}; //doesn't modify the existing state aka new state
            action.photos.forEach(photo => {
                allPhotos[photo.id] = photo //setting all photos at photo at id and giving its value
            });
            // console.log(allPhotos)
            return {
                ...state, ...allPhotos //returning new state and existing state
            }
        }
        default:
            return state;
    }

}

export default photoReducer
