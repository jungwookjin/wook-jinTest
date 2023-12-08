import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, ImageBackground, Text, Image, Linking, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../components/redux/rootReducer'
import * as ServerApi from "../constants/ServerApi";
import * as MyUtil from "../constants/MyUtil";
import Loader from "../components/Loader"
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import CustomHeader from "../components/CustomHeader";
import CST from '../constants/constants';
import Config from "../constants/Config";



const CramList = () => {
    const navigation = useNavigation();
    const { rxLoginInfo } = useSelector((state: RootState) => state.rxLoginInfo, (prev, next) => { return prev.rxLoginInfo === next.rxLoginInfo; });
    const [loading, setLoading] = useState(true);
    const [arrData, setArrData] = useState<any>([]);




    useEffect(() => {
        async function fetchData() { m_app_stu_biz() }
        fetchData();
    }, []);



    const m_app_stu_biz = useCallback(async () => {
        const result = await ServerApi.m_app_stu_biz(rxLoginInfo.u_id);
        if (result.IS_SUCCESS === true && result.DATA_RESULT.RSP_CODE === CST.DB_SUCSESS) {
            setArrData(result.DATA_RESULT.QUERY_DATA);
        } else {
            MyUtil._alertMsg('m_app_stu_biz', result.DATA_RESULT);
        }

        setLoading(false);
    }, [])




    // ******************************************

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgNavy }}>
            {
                loading ? (<Loader />) : (
                    <View style={{ flex: 1, width: Layout.window.width }}>
                        <CustomHeader navigation={navigation} isBackBtn={true} title={'학원 관리'} themeColor={'#ffffff'} />

                        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} keyboardShouldPersistTaps='handled'>
                            {
                                MyUtil._isNull(arrData) ? (
                                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                                        <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsM, color: '#ffffff' }}>조회된 정보가 없어요</Text>
                                    </View>

                                ) : (
                                    arrData.map((item: any, idx: number) => (
                                        <ImageBackground key={idx} source={{ uri: Config.SERVER_URL + item.file_nm }} resizeMode='cover'
                                            style={{ width: Layout.window.widthFix, height: 160, borderRadius: 20, overflow: 'hidden', marginVertical: 12, flexDirection: 'column' }}>

                                            <TouchableOpacity style={{ height: 124, width: Layout.window.widthFix }} onPress={() => { navigation.navigate({ name: 'CramDetail', params: { biz_no: item.biz_no } }); }}></TouchableOpacity>

                                            <View style={{ width: '100%', height: 36, paddingHorizontal: 15, backgroundColor: 'rgba(0,0,0,0.6)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Text allowFontScaling={false} numberOfLines={1} style={{ color: '#ffffff', fontSize: Layout.fsM }}>{item.biz_nm}</Text>

                                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => { Linking.openURL(`tel:${item.rep_tel}`) }}>
                                                    <Image style={{ width: 14, height: 14 }}
                                                        source={require('../img/ic_call.png')}
                                                        resizeMode='contain' />
                                                    <Text allowFontScaling={false} numberOfLines={1} style={{ color: '#ffffff', fontSize: Layout.fsS }}> 전화 걸기</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </ImageBackground>
                                    ))
                                )
                            }
                        </ScrollView>
                    </View>
                )
            }
        </SafeAreaView >
    );

}

const styles = StyleSheet.create({
});

export default CramList;