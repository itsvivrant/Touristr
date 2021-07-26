import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import ExplorePage from "./components/ExplorePage";
import PhotoPage from "./components/PhotoPage";
import UploadPhotoPage from "./components/UploadPhotoPage";
import EditPhotoForm from "./components/EditPhotoForm";
import UserProfilePage from "./components/UserProfilePage";
import UserAlbumsPage from "./components/UserAlbumsPage";
// import UserProfilePage from "./components/UserProfilePage";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <SplashPage />
          </Route>

          <Route path="/login">
            <LoginFormPage />
          </Route>

          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <Route path='/explore-photos'>
            <ExplorePage />
          </Route>

          <Route path='/photos/:id'>
            <PhotoPage />
          </Route>

          {/* <Route path='/upload'>
            <UploadPhotoPage />
          </Route> */}

          <Route path='/edit/:id'>
            <EditPhotoForm />
          </Route>

          <Route path='/users/:id'>
            <UserProfilePage/>
          </Route>

          <Route path='/albums/user/:id'>
            <UserAlbumsPage/>
          </Route>

        </Switch>
      )}
    </>
  );
}
//all the routes
export default App;
