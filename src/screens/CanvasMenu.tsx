import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux'
import allActions from '../components/redux/allActions'
import {RootState} from '../components/redux/rootReducer'
import Loader from "../components/Loader"
import Layout from "../constants/Layout";



const CanvasMenu = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        async function fetchData() {
            // 리덕스 셋
            dispatch(allActions.setRxLoginInfo({ uid: "123", name: "KKK", age: 123 }))
        }
        fetchData();
    }, []);


    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                loading ? (<Loader />) : (

                    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
                        keyboardShouldPersistTaps='handled'>

                        <TouchableOpacity onPress={() => { navigation.navigate('Canvas', { topTitle: "사진 꾸미기" }) }}
                            style={{ marginTop: 50, width: Layout.window.width - 60, height: 40, backgroundColor: '#ff00ff' }}></TouchableOpacity>
                    </ScrollView>
                )
            }
        </SafeAreaView >
    );

}

const styles = StyleSheet.create({
});

export default CanvasMenu;