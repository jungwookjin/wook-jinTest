import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, FlatList, SafeAreaView, View, Text, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useAndroidBackHandler } from "react-navigation-backhandler";
import DialogPhoto from "../components/DialogPhoto";
import { RootState } from '../components/redux/rootReducer';
import FastImage from 'react-native-fast-image'
import * as ITF from '../constants/Interface';
import * as ServerApi from "../constants/ServerApi";
import * as MyUtil from '../constants/MyUtil';
import Loader from "../components/Loader";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import CustomHeader from "../components/CustomHeader";
import CST from '../constants/constants';
import Config from "../constants/Config";
import Sprintf from 'sprintf-js';
const sprintf = Sprintf.sprintf;



const PicList = () => {
    const navigation = useNavigation();
    const { rxLoginInfo } = useSelector((state: RootState) => state.rxLoginInfo, (prev, next) => { return prev.rxLoginInfo === next.rxLoginInfo; })
    const [loading, setLoading] = useState(true);
    const [loadingFlag, setLoadingFlag] = useState<boolean>(false);
    const [loadingList, setLoadingList] = useState<boolean>(false);
    const [isBackCerti, setIsBackCerti] = useState<boolean>(true);
    const [pageNo, setPageNo] = useState<number>(1);
    const [arrData, setArrData] = useState<any>([]);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [dialogImgIdx, setDialogImgIdx] = useState<number>(-1);
    const [arrAddImage, setArrAddImage] = useState<any>([]);
    const BOX_SIZE = Layout.window.widthFix * 1 / 3 - 4;

    useAndroidBackHandler(() => {
        if (isBackCerti) {
            return false;
        } else {
            setIsBackCerti(true);
            setIsDialogOpen(false);
            return true;
        };
    });


    useEffect(() => {
        m_app_photo(true);
    }, []);

    const m_app_photo = useCallback(async (isReset: boolean) => {
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

        const result = await ServerApi.m_app_photo(rxLoginInfo.u_id, String(rowNo), rxLoginInfo.c_gb_dt);
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
            MyUtil._alertMsg('m_app_photo', result.DATA_RESULT);
        }

        setArrAddImage(newArray);
        setPageNo(rowNo);
        setLoadingFlag(getLoadingFalg);
        setArrData(newArray);
        setLoading(false);
        setLoadingList(false);
    }, [rxLoginInfo, pageNo, arrData]);


    // 다이얼로그에서 넘어오는 정보
    const _dialogCallBack = useCallback(async (isOpen: any, code: any, nm: any) => {
        setIsBackCerti(true);
        setIsDialogOpen(false);
    }, []);

    const _dialogShow = useCallback((idx: any) => {
        setDialogImgIdx(idx);
        setIsBackCerti(false);
        setIsDialogOpen(true);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgNavy }}>
            {
                loading ? (<Loader />) : (
                    <View style={{ flex: 1, width: Layout.window.width }}>
                        <CustomHeader navigation={navigation} isBackBtn={true} title={'앨범'} themeColor={'#ffffff'} />

                        {/* <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', width: Layout.window.widthFix }} keyboardShouldPersistTaps='handled'> */}
                        <View style={styles.notiWrap}>
                            <FlatList
                                style={{ width: '100%' }}
                                contentContainerStyle={{ paddingLeft: 7 }}
                                numColumns={3}
                                data={arrData}
                                keyExtractor={(item, index) => String(index)}
                                onEndReached={() => { if (loadingFlag === false) { m_app_photo(false) } }}
                                onEndReachedThreshold={0.8}
                                initialNumToRender={15} // 필수 * 없으면 데이터 많을시 앱 죽음(IOS)
                                ListEmptyComponent={() => {
                                    return (<View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                                        <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsM, color: '#dbdbdb' }}>조회된 정보가 없어요</Text>
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
                                renderItem={({ item, index }) => {
                                    return <TouchableOpacity style={{ width: BOX_SIZE, height: BOX_SIZE, marginHorizontal: 4, marginVertical: 4, backgroundColor: '#263154', borderRadius: 5, overflow: 'hidden' }}
                                        onPress={() => { _dialogShow(index); }}>
                                        <FastImage source={{ uri: Config.SERVER_URL + item.file_nm }}
                                            style={{ width: BOX_SIZE, height: BOX_SIZE, overflow: 'hidden' }}
                                            resizeMode='cover'></FastImage>
                                    </TouchableOpacity>
                                }}
                            />
                        </View>
                        {/* </ScrollView> */}
                    </View>
                )
            }


            <DialogPhoto
                _modalCb={_dialogCallBack}
                isModalOpen={isDialogOpen}
                dialogImgIdx={dialogImgIdx}
                arrAddImage={arrAddImage}
            />
        </SafeAreaView >
    );

}

const styles = StyleSheet.create({
    notiWrap: {
        width: '100%',
        alignItems: 'center',
    },
});

export default PicList;