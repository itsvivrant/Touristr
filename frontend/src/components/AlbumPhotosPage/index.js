import React, {useEffect} from 'react';
import {useHistory, Redirect, useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


function AlbumPhotosPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const album = useSelector(state => state.albums[id])


}


export default AlbumPhotosPage
