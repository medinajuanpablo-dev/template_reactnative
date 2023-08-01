import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createBrowserHistory } from 'history';

import { PrivateRoute } from '../components/commons/PrivateRoute';
import config from '../config';

import Home from '../pages/Home';
import Error from '../pages/commons/Error';

import UserLogin from '../pages/auth/UserLogin';
import UserSignup from '../pages/auth/UserSignup';
import UserFullSignup from '../pages/auth/UserFullSignup';
import UserPassword from '../pages/auth/UserPassword';
import UserPasswordChange from '../pages/auth/UserPasswordChange';
import UserVerify from '../pages/auth/UserVerify';
import UserInfo from '../pages/auth/UserInfo';
import UserForgot from '../pages/auth/UserForgot';
import UserProfile from '../pages/auth/UserProfile';

import BookStep1 from '../pages/booking/BookStep1';
import BookStep2 from '../pages/booking/BookStep2';
import BookStep3 from '../pages/booking/BookStep3';
import BookStep4 from '../pages/booking/BookStep4';
import BookSuccess from '../pages/booking/BookSuccess';

import MyVehicle from '../pages/user/MyVehicle';
import MyVehicles from '../pages/user/MyVehicles';
import MyLocations from '../pages/user/MyLocations';
import MyWash from '../pages/user/MyWash';
import MyWashes from '../pages/user/MyWashes';

import MyOrdersList from "../pages/orders/MyOrdersList";
import MyOrder from "../pages/orders/edit/MyOrder";
import MyNewOrder from "../pages/orders/new/MyNewOrder";

import InfoTerms from '../pages/info/InfoTerms';
import InfoPrivacy from '../pages/info/InfoPrivacy';
import InfoContactUs from '../pages/info/InfoContactUs';
import InfoHowWorks from '../pages/info/InfoHowWorks';
import InfoWashTypes from '../pages/info/InfoWashTypes';
import InfoHelp from '../pages/info/InfoHelp';

export const history = createBrowserHistory();


export const Routes = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  return (
    <Switch location={location}>
      <Route path={config.ROUTES.TERMS} exact component={InfoTerms} />
      <Route path={config.ROUTES.PRIVACY} exact component={InfoPrivacy} />
      <Route path={config.ROUTES.CONTACT_US} exact component={InfoContactUs} />
      <Route path={config.ROUTES.HOW_WORKS} exact component={InfoHowWorks} />
      <Route path={config.ROUTES.WASH_TYPES} exact component={InfoWashTypes} />
      <Route path={config.ROUTES.HELP} exact component={InfoHelp} />

      <Route path={config.ROUTES.LOGIN} exact component={UserLogin} />
      <Route path={config.ROUTES.SIGNUP} exact component={UserSignup} />
      <Route path={config.ROUTES.SIGNUP_FULL} exact component={UserFullSignup} />
      <Route path={config.ROUTES.PASSWORD} exact component={UserPassword} />
      <Route path={config.ROUTES.VERIFY} exact component={UserVerify} />
      <Route path={config.ROUTES.FORGOT} exact component={UserForgot} />      
      <PrivateRoute path={config.ROUTES.PASSWORD_CHANGE} exact component={UserPasswordChange} />
      <PrivateRoute path={config.ROUTES.PROFILE} exact component={UserProfile} />
      <PrivateRoute path={config.ROUTES.USERINFO} exact component={UserInfo} />      

      <PrivateRoute path={config.ROUTES.BOOK.VEHICLE} exact component={BookStep1} />
      <PrivateRoute path={config.ROUTES.BOOK.SERVICE} exact component={BookStep2} />
      <PrivateRoute path={config.ROUTES.BOOK.TIME} exact component={BookStep3} />
      <PrivateRoute path={config.ROUTES.BOOK.REVIEW} exact component={BookStep4} />
      <PrivateRoute path={config.ROUTES.BOOK.SUCCESS} exact component={BookSuccess} />

      <PrivateRoute path={config.ROUTES.VEHICLES} exact component={MyVehicles} />
      <PrivateRoute path={config.ROUTES.LOCATIONS} exact component={MyLocations} />
      <PrivateRoute path={config.ROUTES.WASH} exact component={MyWash} />      
      <PrivateRoute path={config.ROUTES.WASHES} exact component={MyWashes} />      
      <PrivateRoute path={config.ROUTES.VEHICLE_NEW} exact component={MyVehicle} />
      <PrivateRoute path={config.ROUTES.VEHICLE_EDIT} exact component={MyVehicle} />

      <PrivateRoute path={config.ROUTES.ORDERS_LIST} exact component={MyOrdersList} />
      <PrivateRoute path={config.ROUTES.ORDER_EDIT} exact component={MyOrder} />
      <PrivateRoute path={config.ROUTES.ORDER_NEW} exact component={MyNewOrder} />

      <PrivateRoute path={config.ROUTES.HOME} exact component={Home} />
      <Route>
        <Error title={t('404')} headline={t('Page not found!')} button={t('Go back')}/>
      </Route>        
    </Switch>
);
}