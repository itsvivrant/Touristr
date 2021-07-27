import { useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {login} from '../../store/session'

import './Splash.css'


const SplashPage = () =>  {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const demoUser = {
            credential: "Demo-lition",
            password: "password"
        }

        await dispatch(login(demoUser))
        history.push('/explore-photos')
    }


    return (
        <div className='splash-container'>
            <div className='splash-content'>
                <h1>Find your inner Tourist.</h1>
                <form onSubmit={handleSubmit} >
                    <button class='demo-user-button'>Demo User</button>
                </form>
            </div>
        </div>
    )



}

export default SplashPage
