import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, ImageBackground, Text, Image, TouchableOpacity, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import { RootState } from '../components/redux/rootReducer'
import * as ITF from '../constants/Interface'
import * as MyUtil from '../constants/MyUtil'
import Loader from "../components/Loader"
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import Sprintf from 'sprintf-js';
const sprintf = Sprintf.sprintf;



const Main = () => {
    const refScrollView = useRef(null);
    const navigation = useNavigation();
    const { rxLoginInfo } = useSelector((state: RootState) => state.rxLoginInfo, (prev, next) => { return prev.rxLoginInfo === next.rxLoginInfo; })
    const [loading, setLoading] = useState(true);
    const [selectDay, setSelectDay] = useState<any>({ date: '', fullDay: '' });
    const [calendarHeight, setCalendarHeight] = useState(400);
    const [isWeekCal, setIsWeekCal] = useState(true);
    const [arrCalData, setArrCalData] = useState<any>([]);
    const calWidth = Layout.window.width - 16;

    useEffect(() => {
        async function fetchData() {

            initCalendar(new Date('2021-06-01'))

            // setSelectDay(sprintf("%04d-%02d-%02d", today.getFullYear(), today.getMonth() + 1, today.getDate()))
            // setLoading(false)
        }
        fetchData();
    }, []);



    const initCalendar = (getDate: any) => {
        const lastDate = new Date(getDate.getFullYear(), getDate.getMonth() + 1, 0);
        const nowDayOfWeek = getDate.getDay();
        const nowDay = getDate.getDate();
        const nowMonth = getDate.getMonth() + 1;
        const nowYear = getDate.getFullYear();

        const weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
        const weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));

        // 선택 날짜가 몇주차인지 확인
        const selectedDayOfMonth = getDate.getDate();
        const first = new Date(getDate.getFullYear() + '/' + (getDate.getMonth() + 1) + '/01');
        const monthFirstDateDay = first.getDay();

        console.log("첫날 요일 : " + monthFirstDateDay);  // 0: 일  ~ 6: 토
        console.log("마지막 일자 : " + lastDate.getDate());

        console.log("오늘 일자 : " + getDate.getDate() / 7);
        console.log("오늘 일자의 주차 : " + Math.ceil((selectedDayOfMonth + monthFirstDateDay) / 7));

        console.log("이번주의 시작 (이월 주의) : " + weekStartDate.getDate());
        console.log("이번주의 마지막 (이월 주의) : " + weekEndDate.getDate());


        const calData = [];

        // 첫달 시작 요일에 따라서 빈값 넣어줍니다.
        for (let i = 0; i < monthFirstDateDay; i++) {
            console.log("empty")
            calData.push({ date: '', fullDay: '' })
        }

        // 실제 달력 구성 요일
        for (let i = 1; i < lastDate.getDate() + 1; i++) {
            const fullDay = sprintf("%04d-%02d-%02d", getDate.getFullYear(), getDate.getMonth() + 1, i);
            console.log("day : " + i + " / fullDay : " + fullDay)
            calData.push({ day: i + '', fullDay: fullDay })
        }

        console.log('arrCalData.length : ' + calData.length)
        setArrCalData(calData);
        setLoading(false)
    }


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
                                <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsL, color: Colors.defaultText, marginLeft: 15, fontWeight: 'bold' }}>김정훈</Text>
                                <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsSM, color: Colors.skyBlue, marginLeft: 3 }}>학생</Text>

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

                            <View style={{
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
                            }}>
                                {
                                    isWeekCal ? (
                                        <View style={{ width: calWidth + 10, marginLeft: 5, position: 'relative', height: 115 }}>

                                        </View>
                                    ) : (
                                        <View style={{ width: calWidth + 10, marginLeft: 5, position: 'relative', height: 400, flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center', }}>
                                            {
                                                arrCalData.map((item: any, idx: number) => (
                                                    <TouchableOpacity key={idx} style={{ width: calWidth / 7, height: calWidth / 7, justifyContent: 'center', alignItems: 'center' }}
                                                        onPress={() => { !MyUtil._isNull(item.day) && setSelectDay({ day: item.day, fullDay: item.fullDay }) }}>
                                                        <Text allowFontScaling={false} style={{ fontSize: Layout.fsM, color: item.fullDay === selectDay.fullDay ? 'blue' : '#000000' }}>{item.day}</Text>
                                                    </TouchableOpacity>
                                                ))
                                            }
                                        </View>
                                    )
                                }

                                <TouchableOpacity style={{ padding: 10, position: 'absolute', bottom: 5, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}
                                    onPress={() => { isWeekCal ? setIsWeekCal(false) : setIsWeekCal(true) }}>
                                    <View style={{ width: 58, height: 10, borderRadius: 5, backgroundColor: '#e0e0e0' }}></View>
                                </TouchableOpacity>
                            </View>

                            <ScrollView ref={refScrollView}
                                contentContainerStyle={{ flexGrow: 1, alignItems: 'center', width: Layout.window.width, paddingBottom: 40 }} keyboardShouldPersistTaps='handled'
                            // onScroll={({ nativeEvent }) => {
                            //     console.log("nativeEvent.contentOffset.y : " + (nativeEvent.contentOffset.y))
                            //     if(nativeEvent.contentOffset.y >= 0){
                            //         setsScrollY(nativeEvent.contentOffset.y)
                            //     }
                            // }}
                            >
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