import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, View, ImageBackground, Image, Platform, Alert, Text, Linking } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { BlurView } from "@react-native-community/blur";
import { RootState } from '../components/redux/rootReducer';
import { appleAuth, appleAuthAndroid } from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import {
    KakaoOAuthToken, KakaoProfile, unlink,
    logout as kakaoLogout,
    getProfile as getKakaoProfile,
    login as kakaLogin
} from '@react-native-seoul/kakao-login';
import Loader from "../components/Loader";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import Config from "../constants/Config";
import * as ServerApi from "../constants/ServerApi";
import * as MyAsyncStorage from "../constants/MyAsyncStorage";
import * as MyUtil from "../constants/MyUtil";
import allActions from "../components/redux/allActions";
import CST from '../constants/constants';



const Login = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        async function fetchData() {
            const loginInfo = await MyAsyncStorage._getAsyncStorage(Config.AS_KEY_LOGIN_INFO)

            // ** 어싱크에 로그인 데이터가 존재하면 자동 로그인
            if (loginInfo !== null) {
                LoginStart(loginInfo.easy_type, loginInfo.uniq_key)
            } else {
                setLoading(false)
            }
        }
        fetchData()

        return () => { }
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



    const AppleLoginStart = useCallback(async () => {
        try {
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME,],
            });

            const { user: newUser, nonce, identityToken } = appleAuthRequestResponse;
            const credentialState = await appleAuth.getCredentialStateForUser(newUser);

            if (identityToken) {
                const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
                const userCredential = await auth().signInWithCredential(appleCredential);

                // ** 로그인
                LoginStart("a", userCredential.user.uid);
            } else {
                setLoading(false);
                MyUtil._consoleLog("apple 로그인 실패 : 토큰 정보가 없습니다");
            }
        } catch (error) {
            setLoading(false);
            if (error.code === appleAuth.Error.CANCELED) {
                // console.warn('User canceled Apple Sign in.')
            } else {
                MyUtil._consoleLog("apple 로그인 실패 : " + error);
            };
        }
    }, []);


    const LoginStart = useCallback(async (easy_type, uniq_key) => {
        const result = await ServerApi._login(easy_type, uniq_key);
        if (result.IS_SUCCESS === true && result.DATA_RESULT.RSP_CODE === CST.DB_SUCSESS) {
            MyAsyncStorage._writeAsyncStorage(Config.AS_KEY_LOGIN_INFO, { easy_type, uniq_key });
            dispatch(allActions.setRxLoginInfo(result.DATA_RESULT.QUERY_DATA[0]));
            navigation.reset({ index: 0, routes: [{ name: 'Main', params: {} }] });

        } else if (result.DATA_RESULT.RSP_CODE === CST.DB_USER_NONE) {
            navigation.navigate({ name: 'InfoUpdate', params: { isJoin: true, easy_type: easy_type, uniq_key: uniq_key } });

        } else {
            MyUtil._alertMsg('LoginStart', result.DATA_RESULT);
        }
    }, [])



    return (
        <ImageBackground source={require('../img/bg_blue.png')} resizeMode='cover'
            style={{ width: Layout.window.width, flex: 1 }}>
            <SafeAreaView style={{ flex: 1, width: Layout.window.width }}>
                {
                    loading ? (<Loader />) : (
                        <View style={{ width: Layout.window.width, flex: 1, alignItems: 'center',flexDirection:'column' }}>

                            <View style={[styles.blurShadowWrap, { height: Platform.OS === 'ios' ? 120 : 90 }]}>
                                <View style={[styles.blurRadiusWrap, { height: Platform.OS === 'ios' ? 120 : 90 }]}>
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
                                    {
                                        Platform.OS === 'ios' && (
                                            <TouchableOpacity style={{ width: Layout.window.width - 90, height: (Layout.window.width - 90) / 6, marginVertical: 5 }}
                                                onPress={() => { AppleLoginStart() }}>
                                                <Image style={{ width: Layout.window.width - 90, height: (Layout.window.width - 90) / 6 }}
                                                    source={require('../img/btn_login_apple.png')}
                                                    resizeMode='contain' />
                                            </TouchableOpacity>
                                        )
                                    }
                                </View>
                            </View>
                        </View>
                    )
                }

                {/* <View style={{ width: Layout.window.width, paddingVertical: 10, backgroundColor: Colors.grayLine, marginTop: 40 }}>
                    <Text allowFontScaling={false} style={{ fontSize: Layout.fsXS, color: Colors.baseTextGray, paddingHorizontal: 10 }}>데브에듀  |  대표: 유지현  |  사업자 번호: 826-53-00301  |  주소: 부산광역시 남구 전포대로 10 신화빌딩 6층</Text>
                    <TouchableOpacity onPress={() => { Linking.openURL('http://15.165.156.218:3909/term/privacy.html') }}>
                        <Text allowFontScaling={false} style={{ fontSize: Layout.fsXS, color: '#0000ff', paddingHorizontal: 10, marginTop: 3 }}>개인정보 취급 방침</Text>
                    </TouchableOpacity>
                </View> */}
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