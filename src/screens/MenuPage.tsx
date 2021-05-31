import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, Image, TouchableOpacity, StatusBar, Text, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import { RootState } from '../components/redux/rootReducer'
import * as ITF from '../constants/Interface'
import Loader from "../components/Loader"
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";



const MenuPage = () => {
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
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgNavy }}>
            <View style={{ width: Layout.window.widthFix, flex: 1 }}>
                <StatusBar barStyle="light-content" backgroundColor={Colors.bgNavy} />
                {
                    loading ? (<Loader />) : (

                        <View style={{ width: Layout.window.width, flex: 1, alignItems: 'center' }}>
                            <View style={{ width: Layout.window.width, height: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <TouchableOpacity style={{ width: 30, height: 30, marginRight: 12, marginTop: -4 }} onPress={() => { navigation.goBack() }}>
                                    <Image style={{ width: 30, height: 30 }} source={require('../img/btn_x.png')} resizeMode='contain' />
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: Layout.window.widthFix, alignItems: 'center', flexDirection: 'row' }}>
                                <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={require('../img/temp_user_profile.png')} resizeMode='cover' />

                                <Text allowFontScaling={false} numberOfLines={1} style={{ color: '#ffffff', fontSize: Layout.fsXL, marginLeft: 10 }}>김정훈</Text>
                                <Text allowFontScaling={false} numberOfLines={1} style={{ color: '#ffffff', fontSize: Layout.fsS, marginLeft: 3 }}>학생</Text>

                                <View style={{ flex: 1, height: 1 }}></View>

                                <Image style={{ width: 20, height: 20 }} source={require('../img/btn_logout.png')} resizeMode='contain' />
                            </View>

                            <View style={{ width: Layout.window.widthFix, alignItems: 'center', flexDirection: 'row', marginTop: 15 }}>
                                <TouchableOpacity style={styles.mainBtnWrap} onPress={() => { navigation.navigate({ name: 'InfoUpdate', params: { isJoin: false, uniq_key: "", easy_type: "" } }); }}>
                                    <Image style={styles.mainBtnImg} source={require('../img/ic_my.png')} resizeMode='contain' />
                                    <Text allowFontScaling={false} numberOfLines={1} style={styles.mainBtnText}>내 정보</Text>
                                </TouchableOpacity>

                                <View style={{ flex: 1, height: 1 }}></View>

                                <TouchableOpacity style={styles.mainBtnWrap} onPress={() => { navigation.navigate({ name: 'AttendChart', params: {} }); }}>
                                    <Image style={styles.mainBtnImg} source={require('../img/ic_graph.png')} resizeMode='contain' />
                                    <Text allowFontScaling={false} numberOfLines={1} style={styles.mainBtnText}>출석률</Text>
                                </TouchableOpacity>

                                <View style={{ flex: 1, height: 1 }}></View>

                                <TouchableOpacity style={styles.mainBtnWrap} onPress={() => { navigation.navigate({ name: 'CramList', params: {} }); }}>
                                    <Image style={styles.mainBtnImg} source={require('../img/ic_cram.png')} resizeMode='contain' />
                                    <Text allowFontScaling={false} numberOfLines={1} style={styles.mainBtnText}>학원 관리</Text>
                                </TouchableOpacity>

                                <View style={{ flex: 1, height: 1 }}></View>

                                <TouchableOpacity style={styles.mainBtnWrap}>
                                    <Image style={styles.mainBtnImg} source={require('../img/ic_msg.png')} resizeMode='contain' />
                                    <Text allowFontScaling={false} numberOfLines={1} style={styles.mainBtnText}>문의 하기</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginVertical: 20, width: Layout.window.widthFix, height: 1, backgroundColor: '#454B5F' }}></View>

                            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
                                keyboardShouldPersistTaps='handled'>

                                <View style={{ flexDirection: 'row', width: Layout.window.widthFix, alignItems: 'center', justifyContent: 'space-between', marginTop: 5 }}>
                                    <TouchableOpacity style={styles.midBtnWrap}>
                                        <Image style={styles.midBtnImg} source={require('../img/ic_share.png')} resizeMode='contain' />

                                        <View style={styles.midBtnTextWrap}>
                                            <Text allowFontScaling={false} numberOfLines={1} style={styles.midBtnText1}>자녀 등록</Text>
                                            <Text allowFontScaling={false} numberOfLines={1} style={styles.midBtnText2}>코드 공유</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.midBtnWrap}>
                                        <Image style={styles.midBtnImg} source={require('../img/ic_qrcode.png')} resizeMode='contain' />

                                        <View style={styles.midBtnTextWrap}>
                                            <Text allowFontScaling={false} numberOfLines={1} style={styles.midBtnText1}>자녀 등록</Text>
                                            <Text allowFontScaling={false} numberOfLines={1} style={styles.midBtnText2}>QR 이미지</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.notiWrap}>
                                    {
                                        ['', '', '', '', ''].map((item, idx) => (
                                            <View key={idx} style={{ width: '90%', paddingVertical: 15, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: Colors.grayLine }}>
                                                <Image style={{ width: 20, height: 20 }} source={require('../img/ic_noti2.png')} resizeMode='contain' />

                                                <View style={{ flex: 1, paddingLeft: 7 }}>
                                                    <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsS, color: Colors.pastelPurple }}>2021-05-11 to 모두</Text>
                                                    <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsM, color: Colors.defaultText, marginTop: 4 }}>5월 12일 부처님 오신날은 휴원 합니다.</Text>
                                                    <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsS, color: Colors.baseTextGray, marginTop: 2 }}>5월은 유독 쉬는 날이 많은 것 같습니다. :) 잘 쉬시고 5월 …</Text>
                                                </View>
                                            </View>
                                        ))
                                    }
                                </View>
                            </ScrollView>
                        </View>
                    )
                }
            </View>
        </SafeAreaView >
    );

}

const styles = StyleSheet.create({
    mainBtnWrap: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 70, height: 70
    },
    mainBtnImg: {
        width: 36, height: 36
    },
    mainBtnText: {
        fontSize: Layout.fsS,
        color: '#ffffff',
        marginTop: 3
    },
    midBtnWrap: {
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 16,
        backgroundColor: '#FAFAFA',
        width: Layout.window.widthFix / 2 - 7,
        height: 70,
        ...Platform.select({
            ios: {
                shadowColor: "rgb(50, 50, 50)",
                shadowOpacity: 0.8,
                shadowRadius: 3,
                shadowOffset: {
                    height: 1,
                    width: 1
                }
            },
            android: {
                elevation: 4
            }
        })
    },
    midBtnImg: {
        width: 36,
        height: 36,
        marginLeft: 15
    },
    midBtnTextWrap: {
        marginLeft: 12
    },
    midBtnText1: {
        fontSize: Layout.fsS,
        color: Colors.baseTextGray,
    },
    midBtnText2: {
        fontSize: Layout.fsL,
        color: Colors.defaultText,
        fontWeight: 'bold'
    },
    notiWrap: {
        borderRadius: 16,
        backgroundColor: '#FAFAFA',
        width: Layout.window.widthFix,
        paddingVertical: 10,
        marginTop: 25,
        alignItems: 'center',
        marginBottom: 20,
        ...Platform.select({
            ios: {
                shadowColor: "rgb(50, 50, 50)",
                shadowOpacity: 0.8,
                shadowRadius: 3,
                shadowOffset: {
                    height: 1,
                    width: 1
                }
            },
            android: {
                elevation: 4
            }
        })
    },
});

export default MenuPage;