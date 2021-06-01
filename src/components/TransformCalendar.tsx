import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, Animated, View, Text, Image, TouchableOpacity } from "react-native";
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
let flag = true;



const TransformCalendar = () => {
    const navigation = useNavigation();
    const { rxLoginInfo } = useSelector((state: RootState) => state.rxLoginInfo, (prev, next) => { return prev.rxLoginInfo === next.rxLoginInfo; })
    const [loading, setLoading] = useState(true);
    const [isWeekCal, setIsWeekCal] = useState(true);
    const [arrCalData, setArrCalData] = useState<any>([]);
    const [selectDay, setSelectDay] = useState<any>({ date: null, fullDay: null, weekNo: 0 });
    const [viewDate, setViewDate] = useState<Date>(new Date());
    const [viewWeekNo, setViewWeekNo] = useState<any>({ weekNo: -1, startNo: 0, endNo: 0, maxWeekNo: 0 });
    const animHeight = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const today = new Date();
        initCalendar(today, true);
    }, []);


    useEffect(() => {
        Animated.timing(animHeight, {
            toValue: !isWeekCal ? 84 + (((calWidth / 7) - 2) * viewWeekNo.maxWeekNo) : 84 + ((calWidth / 7) - 2),
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isWeekCal]);






    const initCalendar = useCallback((getDate: any, isWeekStart: boolean) => {
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

        MyUtil._consoleLog('max : ' + (Math.floor((calData.length - 1) / 7) + 1))

        const maxWeekNo = (Math.floor((calData.length - 1) / 7) + 1);

        // 최초 세팅 , 뷰 변경
        if (viewWeekNo.weekNo === -1) {
            const fullDay = sprintf("%04d-%02d-%02d", getDate.getFullYear(), getDate.getMonth() + 1, getDate.getDate())
            setSelectDay({ date: getDate.getDate(), fullDay: fullDay })

            const weekNo = Math.floor((monthFirstDateDay + getDate.getDate() - 1) / 7) + 1;
            const startNo = (weekNo - 1) * 7;
            const endNo = startNo + 6;
            setViewWeekNo({ weekNo, startNo, endNo, maxWeekNo })
        } else {

            if (isWeekStart) {
                setViewWeekNo({ weekNo: 1, startNo: 0, endNo: 6, maxWeekNo })
            } else {
                const weekNo = maxWeekNo;
                const startNo = (weekNo - 1) * 7;
                const endNo = startNo + 6;
                setViewWeekNo({ weekNo, startNo, endNo, maxWeekNo })
            }
        }

        if (!isWeekCal) { // 변경됐을때만 실행하면 더 좋을듯
            Animated.timing(animHeight, {
                toValue: 84 + (((calWidth / 7) - 2) * maxWeekNo),
                duration: 300,
                useNativeDriver: false,
            }).start();
        }

        setArrCalData(calData);
        setLoading(false)
    }, [viewWeekNo, isWeekCal]);



    const WeekPrev = useCallback(async (getViewDate) => {
        const weekNo = viewWeekNo.weekNo - 1;
        if (weekNo <= 0) {
            getViewDate.setMonth(getViewDate.getMonth() - 1);
            const newDate = new Date(getViewDate)
            setViewDate(newDate);
            initCalendar(newDate, false);

        } else {
            const startNo = (weekNo - 1) * 7;
            const endNo = startNo + 6;
            setViewWeekNo({ weekNo, startNo, endNo, maxWeekNo: viewWeekNo.maxWeekNo });
        }
    }, [viewWeekNo])


    const WeekNext = useCallback(async (getViewDate) => {
        const weekNo = viewWeekNo.weekNo + 1;

        MyUtil._consoleLog("weekNo : " + weekNo + " / viewWeekNo.maxWeekNo : " + (viewWeekNo.maxWeekNo))

        if (weekNo > viewWeekNo.maxWeekNo) {
            getViewDate.setMonth(getViewDate.getMonth() + 1);
            const newDate = new Date(getViewDate)
            setViewDate(newDate);
            initCalendar(newDate, true);

        } else {
            const startNo = (weekNo - 1) * 7;
            const endNo = startNo + 6;
            setViewWeekNo({ weekNo, startNo, endNo, maxWeekNo: viewWeekNo.maxWeekNo });
        }
    }, [viewWeekNo])


    const CalPrev = useCallback(async (getViewDate) => {
        getViewDate.setMonth(getViewDate.getMonth() - 1);
        const newDate = new Date(getViewDate)
        setViewDate(newDate);
        initCalendar(newDate, true);
    }, [viewWeekNo]);


    const CalNext = useCallback(async (getViewDate) => {
        getViewDate.setMonth(getViewDate.getMonth() + 1);
        const newDate = new Date(getViewDate)
        setViewDate(newDate);
        initCalendar(newDate, true);
    }, [viewWeekNo]);


    const SelectCalDay = useCallback(async (item, idx, getViewWeelNo) => {
        const weekNo = Math.floor(idx / 7) + 1;
        const startNo = (weekNo - 1) * 7;
        const endNo = startNo + 6;

        MyUtil._consoleLog('weekNo : ' + weekNo)
        setViewWeekNo({ weekNo, startNo, endNo, maxWeekNo: getViewWeelNo.maxWeekNo })
        setSelectDay({ day: item.day, fullDay: item.fullDay });
    }, []);


    return (
        <View>
            {
                loading ? (<Loader />) : (
                    <Animated.View style={[{ width: Layout.window.width, height: animHeight, paddingBottom: 0, backgroundColor: '#ffffff', zIndex: 90, alignItems: 'center', overflow: 'hidden' }, {}]}>
                        <View style={{ width: Layout.window.width, justifyContent: 'center', alignItems: 'center', marginTop: 2, marginBottom: 15, flexDirection: 'row' }}>
                            <TouchableOpacity style={{ marginRight: 3, padding: 10 }} onPress={() => { isWeekCal ? WeekPrev(viewDate) : CalPrev(viewDate) }}>
                                <Image style={{ width: 10, height: 10, tintColor: Colors.mainBlue }} resizeMode='contain'
                                    source={require('../img/btn_previous.png')} />
                            </TouchableOpacity>

                            <View style={{ width: 120, justifyContent: 'center', alignItems: 'center' }}>
                                <Text allowFontScaling={false} style={{ fontSize: Layout.fsM, color: '#000000' }}>{viewDate.getFullYear()}년 {viewDate.getMonth() + 1}월{isWeekCal && ` (${viewWeekNo.weekNo}주)`}</Text>
                            </View>

                            <TouchableOpacity style={{ marginLeft: 3, padding: 10 }} onPress={() => { isWeekCal ? WeekNext(viewDate) : CalNext(viewDate) }}>
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

                        <View style={[styles.calContainer, { paddingBottom: 20 }]}>
                            {
                                isWeekCal ? (
                                    arrCalData.map((item: any, idx: number) => (
                                        (idx >= viewWeekNo.startNo && idx <= viewWeekNo.endNo) && <TouchableOpacity key={idx} style={styles.calItemBox}
                                            onPress={() => { if (!MyUtil._isNull(item.day)) { SelectCalDay(item, idx, viewWeekNo); } }}>
                                            <View style={{ width: '60%', height: '60%', justifyContent: 'center', alignItems: 'center', borderRadius: 150, backgroundColor: item.fullDay === selectDay.fullDay ? '#619eff' : '#ffffff' }}>
                                                <Text allowFontScaling={false} style={{ fontSize: Layout.fsM, color: item.fullDay === selectDay.fullDay ? '#ffffff' : '#000000' }}>{item.day}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))

                                ) : (
                                    arrCalData.map((item: any, idx: number) => (
                                        <TouchableOpacity key={idx} style={styles.calItemBox}
                                            onPress={() => { if (!MyUtil._isNull(item.day)) { SelectCalDay(item, idx, viewWeekNo); } }}>
                                            <View style={{ width: '60%', height: '61%', justifyContent: 'center', alignItems: 'center', borderRadius: 150, backgroundColor: item.fullDay === selectDay.fullDay ? '#619eff' : '#ffffff' }}>
                                                <Text allowFontScaling={false} style={{ fontSize: Layout.fsM, color: item.fullDay === selectDay.fullDay ? '#ffffff' : '#000000' }}>{item.day}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))

                                )
                            }
                        </View>

                        <TouchableOpacity style={{ padding: 10, position: 'absolute', bottom: 0, justifyContent: 'center', alignItems: 'center', marginTop: 10 }} onPress={() => { setIsWeekCal(!isWeekCal) }}>
                            <View style={{ width: 58, height: 6, borderRadius: 3, backgroundColor: '#ebebeb' }}></View>
                        </TouchableOpacity>
                    </Animated.View >

                )
            }
        </View>
    );

}


const styles = StyleSheet.create({
    calItemBox: {
        width: calWidth / 7, height: (calWidth / 7) - 2, justifyContent: 'center', alignItems: 'center'
    },
    calHeaderItemBox: {
        width: calWidth / 7, paddingVertical: 2, justifyContent: 'center', alignItems: 'center'
    },
    calContainer: {
        width: calWidth + 10, marginLeft: 5, position: 'relative', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff'
    },
    calHeaderFont: {
        fontSize: Layout.fsS
    }
});

export default TransformCalendar;