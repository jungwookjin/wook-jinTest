import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, ScrollView, SafeAreaView, ImageBackground, Platform, View, Image, Text, FlatList, ActivityIndicator, TouchableOpacity, Linking } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../components/redux/rootReducer';
import * as ITF from '../constants/Interface';
import * as ServerApi from "../constants/ServerApi";
import * as MyUtil from "../constants/MyUtil";
import Loader from "../components/Loader";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import CustomHeader from "../components/CustomHeader";
import CST from '../constants/constants';
import NoticeItem from "../components/NoticeItem";



const AlarmList = () => {
    const navigation = useNavigation();
    const { rxLoginInfo } = useSelector((state: RootState) => state.rxLoginInfo, (prev, next) => { return prev.rxLoginInfo === next.rxLoginInfo; })
    const [loading, setLoading] = useState(true);
    const [loadingFlag, setLoadingFlag] = useState<boolean>(false);
    const [loadingList, setLoadingList] = useState<boolean>(false);
    const [pageNo, setPageNo] = useState<number>(1);
    const [arrData, setArrData] = useState<any>([]);

    useEffect(() => {
        m_app_alarm(true);
    }, []);


    const m_app_alarm = useCallback(async (isReset: boolean) => {
        setLoadingFlag(true);
        setLoadingList(true);
        let rowNo = pageNo + 1;
        let getLoadingFalg = false;
        let arrPrev = arrData;
        let newArray: any = [];

        if (isReset) {
            rowNo = 1;
            arrPrev = [];
        }

        const result = await ServerApi.m_app_alarm(rxLoginInfo.u_id, String(rowNo));
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





    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                loading ? (<Loader />) : (

                    <ImageBackground source={require('../img/bg_blue_blur.png')} resizeMode='cover'
                        style={{ width: Layout.window.width, flex: 1, alignItems: 'center' }}
                        imageStyle={{ ...Platform.select({ ios: { opacity: 0.7 }, android: { opacity: 0.6 } }) }}>

                        <CustomHeader navigation={navigation} isBackBtn={true} title={'알림 리스트'} themeColor={'#000000'} />


                        <View style={{ marginTop: 6, width: Layout.window.widthFix, flex: 1, marginBottom: 10, backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 14, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 13 }}>
                            {/* <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', width: Layout.window.widthFix }} keyboardShouldPersistTaps='handled'> */}
                            <View style={styles.notiWrap}>
                                <FlatList
                                    style={{ width: '100%' }}
                                    data={arrData}
                                    keyExtractor={(item, index) => String(index)}
                                    onEndReached={() => { if (loadingFlag === false) { m_app_alarm(false) } }}
                                    onEndReachedThreshold={0.8}
                                    initialNumToRender={15} // 필수 * 없으면 데이터 많을시 앱 죽음(IOS)
                                    ListHeaderComponent={() => {
                                        if (MyUtil._isNull(arrData)) {
                                            return (
                                                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                                                    <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsM, color: Colors.baseTextGray }}>조회된 정보가 없어요</Text>
                                                </View>
                                            )
                                        } else { return <></>; }
                                    }}
                                    ListFooterComponent={() => {
                                        if (loadingList) {
                                            return (
                                                <View style={{ width: Layout.window.width, height: 40, marginBottom: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
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
                            {/* </ScrollView> */}
                        </View>
                    </ImageBackground>
                )
            }
            {/* <View style={{ width: Layout.window.width, paddingVertical: 10, backgroundColor: Colors.grayLine, marginTop: 10 }}>
                <Text allowFontScaling={false} style={{ fontSize: Layout.fsXS, color: Colors.baseTextGray, paddingHorizontal: 10 }}>데브에듀  |  대표: 유지현  |  사업자 번호: 826-53-00301  |  주소: 부산광역시 남구 전포대로 10 신화빌딩 6층</Text>
                <TouchableOpacity onPress={() => { Linking.openURL('http://15.165.156.218:3909/term/privacy.html') }}>
                    <Text allowFontScaling={false} style={{ fontSize: Layout.fsXS, color: '#0000ff', paddingHorizontal: 10, marginTop: 3 }}>개인정보 취급 방침</Text>
                </TouchableOpacity>
            </View> */}
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