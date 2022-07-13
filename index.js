/**
 * @format
 */

import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import * as MyAsyncStorage from "./src/constants/MyAsyncStorage";
import Config from "./src/constants/Config";
import App from './src/App';
import { name as appName } from './app.json';

// ********* FCM : 앱이 백그라운드&종료 상태 ********* //
// *** data만 보내야됨.
// ios는 저 함수가 첨에 안타는줄 알았어요.
// notification이랑 data 같이 보내면 안타는것 같더라구요.
// 저 함수가 안드만 타는줄 알고 이리저리 테스트 해보다가 data message부만 보내보니 잘 들어왔어요.
// firebase랑 notifee랑 분리되어있고, notifee로 notification을 띄우다 보니message().onNotificationOpenedApp
// message().getInitialNotification은 사용못해여

// **** 발송시 아래 옵션 필수. 있어야 setBackgroundMessageHandler 호출됨
// "android": {
//     "priority": "high"
//   },
//   "apns": {
//     "headers": {
//       "apns-priority": "10",
//       "apns-push-type": "alert"
//     }
//   },

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('********** NOTI 백그라운드&종료 상태 - json : ' + JSON.stringify(remoteMessage));
    let remoteMsg = '';
    try {
        remoteMsg = remoteMessage?.data?.p_type;
        console.log('********** NOTI 백그라운드&종료 상태 - remoteMsg : ' + remoteMsg);
        MyAsyncStorage._writeAsyncStorage(Config.AS_BG_SERVICE_BACK, remoteMsg);
    } catch (error) {
        MyAsyncStorage._writeAsyncStorage(Config.AS_BG_SERVICE_BACK, null);
        console.log('setBackgroundMessageHandler : ' + error)
    };
});


AppRegistry.registerComponent(appName, () => App);
