import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, ImageBackground, Text, Image, TouchableOpacity, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { BlurView } from "@react-native-community/blur";
import { useSelector } from 'react-redux'
import { RootState } from '../components/redux/rootReducer'
import * as ITF from '../constants/Interface'
import CustomHeader from "../components/CustomHeader";
import Loader from "../components/Loader"
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import Sprintf from 'sprintf-js';
const sprintf = Sprintf.sprintf;



const Main = () => {
    const navigation = useNavigation();
    const { rxLoginInfo } = useSelector((state: RootState) => state.rxLoginInfo, (prev, next) => { return prev.rxLoginInfo === next.rxLoginInfo; })
    const [loading, setLoading] = useState(false);
    const [selectDay, setSelectDay] = useState('');

    useEffect(() => {
        async function fetchData() {
            console.log("rxLoginInfo : " + JSON.stringify(rxLoginInfo))
            let today = new Date();
            setSelectDay(sprintf("%04d-%02d-%02d", today.getFullYear(), today.getMonth() + 1, today.getDate()))
        }
        fetchData();
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
                            {/* <CustomHeader navigation={navigation} isBackBtn={false} /> */}
                            <View style={{ width: Layout.window.width, height: 44, backgroundColor: '#ffffff', flexDirection: 'row', alignItems: 'center', zIndex: 99, ...Platform.select({ android: { elevation: 0 } }) }}>
                                <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsL, color: Colors.defaultText, marginLeft: 15, fontWeight: 'bold' }}>김정훈</Text>
                                <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsSM, color: Colors.skyBlue, marginLeft: 3 }}>학생</Text>

                                <View style={{ flex: 1 }}></View>

                                <TouchableOpacity style={{ marginRight: 10 }}>
                                    <Image style={{ width: 25, height: 25 }}
                                        source={require('../img/btn_noti.png')} resizeMode='contain' />
                                </TouchableOpacity>

                                <TouchableOpacity style={{ marginRight: 15 }} onPress={() => { navigation.navigate({ name: 'MenuPage', params: {} }); }}>
                                    <Image style={{ width: 32, height: 32 }}
                                        source={require('../img/btn_menu.png')} resizeMode='contain' />
                                </TouchableOpacity>
                            </View>

                            <View style={{
                                width: Layout.window.width, paddingBottom: 15, backgroundColor: '#ffffff', zIndex: 90, justifyContent: 'center', alignItems: 'center',
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
                            }}>
                                <View style={{ width: Layout.window.width - 20 }}>
                                    <Calendar
                                        monthFormat={'yyyy-MM'}
                                        onDayPress={(day) => { setSelectDay(day.dateString) }}
                                        onDayLongPress={(day) => { console.log('selected day', day) }}
                                        onMonthChange={(month) => { console.log('month changed', month) }}
                                        hideExtraDays={true}
                                        firstDay={1}
                                        onPressArrowLeft={subtractMonth => subtractMonth()}
                                        onPressArrowRight={addMonth => addMonth()}
                                        markedDates={{
                                            [selectDay]: {
                                                selected: true,
                                                disableTouchEvent: true,
                                                selectedColor: Colors.pastelBlue,
                                                selectedTextColor: '#ffffff'
                                            }
                                        }}
                                    />
                                </View>

                                <View style={{ position: 'absolute', top: -5, width: Layout.window.width, height: 10, backgroundColor: '#ffffff' }}></View>
                            </View>


                            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', width: Layout.window.width, paddingBottom: 40 }} keyboardShouldPersistTaps='handled'>

                                {/* <BlurView
                                    style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
                                    blurType="light"
                                    blurAmount={10}
                                    reducedTransparencyFallbackColor="white"
                                /> */}


                                <View style={styles.blurShadowWrap}>
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
                                </View>


                                {
                                    ['', '', '', ''].map((item, idx) => (
                                        <View key={idx} style={{ marginTop: 15, width: Layout.window.widthFix, height: 70, backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 14, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 13 }}>
                                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsM, color: Colors.mainBlue, fontWeight: 'bold' }}>15:00 ~ 16:20</Text>
                                                    <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsS, color: Colors.baseTextGray, marginLeft: 7 }}>One 코딩 아카데미</Text>
                                                </View>

                                                <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsM, color: Colors.defaultText, marginTop: 3 }}>(깁정훈) HTML 코딩 기초</Text>
                                            </View>

                                            <Image style={{ width: 32, height: 32 }}
                                                source={require('../img/ic_qrcode.png')}
                                                resizeMode='contain' />
                                        </View>
                                    ))
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
    }
});

export default Main;