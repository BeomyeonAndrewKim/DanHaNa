import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import Push from 'push.js';

import 'antd/dist/antd.css';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging
  .requestPermission()
  .then(() => {
    console.log('Notification permission granted.');
    // TODO(developer): Retrieve an Instance ID token for use with FCM.
    messaging
      .getToken()
      .then(currentToken => {
        if (currentToken) {
          // sendTokenToServer(currentToken);
          // updateUIForPushEnabled(currentToken);
          console.log(currentToken);
        } else {
          // Show permission request.
          console.log(
            'No Instance ID token available. Request permission to generate one.',
          );
          // Show permission UI.
          // updateUIForPushPermissionRequired();
          // setTokenSentToServer(false);
        }
      })
      .catch(err => {
        console.log('An error occurred while retrieving token. ', err);
        // showToken('Error retrieving Instance ID token. ', err);
        // setTokenSentToServer(false);
      });
  })
  .catch(err => {
    console.log('Unable to get permission to notify.', err);
  });

messaging.onMessage(payload => {
  console.log('Message received. ', payload);
  Push.create(`${payload.notification.title}`, {
    body: `${payload.notification.body}`,
    timeout: 4000,
    onClick() {
      window.focus();
      this.close();
    },
  });
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
