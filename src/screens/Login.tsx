import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, View, ImageBackground, Image, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux'
import { BlurView } from "@react-native-community/blur";
import allActions from '../components/redux/allActions'
import { RootState } from '../components/redux/rootReducer'
import Loader from "../components/Loader"
import Layout from "../constants/Layout";



const Login = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        async function fetchData() {

        }
        fetchData();
    }, []);


    return (
        <ImageBackground source={require('../img/bg_blue.png')} resizeMode='cover'
            style={{ width: Layout.window.width, flex: 1 }}>
            <SafeAreaView style={{ flex: 1, width: Layout.window.width }}>
                {
                    loading ? (<Loader />) : (
                        // <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', width: Layout.window.width }} keyboardShouldPersistTaps='handled'>
                        <View style={{ width: Layout.window.width, flex: 1, alignItems: 'center' }}>

                            <View style={styles.blurShadowWrap}>
                                <View style={styles.blurRadiusWrap}>
                                    <BlurView
                                        style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
                                        blurType="xlight"
                                        blurAmount={10}
                                        reducedTransparencyFallbackColor="white"
                                    />

                                    <TouchableOpacity style={{ width: Layout.window.width - 90, height: (Layout.window.width - 90) / 6, marginVertical: 5 }}>
                                        <Image style={{ width: Layout.window.width - 90, height: (Layout.window.width - 90) / 6 }}
                                            source={require('../img/btn_login_kakao.png')}
                                            resizeMode='contain' />
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ width: Layout.window.width - 90, height: (Layout.window.width - 90) / 6, marginVertical: 5 }}>
                                        <Image style={{ width: Layout.window.width - 90, height: (Layout.window.width - 90) / 6 }}
                                            source={require('../img/btn_login_google.png')}
                                            resizeMode='contain' />
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ width: Layout.window.width - 90, height: (Layout.window.width - 90) / 6, marginVertical: 5 }}>
                                        <Image style={{ width: Layout.window.width - 90, height: (Layout.window.width - 90) / 6 }}
                                            source={require('../img/btn_login_apple.png')}
                                            resizeMode='contain' />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        // </ScrollView>
                    )
                }
            </SafeAreaView >
        </ImageBackground>
    );

}

const styles = StyleSheet.create({
    blurShadowWrap: {
        position: 'absolute', bottom: 10, width: Layout.window.widthFix, height: 200, borderRadius: 20,
        ...Platform.select({
            ios: {
                shadowColor: "rgb(50, 50, 50)",
                shadowOpacity: 0.3,
                shadowRadius: 3,
                shadowOffset: {
                    height: 1,
                    width: 1
                }
            },
            android: {
                elevation: 2
            }
        })
    },
    blurRadiusWrap: {
        width: '100%', height: '100%', overflow: 'hidden', justifyContent: 'center', alignItems: 'center', borderRadius: 20
    }
});

export default Login;