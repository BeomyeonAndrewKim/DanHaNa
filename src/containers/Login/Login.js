import React from 'react';

import LoginScreenContainer from './LoginScreenContainer';
import withAuth from '../../hocs/withAuth';

const Login = () => (
  <div>
    <LoginScreenContainer />
  </div>
);

export default withAuth(Login);
