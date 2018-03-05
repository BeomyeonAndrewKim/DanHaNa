import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';

import 'antd/dist/antd.css';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

window.prerenderReady = false;
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
