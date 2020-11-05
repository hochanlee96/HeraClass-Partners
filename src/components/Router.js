import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from "react-router-dom";

import * as authActions from '../store/actions/auth';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Landing from '../routes/Landing';
import Navigation from './Navigation';
import MyClass from '../routes/MyClass';
import NewClass from '../routes/NewClass';
import ClassDetail from '../routes/ClassDetail';
import EditClass from '../routes/EditClass';

const AppRouter = () => {

    const dispatch = useDispatch();
    const userEmail = useSelector(state => state.auth.email);

    useEffect(() => {
        dispatch(authActions.authCheckState());
    }, [dispatch])

    return (
        <>
            {userEmail !== "" && <Navigation userEmail={userEmail} />}
            <Switch>
                {userEmail !== "" ? (
                    <>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/my-class">
                            <MyClass />
                        </Route>
                        <Switch>
                            <Route exact path="/my-class/new">
                                <NewClass />
                            </Route>
                            <Route exact path="/my-class/:id">
                                <ClassDetail />
                            </Route>
                            <Route exact path="/my-class/:id/edit">
                                <EditClass />
                            </Route>
                        </Switch>
                    </>
                ) : (
                        <>
                            <Route exact path="/">
                                <Landing />
                            </Route>
                            <Route exact path="/auth">
                                <Auth />
                            </Route>
                            <Redirect to="/" />
                        </>
                    )}
            </Switch>
        </>
    );
};
export default withRouter(AppRouter);
