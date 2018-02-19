import React from 'react';

import LoginScreenContainer from './LoginScreenContainer';
import withAuth from '../../hocs/withAuth';

const Login = (...props) => <LoginScreenContainer {...props} />;

export default withAuth(Login);
