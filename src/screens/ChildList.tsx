import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, ImageBackground, Text, Image, Alert, TouchableOpacity } from "react-native";
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



const ChildList = () => {
    const navigation = useNavigation();
    const { rxLoginInfo } = useSelector((state: RootState) => state.rxLoginInfo, (prev, next) => { return prev.rxLoginInfo === next.rxLoginInfo; });
    const [loading, setLoading] = useState(true);
    const [arrData, setArrData] = useState<any>([]);




    useEffect(() => {
        async function fetchData() { m_app_my_child(); }
        fetchData();
    }, []);


    const m_app_child_d = useCallback((getCUid) => {
        Alert.alert("", '정말로 삭제 하시겠습니까?', [
            { text: '취소', onPress: () => { }, style: 'cancel', },
            {
                text: '확인', onPress: async () => {
                    const result = await ServerApi.m_app_child_d(rxLoginInfo.u_id, getCUid);
                    if (result.IS_SUCCESS === true && result.DATA_RESULT.RSP_CODE === CST.DB_SUCSESS) {
                        Alert.alert('', '삭제되었습니다');
                        navigation.goBack();
                    } else {
                        MyUtil._alertMsg('m_app_my_child', result.DATA_RESULT);
                    }

                }
            },], { cancelable: false },
        )
    }, []);


    const m_app_my_child = useCallback(async () => {
        const result = await ServerApi.m_app_my_child(rxLoginInfo.u_id);
        if (result.IS_SUCCESS === true && result.DATA_RESULT.RSP_CODE === CST.DB_SUCSESS) {

            const newArray = result.DATA_RESULT.QUERY_DATA;
            let addData = [];
            let prevName = '';
            let rootData = [];

            // 날짜별로 데이터 모아줍니다.
            for (const idx in newArray) {
                const item = newArray[idx];
                const curName = item.name;

                if (prevName === '' || prevName !== curName) {
                    prevName = curName;

                    if (addData.length > 0) { rootData.push(addData); };
                    addData = [];
                    addData.push(item);

                } else {
                    addData.push(item);
                };

                // 마지막 데이터 푸시
                if ((newArray.length - 1) === parseInt(idx)) { rootData.push(addData); };
            };

            setArrData(rootData);

        } else {
            MyUtil._alertMsg('m_app_my_child', result.DATA_RESULT);
        };

        setLoading(false);
    }, []);




    // ******************************************

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgNavy }}>
            {
                loading ? (<Loader />) : (
                    <View style={{ flex: 1, width: Layout.window.width }}>
                        <CustomHeader navigation={navigation} isBackBtn={true} title={'자녀 관리'} themeColor={'#ffffff'} />

                        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} keyboardShouldPersistTaps='handled'>
                            {
                                MyUtil._isNull(arrData) ? (
                                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                                        <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsM, color: '#ffffff' }}>조회된 정보가 없어요</Text>
                                    </View>

                                ) : (
                                    <View style={{ width: Layout.window.widthFix, flexWrap: 'wrap', flexDirection: 'row' }}>
                                        {
                                            arrData.map((item: any, idx: number) => (
                                                <TouchableOpacity key={idx} onPress={() => { navigation.navigate({ name: 'CramListParents', params: { arrData: item } }); }}>
                                                    <ImageBackground source={{ uri: Config.SERVER_URL + item[0].profile_img }} resizeMode='cover'
                                                        style={{ width: (Layout.window.widthFix / 2) - 14, marginHorizontal: 6.6, height: 180, borderRadius: 20, overflow: 'hidden', flexDirection: 'column', justifyContent: 'space-between' }}>

                                                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                            <TouchableOpacity style={{ padding: 10 }} onPress={() => { m_app_child_d(item[0].u_id)}}>
                                                                <Image style={{ width: 24, height: 24 }}
                                                                    source={require('../img/ic_setting.png')}
                                                                    resizeMode='contain' />
                                                            </TouchableOpacity>
                                                        </View>

                                                        <View style={{ width: '100%', flexDirection: 'row', marginLeft: 10, marginBottom: 10, height: 38 }}>
                                                            {
                                                                item.map((subItem: any, idx2: number) => (
                                                                    <Image key={idx2} source={{ uri: Config.SERVER_URL + subItem.file_nm }} resizeMode='cover'
                                                                        style={{ width: 38, height: 38, borderRadius: 19, overflow: 'hidden', flexDirection: 'column', borderWidth: 2, borderColor: '#ffffff', position: 'absolute', left: idx2 * 20 }} />
                                                                ))
                                                            }
                                                        </View>
                                                    </ImageBackground>
                                                </TouchableOpacity>
                                            ))
                                        }
                                    </View>
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

export default ChildList;