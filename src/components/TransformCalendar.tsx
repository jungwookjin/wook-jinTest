import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, Animated, View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useSelector } from 'react-redux';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { RootState } from '../components/redux/rootReducer';
import * as MyUtil from '../constants/MyUtil';
import * as ServerApi from "../constants/ServerApi";
import Loader from "../components/Loader";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import CST from '../constants/constants';
import Sprintf from 'sprintf-js';
const sprintf = Sprintf.sprintf;
const calWidth = Layout.window.width - 16;


const TransformCalendar = ({ GetDayItems }: any) => {
    const { rxLoginInfo } = useSelector((state: RootState) => state.rxLoginInfo, (prev, next) => { return prev.rxLoginInfo === next.rxLoginInfo; })
    const [loading, setLoading] = useState(true);
    const [isWeekCal, setIsWeekCal] = useState(true);
    const [arrCalData, setArrCalData] = useState<any>([]);
    const [selectDay, setSelectDay] = useState<any>({ date: null, fullDay: null });
    const [viewDate, setViewDate] = useState<Date>(new Date());
    const [viewWeekNo, setViewWeekNo] = useState<any>({ weekNo: -1, startNo: 0, endNo: 0, maxWeekNo: 0 }); // #미니캘린더용 @뷰의 주차 @한주의 시작일 @한주의 끝일 @달의 최대주차
    const animHeight = useRef(new Animated.Value(0)).current;
    let sXGesture: any = 0;
    let sYGesture: any = 0;

    useEffect(() => {
        const today = new Date();
        initCalendar(today, true);
    }, []);


    useEffect(() => {
        Animated.timing(animHeight, {
            toValue: !isWeekCal ? 84 + (((calWidth / 7) - 2) * viewWeekNo.maxWeekNo) + 10 : 84 + ((calWidth / 7) - 2) + 10,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isWeekCal]);






    const initCalendar = useCallback(async (getDate: any, isWeekStart: boolean) => {
        setViewDate(getDate);
        setLoading(true);

        const calData = [];

        const firstDate = new Date(getDate.getFullYear(), getDate.getMonth(), 1);
        const lastDate = new Date(getDate.getFullYear(), getDate.getMonth() + 1, 0);
        const monthFirstDateDay = firstDate.getDay();

        // 첫달 시작 요일에 따라서 빈값 넣어줍니다.
        for (let emptyCnt = 0; emptyCnt < monthFirstDateDay; emptyCnt++) {
            MyUtil._consoleLog("empty")
            calData.push({ date: '', fullDay: '' })
        }



        // *********************************** 서버에서 데이터 가져옴 ******************************************
        const getMonYear = sprintf("%04d-%02d", getDate.getFullYear(), getDate.getMonth() + 1);
        let serverData = [];

        const result = await ServerApi.m_app_my_subj(rxLoginInfo.u_id, getMonYear);
        if (result.IS_SUCCESS === true && result.DATA_RESULT.RSP_CODE === CST.DB_SUCSESS) {
            serverData = result.DATA_RESULT.QUERY_DATA;
        } else {
            MyUtil._alertMsg('m_app_my_subj', result.DATA_RESULT);
        }



        // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 달력에 뭔가 표시하려면 여기서 데이터 삽입 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        // @if@ 서버 안거치고 데이터 삽입   @else@ 서버 데이터 삽입
        if (MyUtil._isNull(serverData)) {
            for (let dayCnt = 1; dayCnt < lastDate.getDate() + 1; dayCnt++) {
                const fullDay = sprintf("%04d-%02d-%02d", getDate.getFullYear(), getDate.getMonth() + 1, dayCnt);
                MyUtil._consoleLog("day : " + dayCnt + " / fullDay : " + fullDay);
                calData.push({ day: dayCnt + '', fullDay: fullDay });
            }

        } else {
            for (const serverItem of serverData) {
                calData.push({ day: serverItem.dd, fullDay: serverItem.date_ymd, subj_day_yn: serverItem.subj_day_yn });
            }
        }



        const maxWeekNo = (Math.floor((calData.length - 1) / 7) + 1);
        MyUtil._consoleLog('maxWeekNo : ' + maxWeekNo);


        // 최초 세팅 , 뷰 변경
        if (viewWeekNo.weekNo === -1) {
            const fullDay = sprintf("%04d-%02d-%02d", getDate.getFullYear(), getDate.getMonth() + 1, getDate.getDate());
            SelectCalDay({ day: getDate.getDate(), fullDay: fullDay }, (monthFirstDateDay + getDate.getDate() - 1), { maxWeekNo });

        } else {

            if (isWeekStart) {
                setViewWeekNo({ weekNo: 1, startNo: 0, endNo: 6, maxWeekNo });
            } else {
                const weekNo = maxWeekNo;
                const startNo = (weekNo - 1) * 7;
                const endNo = startNo + 6;
                setViewWeekNo({ weekNo, startNo, endNo, maxWeekNo });
            }
        }

        if (!isWeekCal) { // 변경됐을때만 실행하면 더 좋을듯
            Animated.timing(animHeight, {
                toValue: 84 + (((calWidth / 7) - 2) * maxWeekNo) + 10,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }

        setLoading(false);
        setArrCalData(calData);
    }, [viewWeekNo, isWeekCal]);



    const WeekPrev = useCallback(async (getViewDate) => {
        const weekNo = viewWeekNo.weekNo - 1;
        if (weekNo <= 0) {
            getViewDate.setMonth(getViewDate.getMonth() - 1);
            const newDate = new Date(getViewDate);
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
        MyUtil._consoleLog("weekNo : " + weekNo + " / viewWeekNo.maxWeekNo : " + (viewWeekNo.maxWeekNo));

        if (weekNo > viewWeekNo.maxWeekNo) {
            getViewDate.setMonth(getViewDate.getMonth() + 1);
            const newDate = new Date(getViewDate);
            setViewDate(newDate);
            initCalendar(newDate, true);

        } else {
            const startNo = (weekNo - 1) * 7;
            const endNo = startNo + 6;
            setViewWeekNo({ weekNo, startNo, endNo, maxWeekNo: viewWeekNo.maxWeekNo });
        }
    }, [viewWeekNo])


    const MonthPrev = useCallback(async (getViewDate) => {
        getViewDate.setMonth(getViewDate.getMonth() - 1);
        const newDate = new Date(getViewDate);
        setViewDate(newDate);
        initCalendar(newDate, true);
    }, [viewWeekNo]);


    const MonthNext = useCallback(async (getViewDate) => {
        getViewDate.setMonth(getViewDate.getMonth() + 1);
        const newDate = new Date(getViewDate);
        setViewDate(newDate);
        initCalendar(newDate, true);
    }, [viewWeekNo]);


    const SelectCalDay = useCallback(async (item, idx, getViewWeelNo) => {
        const weekNo = Math.floor(idx / 7) + 1;
        const startNo = (weekNo - 1) * 7;
        const endNo = startNo + 6;
        let serverDayData: any = [];

        const result = await ServerApi.m_app_my_subj_dt_list(rxLoginInfo.u_id, item.fullDay);
        if (result.IS_SUCCESS === true && result.DATA_RESULT.RSP_CODE === CST.DB_SUCSESS) {
            serverDayData = result.DATA_RESULT.QUERY_DATA;
        } else {
            MyUtil._alertMsg('m_app_my_subj_dt_list', result.DATA_RESULT);
        }

        MyUtil._consoleLog('weekNo : ' + weekNo);
        setViewWeekNo({ weekNo, startNo, endNo, maxWeekNo: getViewWeelNo.maxWeekNo });
        setSelectDay({ day: item.day, fullDay: item.fullDay });

        // 부모뷰로 전달
        GetDayItems(serverDayData);
    }, [GetDayItems]);



    const renderDayItem = (idx: number, item: any) => {
        let dayText = '';

        if (!MyUtil._isNull(item.day)) {
            dayText = (item.day).replace(/(^0+)/, "");  // 앞자리 0 빼기
        }

        return (
            <TouchableOpacity key={idx} style={styles.calItemBox}
                onPress={() => { if (!MyUtil._isNull(item.day)) { SelectCalDay(item, idx, viewWeekNo); } }}>
                <View style={{ width: '52%', height: '54%', justifyContent: 'center', alignItems: 'center',borderRadius: 150, backgroundColor: item.fullDay === selectDay.fullDay ? '#619eff' : '#ffffff', overflow: 'hidden' }}>
                    <Text allowFontScaling={false} style={{ fontSize: Layout.fsM, color: item.fullDay === selectDay.fullDay ? '#ffffff' : '#000000', fontWeight: item.fullDay === selectDay.fullDay ? 'bold' : 'normal', marginTop: 1 }}>{dayText}</Text>
                    {
                        item.subj_day_yn === 'y' ? (
                            <View style={{ width: '52%', height: 2, backgroundColor: '#b9b0ff', marginTop: 1 }}></View>
                        ) : (
                            <View style={{ width: '52%', height: 2, marginTop: 1 }}></View>
                        )
                    }
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <PanGestureHandler
            // onGestureEvent={(event) => { console.log('event : ', event.nativeEvent.translationY); }}
            onBegan={(event) => {
                sYGesture = MyUtil._isNull(event.nativeEvent.translationY) ? 0 : event.nativeEvent.translationY;
                sXGesture = MyUtil._isNull(event.nativeEvent.translationX) ? 0 : event.nativeEvent.translationX;
            }}
            onEnded={(event) => {
                const eYGesture: any = MyUtil._isNull(event.nativeEvent.translationY) ? 0 : event.nativeEvent.translationY;
                const eXGesture: any = MyUtil._isNull(event.nativeEvent.translationX) ? 0 : event.nativeEvent.translationX;
                const gYResult = eYGesture - sYGesture;
                const gXResult = eXGesture - sXGesture;

                if (gYResult > 30) {
                    setIsWeekCal(false);
                } else if (gYResult < -30) {
                    setIsWeekCal(true);
                } else if (gXResult > 50) {
                    isWeekCal ? WeekPrev(viewDate) : MonthPrev(viewDate);
                } else if (gXResult < -50) {
                    isWeekCal ? WeekNext(viewDate) : MonthNext(viewDate);
                }
            }}
        >
            <Animated.View style={[{ width: Layout.window.width, height: animHeight, paddingBottom: 0, backgroundColor: '#ffffff', zIndex: 90, alignItems: 'center', overflow: 'hidden' }, {}]}>

                <View style={{ width: Layout.window.width, justifyContent: 'center', alignItems: 'center', marginTop: 2, marginBottom: 15, flexDirection: 'row' }}>
                    <TouchableOpacity style={{ marginRight: 3, padding: 10 }} onPress={() => { isWeekCal ? WeekPrev(viewDate) : MonthPrev(viewDate) }}>
                        <Image style={{ width: 10, height: 10, tintColor: Colors.mainBlue }} resizeMode='contain'
                            source={require('../img/btn_previous.png')} />
                    </TouchableOpacity>

                    <View style={{ width: 120, justifyContent: 'center', alignItems: 'center' }}>
                        <Text allowFontScaling={false} style={{ fontSize: Layout.fsM, color: '#000000' }}>{viewDate.getFullYear()}년 {viewDate.getMonth() + 1}월{isWeekCal && ` (${viewWeekNo.weekNo}주)`}</Text>
                    </View>

                    <TouchableOpacity style={{ marginLeft: 3, padding: 10 }} onPress={() => { isWeekCal ? WeekNext(viewDate) : MonthNext(viewDate) }}>
                        <Image style={{ width: 10, height: 10, tintColor: Colors.mainBlue }} resizeMode='contain'
                            source={require('../img/btn_next.png')} />
                    </TouchableOpacity>
                </View>

                {
                    loading ? (<View style={{ width: Layout.window.width, flex: 1, justifyContent: 'center', alignItems: 'center' }}><View style={{ flex: 1 }}></View><Loader /><View style={{ flex: 3 }}></View></View>)
                        : (
                            <View style={{ width: Layout.window.width, alignItems: 'center' }}>
                                <View style={styles.calContainer}>
                                    <View style={styles.calHeaderItemBox}><Text allowFontScaling={false} style={[styles.calHeaderFont, { color: '#ff5c5c' }]}>일</Text></View>
                                    <View style={styles.calHeaderItemBox}><Text allowFontScaling={false} style={[styles.calHeaderFont, { color: '#9c9c9c' }]}>월</Text></View>
                                    <View style={styles.calHeaderItemBox}><Text allowFontScaling={false} style={[styles.calHeaderFont, { color: '#9c9c9c' }]}>화</Text></View>
                                    <View style={styles.calHeaderItemBox}><Text allowFontScaling={false} style={[styles.calHeaderFont, { color: '#9c9c9c' }]}>수</Text></View>
                                    <View style={styles.calHeaderItemBox}><Text allowFontScaling={false} style={[styles.calHeaderFont, { color: '#9c9c9c' }]}>목</Text></View>
                                    <View style={styles.calHeaderItemBox}><Text allowFontScaling={false} style={[styles.calHeaderFont, { color: '#9c9c9c' }]}>금</Text></View>
                                    <View style={styles.calHeaderItemBox}><Text allowFontScaling={false} style={[styles.calHeaderFont, { color: '#5c87ff' }]}>토</Text></View>
                                </View>

                                <View style={[styles.calContainer, {}]}>
                                    {
                                        isWeekCal ? (
                                            arrCalData.map((item: any, idx: number) => ((idx >= viewWeekNo.startNo && idx <= viewWeekNo.endNo) && (
                                                renderDayItem(idx, item)
                                            )))

                                        ) : (
                                            arrCalData.map((item: any, idx: number) => (
                                                renderDayItem(idx, item)
                                            ))
                                        )
                                    }
                                </View>
                            </View>
                        )
                }

                <TouchableOpacity style={{ padding: 10, position: 'absolute', bottom: 1, justifyContent: 'center', alignItems: 'center', marginTop: 0 }} onPress={() => { setIsWeekCal(!isWeekCal) }}>
                    <View style={{ width: 58, height: 6, borderRadius: 3, backgroundColor: '#ebebeb' }}></View>
                </TouchableOpacity>
            </Animated.View >
        </PanGestureHandler>
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