import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';
import { setCurrentUser } from './redux/User/user.actions';

//Chris's stuff
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import ShowAllReviews from './ShowAllReviews'
import NavBar from './NavBar'
import Viewings2 from './Viewings2'

// components
import AdminToolbar from './components/AdminToolbar';
import SearchBar from './components/SearchBar';

//hoc
import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth';

// layouts

import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';



//pages
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Posts from './pages/Posts';
import Movies from './pages/Movies';
import MovieDetails from "./pages/MovieDetails";
import NotFound from "./pages/NotFound";
import './default.scss';
import withAuth from './hoc/withAuth';

const App = props => {
  const [user, setUser] = useState([]);

  const dispatch = useDispatch();
  const userAuth = ("");

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          dispatch(setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          }));
        })
      }

      dispatch(setCurrentUser(userAuth));
    });

    return () => {
      authListener();
    };
  }, []);

  return (
    <div className="App">
      <AdminToolbar />
      <Switch>
        <Route exact path="/" render={() => (
          <HomepageLayout>
            <NavBar />
            <SearchBar />
            <Homepage />
          </HomepageLayout>

        )} />
        <Route path="/registration" render={() => (
          <MainLayout>
            <Registration />
          </MainLayout>

        )} />
        <Route path="/login"
          render={() => (
            <MainLayout>
              <NavBar />
              <SearchBar />
              <Login />
            </MainLayout>

          )} />

        <Route path="/recovery" render={() => (
          <MainLayout>
            <NavBar />
            <SearchBar />
            <Recovery />
          </MainLayout>
        )} />

        <Route path="/dashboard" render={() => (
          <WithAuth>
            <MainLayout>
              <NavBar />
              <SearchBar />
              <Dashboard />
            </MainLayout>
          </WithAuth>
        )} />

        <Route path="/admin" render={() => (
          <WithAdminAuth>
            <MainLayout>
              <NavBar />
              <SearchBar />
              <Admin />
            </MainLayout>
          </WithAdminAuth>
        )} />

        <Route path="/posts" render={() => (
          <WithAdminAuth>
            <MainLayout>
              <NavBar />
              <SearchBar />
              <Posts />
            </MainLayout>
          </WithAdminAuth>
        )} />
        {/* 
              <Route path="/yooo" render={() => (
                <Viewings />
              )} /> */}

        <Route path="/reviews">
          <div className="navbarStick">
            <NavBar />
            <SearchBar />
            <HomepageLayout>
              <div className="app__page">
                <div className="app__posts">
                  <ShowAllReviews user={user} />
                </div>
              </div>
            </HomepageLayout>
          </div>

        </Route>

        <Route path="/showings">
          <div className="navbarStick">
            <NavBar />
            <SearchBar />
            <HomepageLayout>
              <Viewings2 />
            </HomepageLayout>
          </div>
        </Route>

        <Route path="/Movies">
          <div className="navbarStick">
            <NavBar />
            <SearchBar />
            <Movies />
          </div>
        </Route>

        <Route path="/movie_details/:id">
          <div className="navbarStick">
            <NavBar />
            <SearchBar />
            <MovieDetails />
          </div>
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>

    </div>
  );
}

export default App;
