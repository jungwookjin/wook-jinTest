import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, ImageBackground, Text, Image, TouchableOpacity, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
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
                    <ImageBackground source={require('../img/bg_blue.png')} resizeMode='cover'
                        style={{ width: Layout.window.width, flex: 1 }}>
                        <View style={{ width: Layout.window.width, flex: 1 }}>
                            {/* <CustomHeader navigation={navigation} isBackBtn={false} /> */}
                            <View style={{
                                width: Layout.window.width, height: 44, backgroundColor: '#ffffff', flexDirection: 'row', alignItems: 'center', zIndex: 99,
                                ...Platform.select({ android: { elevation: 0 } })
                            }}>
                                <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsL, color: Colors.defaultText, marginLeft: 15, fontWeight: 'bold' }}>김정훈</Text>
                                <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsSM, color: Colors.skyBlue, marginLeft: 3 }}>학생</Text>

                                <View style={{ flex: 1 }}></View>

                                <TouchableOpacity style={{ marginRight: 10 }}>
                                    <Image style={{ width: 25, height: 25 }}
                                        source={require('../img/btn_noti.png')} resizeMode='contain' />
                                </TouchableOpacity>

                                <TouchableOpacity style={{ marginRight: 15 }}>
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
                                        // current={'2012-03-01'}
                                        monthFormat={'yyyy-MM'}
                                        // minDate={'2012-05-10'}
                                        // maxDate={'2012-05-30'}
                                        // markedDates={selectDay}
                                        onDayPress={(day) => { setSelectDay(day.dateString) }}
                                        onDayLongPress={(day) => { console.log('selected day', day) }}
                                        onMonthChange={(month) => { console.log('month changed', month) }}
                                        // renderArrow={(direction) => (<Arrow />)}
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
                                    // hideArrows={true}
                                    // disableMonthChange={true}
                                    // disableArrowLeft={true}
                                    // disableArrowRight={true}
                                    // disableAllTouchEventsForDisabledDays={true}
                                    // renderHeader={(date) => {/*Return JSX*/ }}
                                    // enableSwipeMonths={true}
                                    />
                                </View>

                                <View style={{ position: 'absolute', top: -5, width: Layout.window.width, height: 10, backgroundColor: '#ffffff' }}></View>
                            </View>


                            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', width: Layout.window.width, paddingBottom: 40 }} keyboardShouldPersistTaps='handled'>

                            </ScrollView>
                        </View>
                    </ImageBackground>
                )
            }
        </SafeAreaView >
    );

}

const styles = StyleSheet.create({
});

export default Main;