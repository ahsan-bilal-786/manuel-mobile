import React, {Component} from 'react';
import {getUserToken, storeUserToken} from 'utils/asyncStorage';
import {registerToken} from 'api';

class AuthLoadingScreen extends Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const token = await getUserToken();
    if (token) {
      storeUserToken(token);
      registerToken(token);
      this.props.navigation.navigate('Profile');
    } else {
      this.props.navigation.navigate('Login');
    }
  };

  // Render any loading content that you like here
  render() {
    return <></>;
  }
}

export default AuthLoadingScreen;
