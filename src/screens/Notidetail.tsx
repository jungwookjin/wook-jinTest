import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, Platform, Text, Image, Alert, TouchableOpacity } from "react-native";
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import AutoHeightImage from 'react-native-auto-height-image';
import { useSelector } from 'react-redux';
import { RootState } from '../components/redux/rootReducer';
import Loader from "../components/Loader";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import CustomHeader from "../components/CustomHeader";
import * as MyUtil from "../constants/MyUtil";
import * as SG from '../constants/Signature';
import Config from "../constants/Config";



const Notidetail = () => {
    const route = useRoute<RouteProp<SG.StackParams, 'COMMON'>>();
    const navigation = useNavigation();
    const { rxLoginInfo } = useSelector((state: RootState) => state.rxLoginInfo, (prev, next) => { return prev.rxLoginInfo === next.rxLoginInfo; })
    const [loading, setLoading] = useState(false);
    const [detailItem, setDetailItem] = useState<any>(route.params.detailItem);

    useEffect(() => {
        async function fetchData() { }
        fetchData();
    }, []);


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgNavy }}>
            {
                loading ? (<Loader />) : (
                    <View style={{ flex: 1, width: Layout.window.width, justifyContent: 'center', alignItems: 'center' }}>
                        <CustomHeader navigation={navigation} isBackBtn={true} title={'공지 상세'} themeColor={'#ffffff'} />

                        <View style={styles.notiWrap}>
                            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} keyboardShouldPersistTaps='handled'>
                                <View style={{ width: Layout.window.widthFix, alignItems: 'center' }}>

                                    <View style={{ width: '100%', flexDirection: 'row', paddingTop: 10, paddingLeft: 15 }}>
                                        <Image style={{ width: 20, height: 20 }} source={require('../img/ic_noti2.png')} resizeMode='contain' />

                                        <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsS, color: Colors.pastelPurple, marginLeft: 7 }}>{detailItem.reg_date} to {MyUtil._codeToKor(detailItem.target_type, 'target')}</Text>
                                    </View>

                                    <Text allowFontScaling={false} style={{ width: '100%', paddingLeft: 15, paddingRight: 15, fontSize: Layout.fsM, color: Colors.defaultText, marginTop: 5, fontWeight: 'bold' }}>{detailItem.title}</Text>
                                    <Text allowFontScaling={false} style={{ width: '100%', paddingLeft: 15, paddingRight: 15, fontSize: Layout.fsSM, color: Colors.baseTextGray, marginTop: 15, lineHeight: 19 }}>{detailItem.contents}</Text>


                                    <View style={{ width: Layout.window.widthFix - 30, marginTop: 30 }}>
                                        <AutoHeightImage
                                            width={Layout.window.widthFix * 4 / 5}
                                            style={{borderRadius:10}}
                                            source={{ uri: Config.SERVER_URL + detailItem.file_nm }}
                                        />
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                )
            }
        </SafeAreaView >
    );

}

const styles = StyleSheet.create({
    notiWrap: {
        flex: 1,
        marginTop: 10,
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

export default Notidetail;