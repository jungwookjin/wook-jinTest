import React, { useEffect, useCallback, useRef } from 'react';
import { StatusBar, LogBox, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './Navigation'
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import PushNoti from "./constants/PushNoti";
import * as MyAsyncStorage from "./constants/MyAsyncStorage";
import Config from "./constants/Config";

// ##### 리덕스 관련 ######
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import rootReducer from "./components/redux/rootReducer";
let store = createStore(rootReducer); // Render the app container component with the provider around it
// ##### 리덕스 관련 END

LogBox.ignoreAllLogs(); // 로그박스 안뜨도록 변경

// ********* FCM : 앱이 백그라운드&종료 상태 ********* //
// *** data만 보내야됨.
// ios는 저 함수가 첨에 안타는줄 알았어요.
// notification이랑 data 같이 보내면 안타는것 같더라구요.
// 저 함수가 안드만 타는줄 알고 이리저리 테스트 해보다가 data message부만 보내보니 잘 들어왔어요.
// firebase랑 notifee랑 분리되어있고, notifee로 notification을 띄우다 보니message().onNotificationOpenedApp
// message().getInitialNotification은 사용못해여
messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
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


const App = () => {
  const navigationRef: any = useRef(null);
  const routeNameRef = useRef();

  useEffect(() => {
    // ************************************** FCM 노티
    const authStatus = messaging().hasPermission();
    // if (authStatus == messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL) { Notifications.registerRemoteNotifications(); };

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      PushNoti.displayNoti(remoteMessage);
    });

    const unsubscribe2 = notifee.onForegroundEvent(({ type, detail }) => {
      console.log('*********** User pressed onForegroundEvent : ');
      switch (type) {
        case EventType.DISMISSED:
          break;
        case EventType.PRESS:
          console.log('User pressed notification : ' + detail.notification?.data);
          console.log('User pressed notification : ' + JSON.stringify(detail.notification?.data?.p_type));

          let remoteMsg: any = '';
          try {
            if (Platform.OS === 'android') {
              remoteMsg = detail.notification?.data?.p_type;
              console.log('User pressed notification : ' + remoteMsg);
            }
            MyAsyncStorage._writeAsyncStorage(Config.AS_BG_SERVICE_BACK, remoteMsg);

            if (navigationRef) {
              navigationRef.current.navigate('Intro', {});
            } else {
              console.log('************************  navigationRef 없음 ')
            }
          } catch (error) {
            MyAsyncStorage._writeAsyncStorage(Config.AS_BG_SERVICE_BACK, null);
            console.log('onForegroundEvent : ' + error)
          };
          break;
      }
    });

    return () => {
      unsubscribe;
      unsubscribe2;
    };
  }, []);




  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" backgroundColor={'#ffffff'} />
        <NavigationContainer ref={navigationRef}
          onReady={() => (routeNameRef.current = navigationRef.current.getCurrentRoute().name)}
          onStateChange={async (state) => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName = navigationRef.current.getCurrentRoute().name;

            if (previousRouteName !== currentRouteName) {

            };

            // Save the current route name for later comparison
            routeNameRef.current = currentRouteName;
          }}>
          <Navigation />
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
