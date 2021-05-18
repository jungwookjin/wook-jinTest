import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import { RootState } from '../components/redux/rootReducer'
import * as ITF from '../constants/Interface'
import Loader from "../components/Loader"
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";



const Canvas = () => {
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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ff00ff' }}>
            {
                loading ? (<Loader />) : (

                    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
                        keyboardShouldPersistTaps='handled'>

                    </ScrollView>
                )
            }
        </SafeAreaView >
    );

}

const styles = StyleSheet.create({
});

export default Canvas;