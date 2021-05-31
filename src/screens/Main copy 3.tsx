import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, ImageBackground, Text, Image, TouchableOpacity, Platform } from "react-native";
import { ExpandableCalendar, CalendarProvider, Calendar } from 'react-native-calendars';
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
    const [selectDay, setSelectDay] = useState('');
    const [calendarHeight, setCalendarHeight] = useState(400);
    const [isWeekCal, setIsWeekCal] = useState(true);


    useEffect(() => {
        async function fetchData() {
            console.log("rxLoginInfo : " + JSON.stringify(rxLoginInfo))
            let today = new Date();
            setSelectDay(sprintf("%04d-%02d-%02d", today.getFullYear(), today.getMonth() + 1, today.getDate()))
            setLoading(false)
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
                                        <View style={{ width: Layout.window.width, position: 'relative', height: 115 }}>
                                            <CalendarProvider
                                                style={{ width: Layout.window.width }}
                                                onDayPress={(day: any) => { setSelectDay(day.dateString) }}
                                                onDateChanged={(date: any) => {
                                                    MyUtil._consoleLog("onDateChanged : " + JSON.stringify(date))
                                                    setSelectDay(date)
                                                }}
                                                // onMonthChange={this.onMonthChange}
                                                disabledOpacity={0.6}
                                                date={selectDay}
                                            >
                                                <ExpandableCalendar
                                                    style={{
                                                        ...Platform.select({
                                                            ios: {
                                                                shadowColor: "rgb(255, 255, 255)",
                                                                shadowOpacity: 1,
                                                                shadowRadius: 0,
                                                                shadowOffset: {
                                                                    height: 0,
                                                                    width: 0
                                                                }
                                                            },
                                                            android: {
                                                                elevation: 0
                                                            }
                                                        })
                                                    }}
                                                    monthFormat={'yyyy-MM'}
                                                    disablePan
                                                    hideKnob
                                                    disableWeekScroll
                                                    disableAllTouchEventsForDisabledDays
                                                    hideExtraDays={true}
                                                // firstDay={1}
                                                // scrollEnabled={false}
                                                // hideArrows
                                                // horizontal={false}
                                                // markedDates={{ "2021-05-28": { "marked": true }, "2021-05-31": { "marked": true }, "2021-06-01": { "marked": true }, "2021-06-02": { "marked": true }, "2021-06-03": { "disabled": true }, "2021-06-04": { "marked": true }, "2021-06-05": { "marked": true }, "2021-06-06": { "disabled": true }, "2021-06-07": { "marked": true }, "2021-06-08": { "marked": true }, "2021-06-09": { "marked": true } }}
                                                />
                                            </CalendarProvider>
                                        </View>
                                    ) : (
                                        <View style={{ width: Layout.window.width - 20, position: 'relative' }}>
                                            <Calendar
                                                current={selectDay}
                                                date={selectDay}
                                                monthFormat={'yyyy-MM'}
                                                onDayPress={(day) => { setSelectDay(day.dateString) }}
                                                onDayLongPress={(day) => { console.log('selected day', day) }}
                                                onMonthChange={(month) => { console.log('month changed', month) }}
                                                hideExtraDays={true}
                                                // firstDay={1}
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
                                    )
                                }

                                <TouchableOpacity style={{ padding: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}
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