import {csrfFetch} from './csrf';

const LOAD_PHOTOS = 'photos/LOAD_PHOTOS';
const LOAD_SINGLE_PHOTO = 'photos/LOAD_SINGLE_PHOTO';
const ADD_PHOTO = 'photos/ADD_PHOTO';

// action creator
const loadPhotos = photos => ({
    type: LOAD_PHOTOS,
    photos
})

const loadSinglePhoto = photo => ({
    type: LOAD_SINGLE_PHOTO,
    photo
})


const addPhoto = photo => ({
    type: ADD_PHOTO,
    photo
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

export const getSinglePhoto = (photoId) => async dispatch => {
    const response = await csrfFetch(`/api/photos/${photoId}`);

    if (response.ok) {
        const photo = await response.json();
        dispatch(loadSinglePhoto(photo))
    }
}


export const uploadPhoto = (photoData) => async dispatch => {
    const response = await csrfFetch(`/api/photos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(photoData)
    });
    if (response.ok) {
        const newPhoto = await response.json();
        dispatch(addPhoto(newPhoto))
        return newPhoto
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

        case LOAD_SINGLE_PHOTO: {
            const onePhoto = {};
            onePhoto[action.photo.id] = action.photo
            return onePhoto
        }

        case ADD_PHOTO: {
            const addPhoto = {
                ...state,
                [action.photo.id]: action.photo
            }
            return addPhoto
        }
        default:
            return state;
    }

}

export default photoReducer
