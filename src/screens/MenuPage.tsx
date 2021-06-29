import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Alert, SafeAreaView, View, Image, TouchableOpacity, StatusBar, Text, Platform, FlatList, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../components/redux/rootReducer';
import * as ServerApi from "../constants/ServerApi";
import * as MyUtil from "../constants/MyUtil";
import * as MyAsyncStorage from "../constants/MyAsyncStorage";
import ModalQrCode from "../components/ModalQrCode";
import Config from "../constants/Config";
import CST from '../constants/constants';
import Loader from "../components/Loader";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import allActions from "../components/redux/allActions";
import NoticeItem from "../components/NoticeItem";
import ModalQrImage from "../components/ModalQrImage";



const MenuPage = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { rxLoginInfo } = useSelector((state: RootState) => state.rxLoginInfo, (prev, next) => { return prev.rxLoginInfo === next.rxLoginInfo; })
    const [loading, setLoading] = useState(false);
    const [loadingFlag, setLoadingFlag] = useState<boolean>(false);
    const [pageNo, setPageNo] = useState<number>(1);
    const [arrData, setArrData] = useState<any>([]);
    const [loadingList, setLoadingList] = useState<boolean>(false);
    const [profileImg, setProfileImg] = useState<any>(null);
    const [profileImgError, setProfileImgError] = useState<boolean>(false);
    const [isModalQr, setIsModalQr] = useState(false);
    const [isModalImgQr, setIsModalImgQr] = useState(false);
    const [searchChildData, setSearchChildData] = useState("");


    useEffect(() => {
        m_app_noti(true);
    }, []);


    const m_app_noti = useCallback(async (isReset: boolean) => {
        setLoadingFlag(true);
        setLoadingList(true)
        let rowNo = pageNo + 1;
        let getLoadingFalg = false;
        let arrPrev = arrData;
        let newArray: any = [];

        if (isReset) {
            rowNo = 1;
            arrPrev = [];
        }

        const result = await ServerApi.m_app_noti(rxLoginInfo.u_id, String(rowNo));
        if (result.IS_SUCCESS === true && result.DATA_RESULT.RSP_CODE === CST.DB_SUCSESS) {
            if (result.DATA_RESULT.QUERY_DATA.length > 0) {
                newArray = [...arrPrev, ...result.DATA_RESULT.QUERY_DATA];
            } else {
                if (isReset) {
                    newArray = [];
                } else {
                    getLoadingFalg = true;
                    newArray = [...arrPrev, ...result.DATA_RESULT.QUERY_DATA];
                }
            }
        } else {
            MyUtil._alertMsg('m_app_alarm', result.DATA_RESULT);
        }

        setPageNo(rowNo);
        setLoadingFlag(getLoadingFalg);
        setArrData(newArray);
        setLoading(false);
        setLoadingList(false);
    }, [rxLoginInfo, pageNo, arrData]);


    const _logOut = useCallback(() => {
        Alert.alert("", '정말로 로그아웃 하시겠습니까?', [
            { text: '취소', onPress: () => { }, style: 'cancel', },
            {
                text: '확인', onPress: async () => {
                    dispatch(allActions.logOut())
                    await MyAsyncStorage._writeAsyncStorage(Config.AS_KEY_LOGIN_INFO, null);

                    Alert.alert("", "로그아웃 하였습니다.")
                    navigation.reset({ index: 0, routes: [{ name: 'Login', params: {} }] })

                }
            },], { cancelable: false },
        )
    }, []);



    const m_app_code_child = useCallback(async (getCcode) => {
        const result = await ServerApi.m_app_code_child(getCcode);
        if (result.IS_SUCCESS === true && result.DATA_RESULT.RSP_CODE === CST.DB_SUCSESS) {
            setSearchChildData(result.DATA_RESULT.QUERY_DATA[0]);

            Alert.alert("", result.DATA_RESULT.QUERY_DATA[0].name + ' 자녀를 등록하시겠습니까?', [
                { text: '취소', onPress: () => { }, style: 'cancel', },
                {
                    text: '확인', onPress: async () => {
                        m_app_child_i(result.DATA_RESULT.QUERY_DATA[0].u_id);
                    }
                },], { cancelable: false },
            )
        } else {
            MyUtil._alertMsg('m_app_code_child', result.DATA_RESULT);
        }

        setLoading(false);
    }, []);


    const m_app_child_i = useCallback(async (getCuid) => {
        const result = await ServerApi.m_app_child_i(rxLoginInfo.u_id, getCuid, rxLoginInfo.gender);
        if (result.IS_SUCCESS === true && result.DATA_RESULT.RSP_CODE === CST.DB_SUCSESS) {
            Alert.alert('', '자녀가 등록되었습니다.');
        } else {
            MyUtil._alertMsg('m_app_child_i', result.DATA_RESULT);
        }

        setLoading(false);
    }, [rxLoginInfo]);


    // 다이얼로그에서 넘어오는 정보
    const _modalQrCb = useCallback(async (isOk, detailDt, getSelectSubjNo) => {
        setIsModalQr(false)

        setTimeout(async () => {
            if (isOk) {
                MyUtil._consoleLog('_modalQrCb : ' + detailDt);
                setLoading(true);
                m_app_code_child(detailDt)
            }
        }, 500)
    }, [])


    // 다이얼로그에서 넘어오는 정보
    const _modalImgQrCb = useCallback(async (isOk, detailDt, getSelectSubjNo) => {
        setIsModalImgQr(false);
    }, [])



    // ******************************************
    if (MyUtil._isNull(rxLoginInfo)) { return <></> }

    let profileSource: any = {}
    if (profileImgError) {
        profileSource = require('../img/ic_circle_profile.png');
    } else {
        if (profileImg !== null) {
            profileSource.uri = 'data:' + profileImg.mime + ';base64,' + profileImg.data; // 이미지 피커 선택된 이미지
        } else {
            if (!MyUtil._isNull(rxLoginInfo.profile_img)) {
                profileSource.uri = Config.SERVER_URL + rxLoginInfo.profile_img; // 수정시 초기 이미지
            } else {
                profileSource.uri = "error"; // 추가시 아무것도 안뜨기때문에 에러 유도
            }
        }
    }

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
                                <Image source={profileSource} resizeMode='cover'
                                    style={{ width: 50, height: 50, borderRadius: 25 }} />

                                <Text allowFontScaling={false} numberOfLines={1} style={{ color: '#ffffff', fontSize: Layout.fsXL, marginLeft: 10 }}>{rxLoginInfo.name}</Text>
                                <Text allowFontScaling={false} numberOfLines={1} style={{ color: '#ffffff', fontSize: Layout.fsS, marginLeft: 3 }}>{MyUtil._codeToKor(rxLoginInfo.c_gb_dt, "c_gb_dt")}</Text>

                                <View style={{ flex: 1, height: 1 }}></View>

                                <TouchableOpacity onPress={() => { _logOut() }}>
                                    <Image style={{ width: 20, height: 20 }} source={require('../img/btn_logout.png')} resizeMode='contain' />
                                </TouchableOpacity>
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

                                <TouchableOpacity style={styles.mainBtnWrap} onPress={() => {
                                    if (rxLoginInfo.c_gb_dt === CST.C_BG_PARENTS) {
                                        navigation.navigate({ name: 'ChildList', params: {} });
                                    } else {
                                        navigation.navigate({ name: 'CramList', params: {} });
                                    }
                                }}>
                                    <Image style={styles.mainBtnImg} source={rxLoginInfo.c_gb_dt === CST.C_BG_PARENTS ? require('../img/ic_childrun.png') : require('../img/ic_cram.png')} resizeMode='contain' />
                                    <Text allowFontScaling={false} numberOfLines={1} style={styles.mainBtnText}>{rxLoginInfo.c_gb_dt === CST.C_BG_PARENTS ? '자녀 관리' : '학원 관리'}</Text>
                                </TouchableOpacity>

                                <View style={{ flex: 1, height: 1 }}></View>

                                <TouchableOpacity style={styles.mainBtnWrap} onPress={() => { Alert.alert('', '준비중입니다.') }}>
                                    <Image style={styles.mainBtnImg} source={require('../img/ic_msg.png')} resizeMode='contain' />
                                    <Text allowFontScaling={false} numberOfLines={1} style={styles.mainBtnText}>문의 하기</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 0 }}>
                                <View style={{ flexDirection: 'row', width: Layout.window.widthFix, alignItems: 'center', justifyContent: 'space-between', marginTop: 5 }}>
                                    <TouchableOpacity style={styles.midBtnWrap} onPress={() => { Alert.alert('', '준비중입니다.') }}>
                                        <Image style={styles.midBtnImg} source={require('../img/ic_share.png')} resizeMode='contain' />

                                        <View style={styles.midBtnTextWrap}>
                                            <Text allowFontScaling={false} numberOfLines={1} style={styles.midBtnText1}>자녀 등록</Text>
                                            <Text allowFontScaling={false} numberOfLines={1} style={styles.midBtnText2}>코드 공유</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.midBtnWrap} onPress={() => {
                                        if (rxLoginInfo.c_gb_dt === CST.C_BG_PARENTS) {
                                            setIsModalQr(true)
                                        } else {
                                            setIsModalImgQr(true)
                                        }
                                    }}>
                                        <Image style={styles.midBtnImg} source={require('../img/ic_qrcode.png')} resizeMode='contain' />

                                        <View style={styles.midBtnTextWrap}>
                                            <Text allowFontScaling={false} numberOfLines={1} style={styles.midBtnText1}>자녀 등록</Text>
                                            <Text allowFontScaling={false} numberOfLines={1} style={styles.midBtnText2}>QR {rxLoginInfo.c_gb_dt === CST.C_BG_PARENTS ? '촬영' : '이미지'}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            </View>

                            <View style={{ marginVertical: 15, width: Layout.window.widthFix, height: 1, backgroundColor: '#454B5F' }}></View>

                            <View style={styles.notiWrap}>
                                <FlatList
                                    style={{ width: '100%' }}
                                    data={arrData}
                                    keyExtractor={(item, index) => String(index)}
                                    onEndReached={() => { if (loadingFlag === false) { m_app_noti(false) } }}
                                    onEndReachedThreshold={0.8}
                                    initialNumToRender={5} // 필수 * 없으면 데이터 많을시 앱 죽음(IOS)
                                    ListEmptyComponent={() => {
                                        return (<View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                                            <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsM, color: Colors.baseTextGray }}>조회된 정보가 없어요</Text>
                                        </View>)
                                    }}
                                    ListFooterComponent={() => {
                                        if (loadingList) {
                                            return (
                                                <View style={{ width: Layout.window.width, height: 40, marginBottom: 5, justifyContent: 'center', alignItems: 'center' }}>
                                                    <ActivityIndicator color='#0000ff' />
                                                </View>
                                            )
                                        } else { return <></>; }
                                    }}
                                    renderItem={({ item }) => {
                                        return <NoticeItem item={item} />
                                    }}
                                />
                            </View>
                        </View>
                    )
                }
            </View>


            {
                isModalQr && (
                    <ModalQrCode isModalOpen={isModalQr} _modalCb={_modalQrCb} selectSubjNo={""} />
                )
            }

            {
                isModalImgQr && (
                    <ModalQrImage isModalOpen={isModalImgQr} _modalCb={_modalImgQrCb} getCcode={rxLoginInfo.c_code} />
                )
            }
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
        marginTop: 12,
        borderRadius: 16,
        backgroundColor: '#FAFAFA',
        width: Layout.window.widthFix / 2 - 7,
        height: 60,
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
        width: 32,
        height: 32,
        marginLeft: 18
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
        flex: 1,
        borderRadius: 16,
        backgroundColor: '#FAFAFA',
        width: Layout.window.widthFix,
        paddingVertical: 5,
        alignItems: 'center',
        marginBottom: 10,
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