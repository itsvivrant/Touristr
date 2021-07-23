import { csrfFetch } from "./csrf"

const USER_ALBUMS = 'albums/USER_ALBUMS';

const userAlbums = albums => ({
    type: USER_ALBUMS,
    albums
})

export const getUserAlbums = (id) => async dispatch => {
    const response = await csrfFetch(`/api/albums/user/${id}`);

    if (response.ok) {
        const albums = await response.json();
        dispatch(userAlbums(albums))
    }
}

const initialState = {}
const albumsReducer = (state = initialState, action) => {
    let newState = {};
    switch(action.type) {
        case USER_ALBUMS: {
            action.albums.forEach(album => {
                newState[album.id] = album;
            });
            return newState;
        }

        default:
            return state;
    }
}

export default albumsReducer
