import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, ImageBackground, Text, Image, TouchableOpacity, Platform, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../components/redux/rootReducer';
import * as ITF from '../constants/Interface';
import * as MyUtil from '../constants/MyUtil';
import * as ServerApi from "../constants/ServerApi";
import TransformCalendar from "../components/TransformCalendar";
import Loader from "../components/Loader";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import CST from '../constants/constants';
import Sprintf from 'sprintf-js';
const sprintf = Sprintf.sprintf;



const Main = () => {
    const refScrollView = useRef(null);
    const navigation = useNavigation();
    const { rxLoginInfo } = useSelector((state: RootState) => state.rxLoginInfo, (prev, next) => { return prev.rxLoginInfo === next.rxLoginInfo; })
    const [loading, setLoading] = useState(false);
    const [arrDayItem, setArrDayItem] = useState([]);



    const GetDayItems = useCallback(async (getItem) => {
        setArrDayItem(getItem);
    }, []);


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            {
                loading ? (<Loader />) : (
                    <ImageBackground source={require('../img/bg_blue_blur.png')} resizeMode='cover'
                        style={{ width: Layout.window.width, flex: 1 }}
                        imageStyle={{ ...Platform.select({ ios: { opacity: 0.7 }, android: { opacity: 0.6 } }) }}
                    >
                        <View style={{ width: Layout.window.width, flex: 1 }}>

                            <View style={{ width: Layout.window.width, height: 44, backgroundColor: '#ffffff', flexDirection: 'row', alignItems: 'center', zIndex: 99, ...Platform.select({ android: { elevation: 0 } }) }}>
                                <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsL, color: Colors.defaultText, marginLeft: 15, fontWeight: 'bold' }}>{rxLoginInfo.name}</Text>
                                <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsSM, color: Colors.skyBlue, marginLeft: 3 }}>{MyUtil._codeToKor(rxLoginInfo.c_gb_dt, "c_gb_dt")}</Text>

                                <View style={{ flex: 1 }}></View>

                                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => { navigation.navigate({ name: 'AlarmList', params: {} }); }}>
                                    <Image style={{ width: 25, height: 25 }}
                                        source={require('../img/btn_noti.png')} resizeMode='contain' />
                                </TouchableOpacity>

                                <TouchableOpacity style={{ marginRight: 15 }} onPress={() => { navigation.navigate({ name: 'MenuPage', params: {} }); }}>
                                    <Image style={{ width: 32, height: 32 }}
                                        source={require('../img/btn_menu.png')} resizeMode='contain' />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.calendarWrap}>
                                <View style={{ width: Layout.window.width, height: 4, backgroundColor: '#ffffff', marginTop: -2 }}></View>
                                <TransformCalendar GetDayItems={GetDayItems} />
                            </View>

                            <ScrollView ref={refScrollView}
                                contentContainerStyle={{ flexGrow: 1, alignItems: 'center', width: Layout.window.width, paddingBottom: 40 }} keyboardShouldPersistTaps='handled'
                            >
                                {/* <View style={styles.blurShadowWrap}>
                                    <Image style={styles.miniIcon}
                                        source={require('../img/ic_circle_check.png')}
                                        resizeMode='contain' />

                                    <Text allowFontScaling={false} numberOfLines={1} style={styles.miniText}>09</Text>

                                    <View style={{ width: 9, height: 1 }}></View>

                                    <Image style={styles.miniIcon}
                                        source={require('../img/ic_warning.png')}
                                        resizeMode='contain' />

                                    <Text allowFontScaling={false} numberOfLines={1} style={styles.miniText}>09</Text>

                                    <View style={{ width: 9, height: 1 }}></View>

                                    <Image style={styles.miniIcon}
                                        source={require('../img/ic_circle_x.png')}
                                        resizeMode='contain' />

                                    <Text allowFontScaling={false} numberOfLines={1} style={styles.miniText}>09</Text>
                                </View> */}


                                {
                                    MyUtil._isNull(arrDayItem) ? (
                                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                                            <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsM, color: Colors.baseTextGray }}>조회된 정보가 없어요</Text>
                                        </View>
                                    ) : (
                                        arrDayItem.map((item: any, idx) => (
                                            <View key={idx} style={{ marginTop: 15, width: Layout.window.widthFix, height: 70, backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 14, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 13 }}>
                                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsM, color: Colors.mainBlue, fontWeight: 'bold' }}>{item.start_time} ~ {item.end_time}</Text>
                                                        <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsS, color: Colors.baseTextGray, marginLeft: 7 }}>{item.biz_nm}</Text>
                                                    </View>

                                                    <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsM, color: Colors.defaultText, marginTop: 3 }}>({item.p_name}) {item.subj_nm}</Text>
                                                </View>

                                                <Image style={{ width: 32, height: 32 }}
                                                    source={require('../img/ic_qrcode.png')}
                                                    resizeMode='contain' />
                                            </View>
                                        ))
                                    )

                                }
                            </ScrollView>
                        </View>
                    </ImageBackground>
                )
            }
        </SafeAreaView >
    );

}

const styles = StyleSheet.create({
    blurShadowWrap: {
        marginTop: 15, paddingHorizontal: 10, height: 38,
        justifyContent: 'center', alignItems: 'center', borderRadius: 30, flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.6)',
    },
    miniText: {
        fontSize: Layout.fsSM, color: Colors.baseTextGray, marginLeft: 1, fontWeight: 'bold', marginBottom: 1
    },
    miniIcon: {
        width: 17, height: 17, marginRight: 5
    },
    calendarWrap: {
        width: Layout.window.width, paddingBottom: 0, backgroundColor: '#ffffff', zIndex: 90, alignItems: 'center', justifyContent: 'center',
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
                elevation: 3
            }
        })
    }
});

export default Main;