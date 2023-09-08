import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, ImageBackground, Text, TouchableOpacity, Image, Linking } from "react-native";
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../components/redux/rootReducer';
import * as MyUtil from '../constants/MyUtil';
import * as ITF from '../constants/Interface';
import * as SG from '../constants/Signature';
import * as ServerApi from "../constants/ServerApi";
import Loader from "../components/Loader";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import CST from '../constants/constants';
import CustomHeader from "../components/CustomHeader";
import CramClassItem from "../components/CramClassItem";
import Config from "../constants/Config";



const CramDetail = () => {
    const route = useRoute<RouteProp<SG.StackParams, 'COMMON'>>();
    const navigation = useNavigation();
    const { rxLoginInfo } = useSelector((state: RootState) => state.rxLoginInfo, (prev, next) => { return prev.rxLoginInfo === next.rxLoginInfo; })
    const [loading, setLoading] = useState(false);
    const [biz_no, setBiz_no] = useState<any>(route.params.biz_no);
    const [serverData, setServerData] = useState<any>({ file_nm: "", rep_tel: "", jibun_add: "", jibun_add_dtl: "", array1: [], array2: [], RSP_CODE: "", MSG: "" });


    useEffect(() => {
        async function fetchData() {
            m_app_biz_subj_list();
        }
        fetchData();
    }, []);

    const m_app_biz_subj_list = useCallback(async () => {
        const result = await ServerApi.m_app_biz_subj_list(biz_no, rxLoginInfo.u_id,rxLoginInfo.c_gb_dt);
        if (result.IS_SUCCESS === true && result.DATA_RESULT.RSP_CODE === CST.DB_SUCSESS) {
            setServerData(result.DATA_RESULT);
        } else {
            MyUtil._alertMsg('m_app_biz_subj_list', result.DATA_RESULT);
        }

        setLoading(false);
    }, [biz_no]);



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgNavy }}>
            {
                loading ? (<Loader />) : (
                    <View style={{ flex: 1, width: Layout.window.width }}>
                        <ImageBackground source={{ uri: Config.SERVER_URL + serverData.file_nm }} resizeMode='cover'
                            style={{ width: Layout.window.width, height: Layout.window.width * (10 / 16) }}>
                            <CustomHeader navigation={navigation} isBackBtn={true} title={serverData.biz_nm} themeColor={'#ffffff'} />

                            <View style={{ width: '100%', paddingVertical: 10, paddingHorizontal: 15, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'space-between', position: 'absolute', bottom: 0 }}>
                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => { Linking.openURL(`tel:${serverData.rep_tel}`) }}>
                                    <Image style={{ width: 14, height: 14 }}
                                        source={require('../img/ic_call.png')}
                                        resizeMode='contain' />
                                    <Text allowFontScaling={false} numberOfLines={1} style={{ color: '#ffffff', fontSize: Layout.fsS, marginLeft: 8 }}>{serverData.rep_tel}</Text>
                                </TouchableOpacity>

                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                                    <Image style={{ width: 14, height: 14 }}
                                        source={require('../img/ic_loc.png')}
                                        resizeMode='contain' />
                                    <Text allowFontScaling={false} numberOfLines={2} style={{ color: '#ffffff', fontSize: Layout.fsS, marginLeft: 8 }}>{serverData.jibun_add} {serverData.jibun_add_dtl}</Text>
                                </View>
                            </View>
                        </ImageBackground>

                        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} keyboardShouldPersistTaps='handled'>

                            <View style={{ width: Layout.window.widthFix, marginTop: 10 }}>
                                <Text allowFontScaling={false} numberOfLines={1} style={{ color: '#ffffff', fontSize: Layout.fsM, fontWeight: 'bold', marginTop: 20 }}>수강중인 수업</Text>
                            </View>

                            {
                                serverData.array1.map((item: any, idx: number) => (
                                    <CramClassItem key={idx} item={item} />
                                ))
                            }


                            <View style={{ width: Layout.window.widthFix, marginTop: 20 }}>
                                <Text allowFontScaling={false} numberOfLines={1} style={{ color: '#ffffff', fontSize: Layout.fsM, fontWeight: 'bold', marginTop: 20 }}>수강 가능한 수업</Text>
                            </View>

                            {
                                serverData.array2.map((item: any, idx: number) => (
                                    <CramClassItem key={idx} item={item} />
                                ))
                            }

                            <View style={{ width: 1, height: 50 }}></View>
                        </ScrollView>
                    </View>
                )
            }
        </SafeAreaView >
    );

}

const styles = StyleSheet.create({
});

export default CramDetail;