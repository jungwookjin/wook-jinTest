import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, SafeAreaView, ImageBackground, Platform, View, Image, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import { RootState } from '../components/redux/rootReducer'
import * as ITF from '../constants/Interface'
import Loader from "../components/Loader"
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import CustomHeader from "../components/CustomHeader";



const AlarmList = () => {
    const navigation = useNavigation();
    const { rxLoginInfo } = useSelector((state: RootState) => state.rxLoginInfo, (prev, next) => { return prev.rxLoginInfo === next.rxLoginInfo; })
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            console.log("rxLoginInfo : " + JSON.stringify(rxLoginInfo))
        }
        fetchData();
    }, []);


    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                loading ? (<Loader />) : (

                    <ImageBackground source={require('../img/bg_blue_blur.png')} resizeMode='cover'
                        style={{ width: Layout.window.width, flex: 1, alignItems: 'center' }}
                        imageStyle={{ ...Platform.select({ ios: { opacity: 0.7 }, android: { opacity: 0.6 } }) }}>

                        <CustomHeader navigation={navigation} isBackBtn={true} title={'알림 리스트'} themeColor={'#000000'} />


                        <View style={{ marginTop: 6, width: Layout.window.widthFix, flex: 1, marginBottom: 10, backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 14, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 13 }}>
                            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', width: Layout.window.widthFix }} keyboardShouldPersistTaps='handled'>
                                <View style={styles.notiWrap}>
                                    {
                                        ['', '', '', '', ''].map((item, idx) => (
                                            <View key={idx} style={{ width: '100%', paddingVertical: 15, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: Colors.grayLine }}>
                                                <Image style={{ width: 20, height: 20 }} source={require('../img/ic_noti2.png')} resizeMode='contain' />

                                                <View style={{ flex: 1, paddingLeft: 7 }}>
                                                    <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsS, color: Colors.pastelPurple }}>2021-05-11 to 모두</Text>
                                                    <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode={"tail"} style={{ fontSize: Layout.fsM, color: Colors.defaultText, marginTop: 4, flex: 1 }}>5월 12일 부처님 오신날은 휴원 합니다.</Text>
                                                    <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode={"tail"} style={{ fontSize: Layout.fsS, color: Colors.baseTextGray, marginTop: 2, flex: 1 }}>5월은 유독 쉬는 날이 많은 것 같습니다. :) 잘 쉬시고 5월 …</Text>
                                                </View>
                                            </View>
                                        ))
                                    }
                                </View>

                            </ScrollView>
                        </View>
                    </ImageBackground>
                )
            }
        </SafeAreaView >
    );

}

const styles = StyleSheet.create({

    notiWrap: {
        width: '100%',
        alignItems: 'center',
    },
});

export default AlarmList;