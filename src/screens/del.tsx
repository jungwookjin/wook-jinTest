import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, TextInput, Text, Image, Alert, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import { RootState } from '../components/redux/rootReducer'
import Loader from "../components/Loader"
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import CustomHeader from "../components/CustomHeader";



const MyInfo = () => {
    const navigation = useNavigation();
    const { rxLoginInfo } = useSelector((state: RootState) => state.rxLoginInfo, (prev, next) => { return prev.rxLoginInfo === next.rxLoginInfo; })
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        async function fetchData() { }
        fetchData();
    }, []);


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgNavy }}>
            {
                loading ? (<Loader />) : (
                    <View style={{ flex: 1, width: Layout.window.width }}>
                        <CustomHeader navigation={navigation} isBackBtn={true} title={'내 정보'} themeColor={'#ffffff'} />

                        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} keyboardShouldPersistTaps='handled' style={{ width: Layout.window.width }}>

                            <TouchableOpacity style={{ marginTop: 5, marginBottom: 20 }}>
                                <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={require('../img/temp_user_profile.png')} resizeMode='cover' />
                                <Image style={{ width: 34, height: 34, position: 'absolute', right: 0, bottom: 0 }} source={require('../img/ic_addpic_color.png')} resizeMode='cover' />
                            </TouchableOpacity>

                            <View style={styles.textWrap}>
                                <Text allowFontScaling={false} style={styles.textTitle}>이름</Text>
                                <TextInput
                                    style={styles.tiBox}
                                    autoCapitalize='none'
                                    placeholder={`입력해주세요`}
                                    placeholderTextColor={Colors.baseTextLightGray}
                                    value={name}
                                    onChangeText={(text) => setName(text)} />
                            </View>

                            <View style={styles.textWrap}>
                                <Text allowFontScaling={false} style={styles.textTitle}>전화번호</Text>
                                <TextInput
                                    style={styles.tiBox}
                                    autoCapitalize='none'
                                    placeholder={`입력해주세요`}
                                    placeholderTextColor={Colors.baseTextLightGray}
                                    value={name}
                                    onChangeText={(text) => setName(text)} />
                            </View>

                            <View style={styles.textWrap}>
                                <Text allowFontScaling={false} style={styles.textTitle}>생년월일</Text>
                                <TextInput
                                    style={styles.tiBox}
                                    autoCapitalize='none'
                                    placeholder={`입력해주세요`}
                                    placeholderTextColor={Colors.baseTextLightGray}
                                    value={name}
                                    onChangeText={(text) => setName(text)} />
                            </View>


                            <View style={styles.textWrap}>
                                <Text allowFontScaling={false} style={styles.textTitle}>성별</Text>
                                <TextInput
                                    style={styles.tiBox}
                                    autoCapitalize='none'
                                    placeholder={`입력해주세요`}
                                    placeholderTextColor={Colors.baseTextLightGray}
                                    value={name}
                                    onChangeText={(text) => setName(text)} />
                            </View>


                            <View style={styles.textWrap}>
                                <Text allowFontScaling={false} style={styles.textTitle}>주소</Text>
                                <TextInput
                                    style={styles.tiBox}
                                    autoCapitalize='none'
                                    placeholder={`입력해주세요`}
                                    placeholderTextColor={Colors.baseTextLightGray}
                                    value={name}
                                    onChangeText={(text) => setName(text)} />
                            </View>


                            <View style={styles.textWrap}>
                                <Text allowFontScaling={false} style={styles.textTitle}>상세주소</Text>
                                <TextInput
                                    style={styles.tiBox}
                                    autoCapitalize='none'
                                    placeholder={`입력해주세요`}
                                    placeholderTextColor={Colors.baseTextLightGray}
                                    value={name}
                                    onChangeText={(text) => setName(text)} />
                            </View>


                            <View style={styles.textWrap}>
                                <Text allowFontScaling={false} style={styles.textTitle}>학교</Text>
                                <TextInput
                                    style={styles.tiBox}
                                    autoCapitalize='none'
                                    placeholder={`입력해주세요`}
                                    placeholderTextColor={Colors.baseTextLightGray}
                                    value={name}
                                    onChangeText={(text) => setName(text)} />
                            </View>
                        </ScrollView>
                    </View>
                )
            }
        </SafeAreaView >
    );

}

const styles = StyleSheet.create({
    textWrap: {
        width: 300,
        alignItems: 'center',
        paddingVertical: 5,
        backgroundColor: '#FFFFFF',
        marginTop: 15,
        borderRadius: 16,
        flexDirection: 'row'
    },
    textTitle: {
        color: Colors.defaultText, fontSize: Layout.fsSM, marginLeft: 15, width: 66, fontWeight: 'bold'
    },
    tiBox: {
        flex: 1, height: 38, padding: 0, margin: 0, fontSize: Layout.fsSM, color: Colors.defaultText
    }
});

export default MyInfo;