import React, { Component } from 'react';
import * as firebase from 'firebase';
import AlarmScreen from '../../components/Alarm/AlarmScreen';
import withLoadingIndicator from '../../hocs/withLoadingIndicator';

const WithLoadingAlarmScreen = withLoadingIndicator(AlarmScreen);

export default class AlarmScreenContainer extends Component {
  handleSwitch = checked => {
    const messaging = firebase.messaging();
    if (checked) {
      messaging
        .requestPermission()
        .then(() => {
          console.log('Notification permission granted.');
          // TODO(developer): Retrieve an Instance ID token for use with FCM.
          // ...
        })
        .catch(err => {
          console.log('Unable to get permission to notify.', err);
        });
    }
  };
  render() {
    return <WithLoadingAlarmScreen handleSwitch={this.handleSwitch} />;
  }
}
