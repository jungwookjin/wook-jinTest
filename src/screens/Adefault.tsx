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



const MyInfo = () => {
    const navigation = useNavigation();
    const { rxLoginInfo } = useSelector((state: RootState) => state.rxLoginInfo, (prev, next) => { return prev.rxLoginInfo === next.rxLoginInfo; }
    )
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {    }
        fetchData();
    }, []);


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgNavy }}>
            {
                loading ? (<Loader />) : (
                    <View style={{ flex: 1, width: Layout.window.width }}>
                        <CustomHeader navigation={navigation} isBackBtn={true} title={'학원 관리'} themeColor={'#ffffff'}/>

                        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} keyboardShouldPersistTaps='handled'>
                            
                        </ScrollView>
                    </View>
                )
            }
        </SafeAreaView >
    );

}

const styles = StyleSheet.create({
});

export default MyInfo;