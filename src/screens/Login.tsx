import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, View, ImageBackground, Image, Platform, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux'
import { BlurView } from "@react-native-community/blur";
import { RootState } from '../components/redux/rootReducer'
import {
    KakaoOAuthToken, KakaoProfile, unlink,
    logout as kakaoLogout,
    getProfile as getKakaoProfile,
    login as kakaLogin
} from '@react-native-seoul/kakao-login';
import Loader from "../components/Loader"
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import Config from "../constants/Config";
import * as ServerApi from "../constants/ServerApi";
import * as MyAsyncStorage from "../constants/MyAsyncStorage";
import * as MyUtil from "../constants/MyUtil";
import allActions from "../components/redux/allActions"
import CST from '../constants/constants';



const Login = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        async function fetchData() {

        }
        fetchData();
    }, []);


    const KakaoLoginStart = useCallback(async () => {
        kakaLogin()
            .then((token: KakaoOAuthToken) => {
                if (!MyUtil._isNull(token.accessToken)) {
                    return getKakaoProfile()
                } else {
                    throw '카카오 로그인 토큰 정보가 없습니다.';
                }
            })
            .then(async (profile: any) => {
                await kakaoLogout();
                LoginStart("k", profile.id)
            })
            .catch((errData) => { // reject에 에러 정보 존재
                Alert.alert('KakaoLoginStart', JSON.stringify(errData))
            });
    }, [])


    const LoginStart = useCallback(async (easy_type, uniq_key) => {
        const result = await ServerApi._login(easy_type, uniq_key);
        if (result.IS_SUCCESS === true && result.DATA_RESULT.RSP_CODE === CST.DB_SUCSESS) {
            MyAsyncStorage._writeAsyncStorage(Config.AS_KEY_LOGIN_INFO, { easy_type, uniq_key });
            dispatch(allActions.setRxLoginInfo(result.DATA_RESULT))
            navigation.reset({ index: 0, routes: [{ name: 'Main', params: {} }] });

        } else if (Number(result.DATA_RESULT.RSP_CODE) === CST.DB_USER_NONE) {
            navigation.navigate({ name: 'InfoUpdate', params: { isJoin: true } });

        } else {
            MyUtil._alertMsg('LoginStart', result.DATA_RESULT)
        }
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
                                        onPress={() => { KakaoLoginStart() }}>
                                        <Image style={{ width: Layout.window.width - 90, height: (Layout.window.width - 90) / 6 }}
                                            source={require('../img/btn_login_kakao.png')}
                                            resizeMode='contain' />
                                    </TouchableOpacity>

                                    {/* <TouchableOpacity style={{ width: Layout.window.width - 90, height: (Layout.window.width - 90) / 6, marginVertical: 5 }}
                                        onPress={() => { LoginStart() }}>
                                        <Image style={{ width: Layout.window.width - 90, height: (Layout.window.width - 90) / 6 }}
                                            source={require('../img/btn_login_google.png')}
                                            resizeMode='contain' />
                                    </TouchableOpacity> */}

                                    <TouchableOpacity style={{ width: Layout.window.width - 90, height: (Layout.window.width - 90) / 6, marginVertical: 5 }}
                                        onPress={() => { navigation.reset({ index: 0, routes: [{ name: 'Main', params: {} }] }); }}>
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
        position: 'absolute', bottom: 10, width: Layout.window.widthFix, height: 120, borderRadius: 20,
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
        width: '100%', height: 120, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', borderRadius: 20
    }
});

export default Login;