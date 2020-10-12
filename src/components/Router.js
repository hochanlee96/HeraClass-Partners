import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Landing from '../routes/Landing';
import Navigation from './Navigation';
import MyGym from '../routes/MyGym';

const AppRouter = ({ isLoggedIn, userObj }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <Switch>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/">
                            <Home userObj={userObj} />
                        </Route>
                        <Route exact path="/my-gym">
                            <MyGym userObj={userObj} />
                        </Route>
                    </>
                ) : (
                        <>
                            <Route exact path="/">
                                <Landing />
                            </Route>
                            <Route exact path="/auth">
                                <Auth />
                            </Route>
                        </>
                    )}
            </Switch>
        </Router>
    );
};
export default AppRouter;
