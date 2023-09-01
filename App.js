import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {Component} from 'react';

import {PermissionsAndroid} from 'react-native';

import SmsListener from 'react-native-android-sms-listener';
import SmsAndroid from 'react-native-get-sms-android';
import axios from 'axios';
import {apiurl} from './helpers/api';

/**
 * Pages
 */
import Welcome from './pages/Welcome';
import Messages from './pages/Messages';

const Stack = createNativeStackNavigator();

class App extends Component {
  state = {
    interval: null,
  };
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Messages"
            component={Messages}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  async componentDidMount() {
    const readPermission = await this.requestReadSmsPermission();
    const receivePermission = await this.requestReceiveSmsPermission();

    if (readPermission && receivePermission) {
      console.log('permission done');
      SmsListener.addListener(message => {
        this.sendMessageToApi(message);
      });
      this.readSms();
    }
  }

  async requestReadSmsPermission() {
    try {
      const grantedRead = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: 'SMS Permission',
          message: 'App need SMS permission',
        },
      );
      return grantedRead === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {}
  }
  async requestReceiveSmsPermission() {
    try {
      const grantedReceive = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
        {
          title: 'SMS Permission',
          message: 'App need SMS permission',
        },
      );
      return grantedReceive === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {}
  }
  sendMessageToApi(message) {
    axios
      .post(apiurl('from-sms-api/confirm'), message, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
  readSms() {
    SmsAndroid.list(
      JSON.stringify(filter),
      fail => {
        console.log('Failed with this error: ' + fail);
      },
      (count, smsList) => {
        // console.log('Count: ', count);
        const receiveMessages = JSON.parse(smsList);
        let messagesToSend = [];
        for (let r of receiveMessages) {
          if (r.address.toLowerCase() === 'mvola') {
            messagesToSend.push({
              originatingAddress: r.address.toLowerCase(),
              body: r.body,
              timestamp: r.date_sent,
            });
          }
        }
        this.reverifyConfirmation(messagesToSend);
      },
    );
  }
  reverifyConfirmation(messages) {
    for (let message of messages) {
      this.sendMessageToApi(message);
    }
  }
}

/* List SMS messages matching the filter */
const filter = {
  box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all

  /**
   *  the next 3 filters can work together, they are AND-ed
   *
   *  minDate, maxDate filters work like this:
   *    - If and only if you set a maxDate, it's like executing this SQL query:
   *    "SELECT * from messages WHERE (other filters) AND date <= maxDate"
   *    - Same for minDate but with "date >= minDate"
   */
  // minDate: 1554636310165, // timestamp (in milliseconds since UNIX epoch)
  // maxDate: 1556277910456, // timestamp (in milliseconds since UNIX epoch)
  // bodyRegex: '(.*)How are you(.*)', // content regex to match

  /** the next 5 filters should NOT be used together, they are OR-ed so pick one **/
  read: 0, // 0 for unread SMS, 1 for SMS already read
  // _id: 1234, // specify the msg id
  // thread_id: 12, // specify the conversation thread_id
  // address: '+1888------', // sender's phone number
  // body: 'How are you', // content to match
  /** the next 2 filters can be used for pagination **/
  // indexFrom: 0, // start from index 0
  // maxCount: 10, // count of SMS to return each time
};

export default App;
