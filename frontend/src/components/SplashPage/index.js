import './Splash.css'
import tourist1 from './tourist1.jpeg'
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux'



const SplashPage = () =>  {
    const sessionUser = useSelector(state => state.session.user);

  if (!sessionUser) {
      return (
            <div className='splash-container'>
                <div className='splash-content'>
                    {/* <img className='tourist' src={tourist1} alt='img'/> */}
                    <h1>Find your inner Tourist or see through the lense of others.</h1>
                    <button class='demo-user-button'>Demo User</button>
                </div>

                <div>

                </div>
            </div>
      )
    }

    return (
        <Redirect to='explore-photos' />
    )
}

export default SplashPage
