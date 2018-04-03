import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Helmet } from 'react-helmet';
import ReactGA from 'react-ga';
import reducers from '../ducks/index';
import LoginScreenContainer from '../containers/Login/LoginScreenContainer';
import IntroScreen from '../components/Intro/IntroScreen';
import Profile from '../components/Profile/ProfileScreen';
import MainScreenContainer from '../containers/Main/MainScreenContainer';
import EditThisWeekMissionContainer from '../containers/Mission/EditThisWeekMissionContainer';
import ShowNextWeekMissionContainer from '../containers/Mission/ShowNextWeekMissionContainer';
import EditNextWeekMissionContainer from '../containers/Mission/EditNextWeekMissonContainer';
import DashboardScreenContainer from '../containers/Dashboard/DashboardScreenContainer';
import withAuth from '../hocs/withAuth';
import CalendarScreenContainer from '../containers/Calendar/CalendarScreenContainer';
import SNSMainScreenContainer from '../containers/Main/SNSMainScreenContainer';
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactGA.initialize('UA-112057755-3');
ReactGA.pageview(window.location.pathname + window.location.search);
export default class extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Helmet>
              <title>DanHaNa</title>
            </Helmet>
            <Route path="/" exact component={IntroScreen} />
            <Route path="/login" component={LoginScreenContainer} />
            <Route path="/profile" component={withAuth(Profile)} />
            <Route path="/main" component={withAuth(MainScreenContainer)} />
            <Route
              path="/editthisweekmission"
              component={withAuth(EditThisWeekMissionContainer)}
            />
            <Route
              path="/nextweekmission"
              component={withAuth(ShowNextWeekMissionContainer)}
            />
            <Route
              path="/editnextweekmission"
              component={withAuth(EditNextWeekMissionContainer)}
            />
            <Route
              path="/dashboard"
              component={withAuth(DashboardScreenContainer)}
            />
            <Route
              path="/calendar"
              component={withAuth(CalendarScreenContainer)}
            />
            <Route path="/snsshare" component={SNSMainScreenContainer} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
