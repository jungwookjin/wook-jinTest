import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, ImageBackground, Text, Image, TouchableOpacity, Platform, Alert } from "react-native";
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
const calWidth = Layout.window.width - 16;



const Main = () => {
    const refScrollView = useRef(null);
    const navigation = useNavigation();
    const { rxLoginInfo } = useSelector((state: RootState) => state.rxLoginInfo, (prev, next) => { return prev.rxLoginInfo === next.rxLoginInfo; })
    const [loading, setLoading] = useState(true);
    const [calendarHeight, setCalendarHeight] = useState(400);
    const [isWeekCal, setIsWeekCal] = useState(true);
    const [arrCalData, setArrCalData] = useState<any>([]);
    const [selectDay, setSelectDay] = useState<any>({ date: null, fullDay: null, weekNo: 0 });
    const [viewDate, setViewDate] = useState<Date>(new Date());
    const [viewWeekNo, setViewWeekNo] = useState<any>({ weekNo: -1, startNo: 0, endNo: 0 });

    useEffect(() => {
        async function fetchData() {
            const today = new Date();
            initCalendar(today);

            // setSelectDay(sprintf("%04d-%02d-%02d", today.getFullYear(), today.getMonth() + 1, today.getDate()))
            // setLoading(false)
        }
        fetchData();
    }, []);


    useEffect(() => {
        // Alert.alert('isWeekCal', isWeekCal + "'")
    }, [isWeekCal]);


    const CalChange = useCallback(async (getViewDate) => {

    }, [isWeekCal]);

    const initCalendar = useCallback((getDate: any) => {
        setViewDate(getDate)
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

        MyUtil._consoleLog("첫날 요일 : " + monthFirstDateDay);  // 0: 일  ~ 6: 토
        MyUtil._consoleLog("마지막 일자 : " + lastDate.getDate());

        MyUtil._consoleLog("오늘 일자 : " + getDate.getDate() / 7);
        MyUtil._consoleLog("오늘 일자의 주차 : " + Math.ceil((selectedDayOfMonth + monthFirstDateDay) / 7));

        MyUtil._consoleLog("이번주의 시작 (이월 주의) : " + weekStartDate.getDate());
        MyUtil._consoleLog("이번주의 마지막 (이월 주의) : " + weekEndDate.getDate());


        const calData = [];

        // 첫달 시작 요일에 따라서 빈값 넣어줍니다.
        for (let i = 0; i < monthFirstDateDay; i++) {
            MyUtil._consoleLog("empty")
            calData.push({ date: '', fullDay: '' })
        }

        // 실제 달력 구성 요일
        for (let i = 1; i < lastDate.getDate() + 1; i++) {
            const fullDay = sprintf("%04d-%02d-%02d", getDate.getFullYear(), getDate.getMonth() + 1, i);
            MyUtil._consoleLog("day : " + i + " / fullDay : " + fullDay)
            calData.push({ day: i + '', fullDay: fullDay })
        }

        // 최초 세팅
        if (viewWeekNo.weekNo === -1) {
            const fullDay = sprintf("%04d-%02d-%02d", getDate.getFullYear(), getDate.getMonth() + 1, getDate.getDate())
            setSelectDay({ date: getDate.getDate(), fullDay: fullDay })

            const weekNo = Math.floor((monthFirstDateDay + getDate.getDate() - 1) / 7) + 1;
            const startNo = (weekNo - 1) * 7;
            const endNo = startNo + 6;
            setViewWeekNo({ weekNo, startNo, endNo })
        } else {
            setViewWeekNo({ weekNo: 1, startNo: 0, endNo: 6 })
        }

        setArrCalData(calData);
        setLoading(false)
    }, [viewWeekNo]);



    const CalPrev = useCallback(async (getViewDate) => {
        getViewDate.setMonth(getViewDate.getMonth() - 1);
        const newDate = new Date(getViewDate)
        setViewDate(newDate);
        initCalendar(newDate);
    }, [viewWeekNo]);

    const CalNext = useCallback(async (getViewDate) => {
        getViewDate.setMonth(getViewDate.getMonth() + 1);
        const newDate = new Date(getViewDate)
        setViewDate(newDate);
        initCalendar(newDate);
    }, [viewWeekNo]);

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

                                <View style={{ width: Layout.window.width, justifyContent: 'center', alignItems: 'center', marginVertical: 15, flexDirection: 'row' }}>
                                    <TouchableOpacity style={{ marginRight: 8, padding: 5 }} onPress={() => { CalPrev(viewDate) }}>
                                        <Image style={{ width: 10, height: 10, tintColor: Colors.mainBlue }} resizeMode='contain'
                                            source={require('../img/btn_previous.png')} />
                                    </TouchableOpacity>

                                    <View style={{ width: 120, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text allowFontScaling={false} style={{ fontSize: Layout.fsM, color: '#000000' }}>{viewDate.getFullYear()}년 {viewDate.getMonth() + 1}월 ({viewWeekNo.weekNo}주)</Text>
                                    </View>

                                    <TouchableOpacity style={{ marginLeft: 8, padding: 5 }} onPress={() => { CalNext(viewDate) }}>
                                        <Image style={{ width: 10, height: 10, tintColor: Colors.mainBlue }} resizeMode='contain'
                                            source={require('../img/btn_next.png')} />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.calContainer}>
                                    <View style={styles.calHeaderItemBox}><Text allowFontScaling={false} style={[styles.calHeaderFont, { color: '#ff5c5c' }]}>일</Text></View>
                                    <View style={styles.calHeaderItemBox}><Text allowFontScaling={false} style={[styles.calHeaderFont, { color: '#9c9c9c' }]}>월</Text></View>
                                    <View style={styles.calHeaderItemBox}><Text allowFontScaling={false} style={[styles.calHeaderFont, { color: '#9c9c9c' }]}>화</Text></View>
                                    <View style={styles.calHeaderItemBox}><Text allowFontScaling={false} style={[styles.calHeaderFont, { color: '#9c9c9c' }]}>수</Text></View>
                                    <View style={styles.calHeaderItemBox}><Text allowFontScaling={false} style={[styles.calHeaderFont, { color: '#9c9c9c' }]}>목</Text></View>
                                    <View style={styles.calHeaderItemBox}><Text allowFontScaling={false} style={[styles.calHeaderFont, { color: '#9c9c9c' }]}>금</Text></View>
                                    <View style={styles.calHeaderItemBox}><Text allowFontScaling={false} style={[styles.calHeaderFont, { color: '#5c87ff' }]}>토</Text></View>
                                </View>

                                {
                                    isWeekCal ? (
                                        <View style={[styles.calContainer, { paddingBottom: 20 }]}>
                                            {
                                                arrCalData.map((item: any, idx: number) => (
                                                    (idx >= viewWeekNo.startNo && idx <= viewWeekNo.endNo) && <TouchableOpacity key={idx} style={styles.calItemBox}
                                                        onPress={() => {
                                                            if (!MyUtil._isNull(item.day)) {
                                                                const weekNo = Math.floor(idx / 7) + 1;
                                                                const startNo = (weekNo - 1) * 7;
                                                                const endNo = startNo + 6;
                                                                setViewWeekNo({ weekNo, startNo, endNo })
                                                                setSelectDay({ day: item.day, fullDay: item.fullDay });
                                                            }
                                                        }}>
                                                        <View style={{ width: '60%', height: '60%', justifyContent: 'center', alignItems: 'center', borderRadius: 150, backgroundColor: item.fullDay === selectDay.fullDay ? '#619eff' : '#ffffff' }}>
                                                            <Text allowFontScaling={false} style={{ fontSize: Layout.fsM, color: item.fullDay === selectDay.fullDay ? '#ffffff' : '#000000' }}>{item.day}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                ))
                                            }
                                        </View>
                                    ) : (
                                        <View style={[styles.calContainer, { paddingBottom: 20 }]}>
                                            {
                                                arrCalData.map((item: any, idx: number) => (
                                                    <TouchableOpacity key={idx} style={styles.calItemBox}
                                                        onPress={() => {
                                                            if (!MyUtil._isNull(item.day)) {
                                                                const weekNo = Math.floor(idx / 7) + 1;
                                                                const startNo = (weekNo - 1) * 7;
                                                                const endNo = startNo + 6;
                                                                setViewWeekNo({ weekNo, startNo, endNo })
                                                                setSelectDay({ day: item.day, fullDay: item.fullDay });
                                                            }
                                                        }}>
                                                        <View style={{ width: '60%', height: '60%', justifyContent: 'center', alignItems: 'center', borderRadius: 150, backgroundColor: item.fullDay === selectDay.fullDay ? '#619eff' : '#ffffff' }}>
                                                            <Text allowFontScaling={false} style={{ fontSize: Layout.fsM, color: item.fullDay === selectDay.fullDay ? '#ffffff' : '#000000' }}>{item.day}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                ))
                                            }
                                        </View>
                                    )
                                }

                                <TouchableOpacity style={{ padding: 10, position: 'absolute', bottom: 5, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}
                                    onPress={() => { isWeekCal ? setIsWeekCal(false) : setIsWeekCal(true) }}>
                                    <View style={{ width: 58, height: 8, borderRadius: 4, backgroundColor: '#ebebeb' }}></View>
                                </TouchableOpacity>
                            </View>

                            <ScrollView ref={refScrollView}
                                contentContainerStyle={{ flexGrow: 1, alignItems: 'center', width: Layout.window.width, paddingBottom: 40 }} keyboardShouldPersistTaps='handled'
                            // onScroll={({ nativeEvent }) => {
                            //     MyUtil._consoleLog("nativeEvent.contentOffset.y : " + (nativeEvent.contentOffset.y))
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
    },
    calItemBox: {
        width: calWidth / 7, height: (calWidth / 7) - 2, justifyContent: 'center', alignItems: 'center'
    },
    calHeaderItemBox: {
        width: calWidth / 7, paddingVertical: 2, justifyContent: 'center', alignItems: 'center'
    },
    calContainer: {
        width: calWidth + 10, marginLeft: 5, position: 'relative', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center'
    },
    calHeaderFont: {
        fontSize: Layout.fsS
    }
});

export default Main;