import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from "react-router-dom";

import * as authActions from '../store/actions/auth';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Landing from '../routes/Landing';
import Navigation from './Navigation';
import MyStudios from '../routes/MyStudios';
import NewStudio from '../routes/NewStudio';
import StudioDetail from '../routes/StudioDetail';
import EditStudio from '../routes/EditStudio';

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
                        <Route exact path="/my-studios">
                            <MyStudios />
                        </Route>
                        <Switch>
                            <Route exact path="/my-studios/new">
                                <NewStudio />
                            </Route>
                            <Route exact path="/my-studios/:id">
                                <StudioDetail />
                            </Route>
                            <Route exact path="/my-studios/:id/edit">
                                <EditStudio />
                            </Route>
                        </Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Redirect to="/" />
                    </>
                ) : (
                        <>
                            <Route exact path="/">
                                <Landing />
                            </Route>
                            <Route exact path="/sign-up">
                                <Auth isLogin={false} />
                            </Route>
                            <Route exact path="/login">
                                <Auth isLogin={true} />
                            </Route>
                            <Redirect to="/" />
                        </>
                    )}
            </Switch>
        </>
    );
};
export default withRouter(AppRouter);
