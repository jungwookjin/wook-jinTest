import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, ImageBackground, Text, Image, Alert, TouchableOpacity } from "react-native";
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../components/redux/rootReducer';
import * as ServerApi from "../constants/ServerApi";
import * as MyUtil from "../constants/MyUtil";
import * as SG from '../constants/Signature';
import Loader from "../components/Loader"
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import CustomHeader from "../components/CustomHeader";
import CST from '../constants/constants';
import Config from "../constants/Config";



const CramListParents = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<SG.StackParams, 'COMMON'>>();
    const { rxLoginInfo } = useSelector((state: RootState) => state.rxLoginInfo, (prev, next) => { return prev.rxLoginInfo === next.rxLoginInfo; });
    const [loading, setLoading] = useState(false);
    const [arrData, setArrData] = useState<any>(route.params.arrData);

    useEffect(() => {
        async function fetchData() { }
        fetchData();
    }, []);



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
                                        <ImageBackground key={idx} source={{uri:Config.SERVER_URL+item.file_nm}} resizeMode='cover'
                                            style={{ width: Layout.window.widthFix, height: 160, borderRadius: 20, overflow: 'hidden', marginVertical: 12, flexDirection: 'column' }}>

                                            <TouchableOpacity style={{ height: 124, width: Layout.window.widthFix }} onPress={() => { navigation.navigate({ name: 'CramDetail', params: {biz_no:item.biz_no} }); }}></TouchableOpacity>

                                            <View style={{ width: '100%', height: 36, paddingHorizontal: 15, backgroundColor: 'rgba(0,0,0,0.6)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Text allowFontScaling={false} numberOfLines={1} style={{ color: '#ffffff', fontSize: Layout.fsM }}>{item.biz_nm}</Text>

                                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => { Alert.alert('', '전화 걸기 : '+item.rep_tel) }}>
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

export default CramListParents;