import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {useHistory} from 'react-router-dom'
import {login} from '../../store/session'

import './Splash.css'


const SplashPage = () =>  {
    const sessionUser = useSelector(state => state.session.user);
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

  if (!sessionUser) {
      return (
            <div className='splash-container'>
                <div className='splash-content'>
                    {/* <img className='tourist' src={tourist1} alt='img'/> */}
                    <h1>Find your inner Tourist or see through the lense of others.</h1>
                    <form onSubmit={handleSubmit} >
                        <button class='demo-user-button'>Demo User</button>
                    </form>
                </div>
            </div>
      )
    }

    return (
        <Redirect to='explore-photos' />
    )
}

export default SplashPage
