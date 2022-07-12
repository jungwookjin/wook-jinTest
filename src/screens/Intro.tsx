import React, { useEffect, useCallback } from "react";
import { View, Image, Linking, Alert, Platform } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import Layout from "../constants/Layout";
import * as SG from '../constants/Signature';
import * as ServerApi from "../constants/ServerApi";
import * as MyUtil from "../constants/MyUtil";
import * as MyAsyncStorage from "../constants/MyAsyncStorage";
import Config from "../constants/Config";
import allActions from "../components/redux/allActions";
import CST from '../constants/constants';

const Intro = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<StackNavigationProp<any>>();
    let mTimeout: any = null;

    useEffect(() => {
        async function fetchData() {
            const bgServiceDeepLink = await MyAsyncStorage._getAsyncStorage(Config.AS_BG_SERVICE_DEEP_LINK);
            const mybgdata = await MyAsyncStorage._getAsyncStorage(Config.AS_BG_SERVICE_BACK);

            console.log("********** intro 11111 bgServiceDeepLink : " + JSON.stringify(bgServiceDeepLink));
            console.log("********** intro 22222 mybgdata : " + JSON.stringify(mybgdata));

            // ************************************************  딥 링킹 처리 ************************************************ //
            if (!MyUtil._isNull(bgServiceDeepLink)) {
                console.log("********** intro bgServiceDeepLink : " + JSON.stringify(bgServiceDeepLink));


                // ** 어싱크에 로그인 데이터가 존재하면 자동 로그인
                const loginInfo = await MyAsyncStorage._getAsyncStorage(Config.AS_KEY_LOGIN_INFO);
                if (loginInfo !== null) {
                    await LoginStart(loginInfo.easy_type, loginInfo.uniq_key);
                };


                MyAsyncStorage._writeAsyncStorage(Config.AS_BG_SERVICE_DEEP_LINK, null);
                MyAsyncStorage._writeAsyncStorage(Config.AS_BG_SERVICE_BACK, null);
                if (bgServiceDeepLink === 'p1') {
                    navigation.reset({
                        index: 1, routes: [
                            { name: 'Main', params: {} },
                            { name: 'PicList', params: {} },
                        ]
                    });

                } else if (bgServiceDeepLink === 'p2') {
                    navigation.reset({
                        index: 1, routes: [
                            { name: 'Main', params: {} },
                            { name: 'MenuPage', params: {} },
                        ]
                    });
                }
                else {
                    navigation.reset({ index: 0, routes: [{ name: 'Login', params: {} }] });
                }


            } else if (!MyUtil._isNull(mybgdata)) {
                console.log("********** intro mybgdata : " +mybgdata);


                // ** 어싱크에 로그인 데이터가 존재하면 자동 로그인
                const loginInfo = await MyAsyncStorage._getAsyncStorage(Config.AS_KEY_LOGIN_INFO);
                if (loginInfo !== null) {
                    // await LoginStart(loginInfo.login_corp, loginInfo.uniq_key, loginInfo.nick, loginInfo.profile_img);
                    await LoginStart(loginInfo.easy_type, loginInfo.uniq_key);
                };


                MyAsyncStorage._writeAsyncStorage(Config.AS_BG_SERVICE_DEEP_LINK, null);
                MyAsyncStorage._writeAsyncStorage(Config.AS_BG_SERVICE_BACK, null);
                if (mybgdata === 'p1') {
                    navigation.reset({
                        index: 1, routes: [
                            { name: 'Main', params: {} },
                            { name: 'PicList', params: {} },
                        ]
                    });

                } else if (mybgdata === 'p2') {
                    navigation.reset({
                        index: 1, routes: [
                            { name: 'Main', params: {} },
                            { name: 'MenuPage', params: {} },
                        ]
                    });
                }
                else {
                    navigation.reset({ index: 0, routes: [{ name: 'Login', params: {} }] });
                }

            } else {
                navigation.reset({ index: 0, routes: [{ name: 'Login', params: {} }] });
            };
        };

        fetchData();
        return () => {
            clearInterval(mTimeout);
            mTimeout = null;
        };
    }, []);



    const LoginStart = useCallback(async (easy_type, uniq_key) => {
        const result = await ServerApi._login(easy_type, uniq_key);
        if (result.IS_SUCCESS === true && result.DATA_RESULT.RSP_CODE === CST.DB_SUCSESS) {
            MyAsyncStorage._writeAsyncStorage(Config.AS_KEY_LOGIN_INFO, { easy_type, uniq_key });
            dispatch(allActions.setRxLoginInfo(result.DATA_RESULT));
        } else if (result.DATA_RESULT.RSP_CODE === CST.DB_USER_NONE) {
            MyAsyncStorage._writeAsyncStorage(Config.AS_KEY_LOGIN_INFO, { easy_type, uniq_key });
            dispatch(allActions.setRxLoginInfo(result.DATA_RESULT));
        } else {
            navigation.reset({ index: 0, routes: [{ name: 'Login', params: {} }] });
            MyUtil._alertMsg('LoginStart', result.DATA_RESULT);
        }
    }, [])


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <View style={{ width: Layout.window.width, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {/* <Image style={{ width: 160, height: 160 }}
                    source={require('../img/logo_splash.png')} resizeMode='cover' /> */}
            </View>
        </SafeAreaView >
    )
}

export default Intro;