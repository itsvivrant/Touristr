import { csrfFetch } from "./csrf"

const USER_ALBUMS = 'albums/USER_ALBUMS';
const SINGLE_ALBUM = 'albums/SINGLE_ALBUM';
const ADD_ALBUM = 'albums/ADD_ALBUM';
const ADD_TO_ALBUM = 'albums/ADD_TO_ALBUM';
const REMOVE_ALBUM = 'albums/REMOVE_ALBUM';

const userAlbums = albums => ({
    type: USER_ALBUMS,
    albums
})

const singleAlbum = album => ({
    type: SINGLE_ALBUM,
    album
})

const addAlbum = album => ({
    type: ADD_ALBUM,
    album
})

const addToAlbum = album => ({
    type: ADD_TO_ALBUM,
    album
})

const removeAlbum = album => ({
    type: REMOVE_ALBUM,
    album
})

export const getUserAlbums = (id) => async dispatch => {
    const response = await csrfFetch(`/api/albums/user/${id}`);

    if (response.ok) {
        const albums = await response.json();
        dispatch(userAlbums(albums))
    }
}

export const getSingleAlbum = (id) => async dispatch =>  {
    const response = await csrfFetch(`/api/albums/${id}`);
    if (response.ok) {
        const album = await response.json();
        dispatch(singleAlbum(album))
    }
}

export const createAlbum = (data) => async dispatch => {
    const response = await csrfFetch('/api/albums/create', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const newAlbum = await response.json();
        dispatch(addAlbum(newAlbum))
    }
}

export const addPhotoToAlbum = (data) => async dispatch => {
    const response = await csrfFetch(`/api/albums/${data.albumId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const album = await response.json();
        dispatch(addToAlbum(album));
      }
}

export const deleteAlbum = (albumId) => async dispatch => {
    const response = await csrfFetch(`/api/albums/${albumId}/delete`, {
        method: 'DELETE',
    })
    if (response.ok) {
        dispatch(removeAlbum(albumId))
    }
}


const albumsReducer = (state = {}, action) => {
    let newState = {};
    switch(action.type) {
        case USER_ALBUMS: {
            action.albums.forEach(album => {
                newState[album.id] = album;
            });
            return newState;
        }

        case SINGLE_ALBUM: {
            const newState = {};
            newState[action.album.id] = action.album
            return newState 
        }

        case ADD_ALBUM: {
            const newState = {...state}
            newState[action.album.id] = action.album
            return newState
        }

        case ADD_TO_ALBUM: {
            const newState= {...state}
            newState[action.album.id] = action.album
            return newState
        }

        case REMOVE_ALBUM: {
            const newState = {...state}
            return newState
        }

        default:
            return state;
    }
}

export default albumsReducer
