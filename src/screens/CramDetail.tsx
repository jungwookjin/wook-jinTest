import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, ImageBackground, Text, TouchableOpacity, Image, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import { RootState } from '../components/redux/rootReducer'
import * as ITF from '../constants/Interface'
import Loader from "../components/Loader"
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import CustomHeader from "../components/CustomHeader";



const CramDetail = () => {
    const navigation = useNavigation();
    const { rxLoginInfo } = useSelector((state: RootState) => state.rxLoginInfo, (prev, next) => { return prev.rxLoginInfo === next.rxLoginInfo; })
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() { console.log("rxLoginInfo : " + JSON.stringify(rxLoginInfo)) }
        fetchData();
    }, []);


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgNavy }}>
            {
                loading ? (<Loader />) : (
                    <View style={{ flex: 1, width: Layout.window.width }}>
                        <ImageBackground source={require('../img/temp_cram_img.png')} resizeMode='cover'
                            style={{ width: Layout.window.width, height: Layout.window.width * (10 / 16) }}>
                            <CustomHeader navigation={navigation} isBackBtn={true} title={'S 코딩 아카데미'} themeColor={'#ffffff'}/>

                            <View style={{ width: '100%', paddingVertical: 10, paddingHorizontal: 15, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'space-between', position: 'absolute', bottom: 0 }}>
                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => { Alert.alert('', '전화 걸기') }}>
                                    <Image style={{ width: 14, height: 14 }}
                                        source={require('../img/ic_call.png')}
                                        resizeMode='contain' />
                                    <Text allowFontScaling={false} numberOfLines={1} style={{ color: '#ffffff', fontSize: Layout.fsS, marginLeft: 8 }}>010-9184-9185</Text>
                                </TouchableOpacity>

                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                                    <Image style={{ width: 14, height: 14 }}
                                        source={require('../img/ic_loc.png')}
                                        resizeMode='contain' />
                                    <Text allowFontScaling={false} numberOfLines={2} style={{ color: '#ffffff', fontSize: Layout.fsS, marginLeft: 8 }}>부산 광역시 부산진구 고동골로 29, 베스티움 상가 220호</Text>
                                </View>
                            </View>
                        </ImageBackground>

                        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} keyboardShouldPersistTaps='handled'>

                            <View style={{ width: Layout.window.widthFix,marginTop:10 }}>
                                <Text allowFontScaling={false} numberOfLines={1} style={{ color: '#ffffff', fontSize: Layout.fsM, fontWeight: 'bold', marginTop: 20 }}>수강중인 수업</Text>
                            </View>

                            {
                                ['', '', ''].map((item, idx) => (
                                    <View key={idx} style={{ width: Layout.window.widthFix, paddingVertical: 12, paddingHorizontal: 14, backgroundColor: '#ffffff', borderRadius: 18, marginTop: 13, flexDirection: 'row', alignItems: 'center' }}>
                                        <Text allowFontScaling={false} numberOfLines={1} style={{ color: Colors.defaultText, fontSize: Layout.fsSM, flex: 1 }}>(김정훈) HTML 코딩 기초</Text>

                                        <TouchableOpacity style={{ padding: 5 }}>
                                            <Image style={{ width: 14, height: 14 }}
                                                source={require('../img/ic_arrow_b_s.png')}
                                                resizeMode='contain' />
                                        </TouchableOpacity>
                                    </View>
                                ))
                            }


                            <View style={{ width: Layout.window.widthFix,marginTop:20 }}>
                                <Text allowFontScaling={false} numberOfLines={1} style={{ color: '#ffffff', fontSize: Layout.fsM, fontWeight: 'bold', marginTop: 20 }}>수강 가능한 수업</Text>
                            </View>

                            {
                                ['', '', ''].map((item, idx) => (
                                    <View key={idx} style={{ width: Layout.window.widthFix, paddingVertical: 12, paddingHorizontal: 14, backgroundColor: '#ffffff', borderRadius: 18, marginTop: 11, flexDirection: 'row', alignItems: 'center' }}>
                                        <Text allowFontScaling={false} numberOfLines={1} style={{ color: Colors.defaultText, fontSize: Layout.fsSM, flex: 1 }}>(김정훈) HTML 코딩 기초</Text>

                                        <TouchableOpacity style={{ padding: 5 }}>
                                            <Image style={{ width: 14, height: 14 }}
                                                source={require('../img/ic_arrow_b_s.png')}
                                                resizeMode='contain' />
                                        </TouchableOpacity>
                                    </View>
                                ))
                            }

                            <View style={{width:1,height:50}}></View>
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