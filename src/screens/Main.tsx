import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, ImageBackground, Text, Image, TouchableOpacity, Platform, Alert,Linking } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ModalQrCode from "../components/ModalQrCode";
import { RootState } from '../components/redux/rootReducer';
import * as MyUtil from '../constants/MyUtil';
import * as ServerApi from "../constants/ServerApi";
import TransformCalendar from "../components/TransformCalendar";
import Loader from "../components/Loader";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import CST from '../constants/constants';
import Config from "../constants/Config";
import Sprintf from 'sprintf-js';
const sprintf = Sprintf.sprintf;



const Main = () => {
    const refScrollView = useRef(null);
    const navigation = useNavigation();
    const { rxLoginInfo } = useSelector((state: RootState) => state.rxLoginInfo, (prev, next) => { return prev.rxLoginInfo === next.rxLoginInfo; })
    const [loading, setLoading] = useState(false);
    const [arrDayItem, setArrDayItem] = useState([]);
    const [selectSubjNo, setSelectSubjNo] = useState('');
    const [isModalQr, setIsModalQr] = useState(false);



    useEffect(() => {
        async function fetchData() { console.log('rxLoginInfo : '+JSON.stringify(rxLoginInfo)) }
        fetchData();
    }, []);

    const m_app_subj_qr_attend_i = useCallback(async (getBizCode, getSelectSubjNo) => {
        const result = await ServerApi.m_app_subj_qr_attend_i(rxLoginInfo.u_id, getBizCode, getSelectSubjNo);
        if (result.IS_SUCCESS === true && result.DATA_RESULT.RSP_CODE === CST.DB_SUCSESS) {
            setSelectSubjNo('');
            Alert.alert('', '정상적으로 등록되었습니다.');
        } else {
            MyUtil._alertMsg('m_app_subj_qr_attend_i', result.DATA_RESULT);
        }

        setLoading(false);
    }, []);


    const GetDayItems = useCallback(async (getItem) => {
        setArrDayItem(getItem);
    }, []);


    // 다이얼로그에서 넘어오는 정보
    const _modalQrCb = useCallback(async (isOk, detailDt, getSelectSubjNo) => {
        setIsModalQr(false)

        setTimeout(async () => {
            if (isOk) {
                MyUtil._consoleLog('_modalQrCb : ' + detailDt);
                setLoading(true);
                m_app_subj_qr_attend_i(detailDt, getSelectSubjNo);
            }
        }, 500)
    }, [])



    // ******************************************
    if (MyUtil._isNull(rxLoginInfo)) { return <></> }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            {
                loading ? (<Loader />) : (
                    <ImageBackground source={require('../img/bg_blue_blur.png')} resizeMode='cover'
                        style={{ width: Layout.window.width, flex: 1 }}
                        imageStyle={{ ...Platform.select({ ios: { opacity: 0.7 }, android: { opacity: 0.6 } }) }}>

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
                                contentContainerStyle={{ flexGrow: 1, alignItems: 'center', width: Layout.window.width }} keyboardShouldPersistTaps='handled'
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
                                        <TouchableOpacity style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}
                                            onPress={() => { }}>
                                            <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsM, color: Colors.baseTextGray }}>조회된 정보가 없어요</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        arrDayItem.map((item: any, idx) => {
                                            let arrCildrenImg = [];
                                            let arrChildrenState: any = [];

                                            try {
                                                arrCildrenImg = item.profile_img.split(',');
                                                arrChildrenState = item.attend_type.split(',');
                                            } catch (err) { }

                                            return (<View key={idx} style={{ marginTop: 15, width: Layout.window.widthFix, height: 70, backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 14, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 13 }}>
                                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsM, color: Colors.mainBlue, fontWeight: 'bold' }}>{item.start_time} ~ {item.end_time}</Text>
                                                        <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsS, color: Colors.baseTextGray, marginLeft: 7 }}>{item.biz_nm}</Text>
                                                    </View>

                                                    <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsM, color: Colors.defaultText, marginTop: 3 }}>({item.p_name}) {item.subj_nm}</Text>
                                                </View>

                                                {/* **************************** 학생 **************************** */}

                                                {
                                                    rxLoginInfo.c_gb_dt === CST.C_BG_STUDENT && item.attend_type === CST.ATTEND_OK && (
                                                        <Image style={{ width: 32, height: 32 }} source={require('../img/ic_circle_check.png')} resizeMode='contain' />
                                                    )
                                                }

                                                {
                                                    rxLoginInfo.c_gb_dt === CST.C_BG_STUDENT && item.attend_type === CST.ATTEND_TARDY && (
                                                        <Image style={{ width: 32, height: 32 }} source={require('../img/ic_warning.png')} resizeMode='contain' />
                                                    )
                                                }

                                                {
                                                    rxLoginInfo.c_gb_dt === CST.C_BG_STUDENT && item.attend_type === CST.ATTEND_ABSENT && (
                                                        <Image style={{ width: 32, height: 32 }} source={require('../img/ic_circle_x.png')} resizeMode='contain' />
                                                    )
                                                }

                                                {
                                                    rxLoginInfo.c_gb_dt === CST.C_BG_STUDENT && item.attend_type === CST.ATTEND_BEFORE && (
                                                        <TouchableOpacity onPress={() => {
                                                            setSelectSubjNo(item.subj_no + '');
                                                            setIsModalQr(true);
                                                        }}>
                                                            <Image style={{ width: 32, height: 32 }} source={require('../img/ic_qrcode.png')} resizeMode='contain' />
                                                        </TouchableOpacity>
                                                    )
                                                }



                                                {/* **************************** 학부모 **************************** */}

                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    {
                                                        rxLoginInfo.c_gb_dt === CST.C_BG_PARENTS && (

                                                            arrCildrenImg.map((subItem: any, idx2: number) => (
                                                                <Image key={idx2} source={{ uri: Config.SERVER_URL + subItem }} resizeMode='cover'
                                                                    style={{
                                                                        width: 46, height: 46, borderRadius: 23, overflow: 'hidden', flexDirection: 'column', borderWidth: 2.5, position: 'absolute', right: idx2 * 20,
                                                                        borderColor: arrChildrenState[idx2] === CST.ATTEND_BEFORE ? Colors.baseTextMidGray :
                                                                            arrChildrenState[idx2] === CST.ATTEND_OK ? '#00ed33' :
                                                                                arrChildrenState[idx2] === CST.ATTEND_TARDY ? '#e6bf00' :
                                                                                    arrChildrenState[idx2] === CST.ATTEND_ABSENT ? '#e60000' : '#ffffff'
                                                                    }} />
                                                            ))
                                                        )
                                                    }
                                                </View>
                                            </View>
                                            )
                                        })
                                    )
                                }

                                <View style={{ width: 1, flex: 1 }}></View>

                                {/* <View style={{ width: Layout.window.width, paddingVertical: 10, backgroundColor: Colors.grayLine, marginTop: 40 }}>
                                    <Text allowFontScaling={false} style={{ fontSize: Layout.fsXS, color: Colors.baseTextGray, paddingHorizontal: 10 }}>데브에듀  |  대표: 유지현  |  사업자 번호: 826-53-00301  |  주소: 부산광역시 남구 전포대로 10 신화빌딩 6층</Text>
                                    <TouchableOpacity onPress={()=>{Linking.openURL('http://15.165.156.218:3909/term/privacy.html')}}>
                                        <Text allowFontScaling={false} style={{ fontSize: Layout.fsXS, color: '#0000ff', paddingHorizontal: 10, marginTop: 3 }}>개인정보 취급 방침</Text>
                                    </TouchableOpacity>
                                </View> */}
                            </ScrollView>
                        </View>
                    </ImageBackground>
                )
            }

            {
                isModalQr && (
                    <ModalQrCode isModalOpen={isModalQr} _modalCb={_modalQrCb} selectSubjNo={selectSubjNo} />
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