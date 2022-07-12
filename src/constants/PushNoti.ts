import notifee, { AndroidImportance, AndroidLaunchActivityFlag } from '@notifee/react-native';

const displayNotification = async (message: any) => {
    console.log('******** displayNotification ')

    await notifee.requestPermission();
    let title = '', body = '', data = {};

    try {
        if (message?.notification?.title) {
            title = message?.notification?.title;
        };
        if (message?.notification?.body) {
            body = message?.notification?.body;
        };
        if (message?.data?.title) {
            title = message?.data?.title;
        };
        if (message?.data?.body) {
            body = message?.data?.body;
        };
        if (message?.data) {
            data = message?.data;
        };
    } catch (err) { };

    const channelAnoucement = await notifee.createChannel({
        id: 'defaultId',
        name: 'defaultName',
        importance: AndroidImportance.HIGH,
        // groupId:'defaultGid',
    });

    // channelId: 'defaultId',
    // name: 'defaultName',
    // groupId: 'defaultGid',
    // groupName: 'defaultGnm',
    // importance: 5,
    // description: 'My Description',
    // enableLights: true,
    // enableVibration: true,
    // showBadge: true,

    await notifee.displayNotification({
        title: title,
        body: body,
        data: data,
        android: {
            // vibrationPattern: [500, 500, 1500],
            channelId: channelAnoucement,
            smallIcon: 'ic_launcher',
            pressAction: {
                id: 'defaultId',
                launchActivity: 'smanager://open',
                launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
                // id: 'rnthreephone://open',
                // launchActivity: 'com.rnthreephone.MainActivity', 
                // category: 'default',
                // link: 'barabom://open',
                // android_channel_id: 'defaultId',
            }
        },
        ios: {
            foregroundPresentationOptions: { alert: true, badge: true, sound: true },
        },
    });
};

export default {
    displayNoti: (remoteMessage: any) => displayNotification(remoteMessage)
};