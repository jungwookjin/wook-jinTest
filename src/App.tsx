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

    const unsubscribe2 = notifee.onForegroundEvent(notiEvent);


    

    return () => {
      unsubscribe;
      unsubscribe2;
    };
  }, []);


  const notiEvent = ({ type, detail }: any) => {
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
  }


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
