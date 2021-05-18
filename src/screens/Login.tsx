import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, View, ImageBackground, Image, Platform, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux'
import { BlurView } from "@react-native-community/blur";
import { RootState } from '../components/redux/rootReducer'
import Loader from "../components/Loader"
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import Config from "../constants/Config";
import * as ServerApi from "../constants/ServerApi";
import * as MyAsyncStorage from "../constants/MyAsyncStorage";
import * as MyUtil from "../constants/MyUtil";
import allActions from "../components/redux/allActions"



const Login = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        async function fetchData() {

        }
        fetchData();
    }, []);



    const LoginStart = useCallback(async () => {
        navigation.reset({ index: 0, routes: [{ name: 'Main', params: {} }] });

        // const result = await ServerApi._login(email, String(password), easyYn, uniqKey, MyUtil.iosVoipToken, deviceNm);
        // if (result.IS_SUCCESS === true && result.DATA_RESULT.RSP_CODE === "100") {

        //     MyAsyncStorage._writeAsyncStorage(Config.AS_KEY_LOGIN_INFO, { userId: email, userPw: String(password), easyYn, uniqKey });
        //     dispatch(allActions.setRxLoginInfo(result.DATA_RESULT))

        //     if (result.DATA_RESULT.C_GB === "B") {
        //         navigation.reset({ index: 0, routes: [{ name: 'AdminMyPage', params: { topTitle: '더사주', isNotice: false, isBackBtn: false } }] })
        //     } else {
        //         navigation.reset({ index: 0, routes: [{ name: 'Main', params: { topTitle: '더사주', isNotice: true, isBackBtn: false } }] });
        //     }
        // } else if (Number(result.DATA_RESULT.RSP_CODE) < 800) {
        //     Alert.alert("", result.DATA_RESULT.MSG)
        //     dispatch(allActions.logOut())
        //     MyAsyncStorage._writeAsyncStorage(Config.AS_KEY_LOGIN_INFO, null);

        // } else {
        //     Alert.alert("", "네트워크 환경이 불안정 합니다!\n _tabLogin:" + result.DATA_RESULT.RSP_CODE)
        //     dispatch(allActions.logOut())
        //     MyAsyncStorage._writeAsyncStorage(Config.AS_KEY_LOGIN_INFO, null);
        // }
    }, [])

    return (
        <ImageBackground source={require('../img/bg_blue.png')} resizeMode='cover'
            style={{ width: Layout.window.width, flex: 1 }}>
            <SafeAreaView style={{ flex: 1, width: Layout.window.width }}>
                {
                    loading ? (<Loader />) : (
                        // <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', width: Layout.window.width }} keyboardShouldPersistTaps='handled'>
                        <View style={{ width: Layout.window.width, flex: 1, alignItems: 'center' }}>

                            <View style={styles.blurShadowWrap}>
                                <View style={styles.blurRadiusWrap}>
                                    <BlurView
                                        style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
                                        blurType="xlight"
                                        blurAmount={10}
                                        reducedTransparencyFallbackColor="white"
                                    />

                                    <TouchableOpacity style={{ width: Layout.window.width - 90, height: (Layout.window.width - 90) / 6, marginVertical: 5 }}
                                        onPress={() => { LoginStart() }}>
                                        <Image style={{ width: Layout.window.width - 90, height: (Layout.window.width - 90) / 6 }}
                                            source={require('../img/btn_login_kakao.png')}
                                            resizeMode='contain' />
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ width: Layout.window.width - 90, height: (Layout.window.width - 90) / 6, marginVertical: 5 }}
                                        onPress={() => { LoginStart() }}>
                                        <Image style={{ width: Layout.window.width - 90, height: (Layout.window.width - 90) / 6 }}
                                            source={require('../img/btn_login_google.png')}
                                            resizeMode='contain' />
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ width: Layout.window.width - 90, height: (Layout.window.width - 90) / 6, marginVertical: 5 }}
                                        onPress={() => { LoginStart() }}>
                                        <Image style={{ width: Layout.window.width - 90, height: (Layout.window.width - 90) / 6 }}
                                            source={require('../img/btn_login_apple.png')}
                                            resizeMode='contain' />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        // </ScrollView>
                    )
                }
            </SafeAreaView >
        </ImageBackground>
    );

}

const styles = StyleSheet.create({
    blurShadowWrap: {
        position: 'absolute', bottom: 10, width: Layout.window.widthFix, height: 200, borderRadius: 20,
        ...Platform.select({
            ios: {
                shadowColor: "rgb(50, 50, 50)",
                shadowOpacity: 0.3,
                shadowRadius: 3,
                shadowOffset: {
                    height: 1,
                    width: 1
                }
            },
            android: {
                elevation: 2
            }
        })
    },
    blurRadiusWrap: {
        width: '100%', height: '100%', overflow: 'hidden', justifyContent: 'center', alignItems: 'center', borderRadius: 20
    }
});

export default Login;