import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, View, ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux'
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
            <SafeAreaView style={{ flex: 1 }}>
                {
                    loading ? (<Loader />) : (

                        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', width: Layout.window.width }} keyboardShouldPersistTaps='handled'>


                        </ScrollView>
                    )
                }
            </SafeAreaView >
        </ImageBackground>
    );

}

const styles = StyleSheet.create({
});

export default Login;