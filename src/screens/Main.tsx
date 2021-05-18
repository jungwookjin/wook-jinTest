import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, ImageBackground, Text, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import { RootState } from '../components/redux/rootReducer'
import * as ITF from '../constants/Interface'
import CustomHeader from "../components/CustomHeader";
import Loader from "../components/Loader"
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import { TouchableOpacity } from "react-native-gesture-handler";



const Main = () => {
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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            {
                loading ? (<Loader />) : (
                    <ImageBackground source={require('../img/bg_blue.png')} resizeMode='cover'
                        style={{ width: Layout.window.width, flex: 1 }}>
                        <View style={{ width: Layout.window.width, flex: 1 }}>
                            {/* <CustomHeader navigation={navigation} isBackBtn={false} /> */}
                            <View style={{ width: Layout.window.width, height: 54, backgroundColor: '#ffffff', flexDirection: 'row', alignItems: 'center' }}>
                                <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsL, color: Colors.defaultText, marginLeft: 15, fontWeight: 'bold' }}>김정훈</Text>
                                <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsSM, color: Colors.skyBlue, marginLeft: 3 }}>학생</Text>

                                <View style={{ flex: 1 }}></View>

                                <TouchableOpacity style={{ marginRight: 10 }}>
                                    <Image style={{ width: 25, height: 25 }}
                                        source={require('../img/btn_noti.png')} resizeMode='contain' />
                                </TouchableOpacity>

                                <TouchableOpacity style={{ marginRight: 15 }}>
                                    <Image style={{ width: 32, height: 32 }}
                                        source={require('../img/btn_menu.png')} resizeMode='contain' />
                                </TouchableOpacity>
                            </View>

                            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', width: Layout.window.width, paddingBottom: 40 }} keyboardShouldPersistTaps='handled'>

                            </ScrollView>
                        </View>
                    </ImageBackground>
                )
            }
        </SafeAreaView >
    );

}

const styles = StyleSheet.create({
});

export default Main;