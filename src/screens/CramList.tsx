import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, ImageBackground, Text, Image, Alert,TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import { RootState } from '../components/redux/rootReducer'
import * as ITF from '../constants/Interface'
import Loader from "../components/Loader"
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import CustomHeader from "../components/CustomHeader";



const CramList = () => {
    const navigation = useNavigation();
    const { rxLoginInfo } = useSelector((state: RootState) => state.rxLoginInfo, (prev, next) => { return prev.rxLoginInfo === next.rxLoginInfo; }
    )
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            console.log("rxLoginInfo : " + JSON.stringify(rxLoginInfo))
        }
        fetchData();
    }, []);


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgNavy }}>
            {
                loading ? (<Loader />) : (
                    <View style={{ flex: 1, width: Layout.window.width }}>
                        <CustomHeader navigation={navigation} isBackBtn={true} title={'학원 관리'} themeColor={'#ffffff'}/>

                        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} keyboardShouldPersistTaps='handled'>
                            {
                                ['', '', '', '', '', '', ''].map((item, idx) => (
                                    <ImageBackground key={idx} source={require('../img/temp_cram_img.png')} resizeMode='cover'
                                        style={{ width: Layout.window.widthFix, height: 160, borderRadius: 20, overflow: 'hidden', marginVertical: 12, flexDirection: 'column' }}>

                                        <TouchableOpacity style={{ height: 124, width: Layout.window.widthFix }} onPress={() => { navigation.navigate({ name: 'CramDetail', params: {} }); }}></TouchableOpacity>

                                        <View style={{ width: '100%', height: 36, paddingHorizontal: 15, backgroundColor: 'rgba(0,0,0,0.6)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Text allowFontScaling={false} numberOfLines={1} style={{ color: '#ffffff', fontSize: Layout.fsM }}>S 코딩 아카데미</Text>

                                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => { Alert.alert('', '전화 걸기') }}>
                                                <Image style={{ width: 14, height: 14 }}
                                                    source={require('../img/ic_call.png')}
                                                    resizeMode='contain' />
                                                <Text allowFontScaling={false} numberOfLines={1} style={{ color: '#ffffff', fontSize: Layout.fsS }}> 전화 걸기</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </ImageBackground>
                                ))
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