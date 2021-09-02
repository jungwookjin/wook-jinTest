import React, { useEffect, useCallback, useRef } from 'react';
import { StatusBar, LogBox } from 'react-native';
import Navigation from './Navigation'
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from 'react-native-push-notification';
import * as MyUtil from "./constants/MyUtil";
import Colors from "./constants/Colors";

// ##### 리덕스 관련 ######
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import rootReducer from "./components/redux/rootReducer";
let store = createStore(rootReducer); // Render the app container component with the provider around it
// ##### 리덕스 관련 END

let msgId = ""

LogBox.ignoreAllLogs(); // 로그박스 안뜨도록 변경

// ********* FCM : 앱이 백그라운드&종료 상태 ********* //
messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
  MyUtil._consoleLog('********** NOTI 백그라운드&종료 상태 - json : ' + JSON.stringify(remoteMessage));
});

PushNotification.configure({
  onRegister: function (token: any) { console.log("TOKEN:", token); },
  onNotification: function (notification: any) {
    MyUtil._consoleLog("onNotification : " + JSON.stringify(notification))
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  onAction: function (notification: any) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);
  },
  onRegistrationError: function (err: any) { console.error(err.message, err); },
  permissions: { alert: true, badge: true, sound: true, },
  popInitialNotification: true,
  requestPermissions: true,
});

PushNotification.createChannel(
  {
    channelId: "default-channel-id", // (required)
    channelName: `Default channel`, // (required)
    channelDescription: "A default channel", // (optional) default: undefined.
    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created: any) => console.log(`createChannel 'default-channel-id' returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

PushNotification.getChannels(function (channels: any) {
  console.log(channels);
});

const App = () => {

  useEffect(() => {
    messaging().requestPermission()
      .then(() => { })
      .catch((error: any) => { MyUtil._consoleLog("*********************** _checkPermission 에러!!!! : " + error); });


    // ********* FCM : 앱이 포그라운드 상태 메시지를 '받으면' 발생되는 이벤트 ********* //
    const unsubOnMessgae = messaging().onMessage(async (remoteMessage: any) => {
      MyUtil._consoleLog('********** NOTI 포그라운드 노티 리시브 - json 1111 : ' + JSON.stringify(remoteMessage.messageId));
      // MyUtil._consoleLog('********** NOTI 포그라운드 노티 리시브 - json : ' + JSON.stringify(remoteMessage));

      if (String(remoteMessage.messageId) !== String(msgId)) {
        MyUtil._consoleLog('********** NOTI 포그라운드 노티 리시브 - json 2222 : ' + JSON.stringify(remoteMessage.messageId));
        msgId = String(remoteMessage.messageId);
        onNotif(remoteMessage)
      }
    });

    return () => {
      unsubOnMessgae;
    };
  }, [])


  const onNotif = async (notif: any) => {
    // MyUtil._consoleLog("********* " + MyUtil.isChatIng + " onNotif(notif) : " + JSON.stringify(notif))

    // @userInteraction - true: 클릭했을때 / false: 푸시받았을때
    // --------------------------------- 푸시 클릭 ---------------------------------- //
    if (notif.userInteraction) {
      if (notif.foreground && notif.data.chat_yn === 'y') {
        MyUtil._consoleLog("********* onNotif(클릭) : " + JSON.stringify(notif))
        // MyAsyncStorage._writeAsyncStorage(Config.AS_BG_SERVICE_CHAT, null);
      }

      // --------------------------------- 푸시 받음 ---------------------------------- //
    } else {
      // if (!MyUtil.isChatIng) {
      MyUtil._consoleLog("********* onNotif(title) : " + JSON.stringify(notif.data.title))

      let bodyText = ""
      if (MyUtil._isNull(notif.notification.body)) {
        bodyText = "";
      } else {
        bodyText = notif.notification.body;
      }


      PushNotification.localNotification({
        /* Android Only Properties */
        channelId: 'default-channel-id',
        autoCancel: true,
        vibrate: true,
        ongoing: false,
        visibility: "private",
        group: "msg",

        /* iOS and Android properties */
        title: notif.data.title,
        message: bodyText,
        // userInfo: notif.j_data,
        userInfo: { id: '001' },
        playSound: true,
      });
      // }
    }
  }


  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" backgroundColor={'#ffffff'} />
        <Navigation />
      </Provider>
    </>
  );
};

export default App;
