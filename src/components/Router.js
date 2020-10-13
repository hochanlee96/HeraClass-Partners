import React from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Landing from '../routes/Landing';
import Navigation from './Navigation';
import MyClass from '../routes/MyClass';
import NewClass from '../routes/NewClass';

const AppRouter = ({ isLoggedIn, userObj }) => {
    return (
        <>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <Switch>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/">
                            <Home userObj={userObj} />
                        </Route>
                        <Route exact path="/my-class">
                            <MyClass userObj={userObj} />
                        </Route>
                        <Route exact path="/my-class/new">
                            <NewClass userObj={userObj} />
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
        </>
    );
};
export default withRouter(AppRouter);
