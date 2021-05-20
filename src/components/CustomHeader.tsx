import React, { useState, useEffect, useLayoutEffect, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from "react-native";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import { RootState } from '../components/redux/rootReducer'
import { useDispatch, useSelector } from 'react-redux'
import * as MyUtil from "../constants/MyUtil";
import * as SG from '../constants/Signature'


const CustomHeader = ({ navigation, isBackBtn, title }: SG.HeaderParams) => {


    return (
        <SafeAreaView>
            <View style={{ width: Layout.window.width, height: Layout.window.topBarHeight, flexDirection: 'row', justifyContent: 'space-between', borderColor: Colors.grayLine }}>
                <View style={{ flex: 1, height: Layout.window.topBarHeight, alignItems: 'center', flexDirection: 'row' }}>
                    {
                        isBackBtn && (
                            <TouchableOpacity onPress={() => { navigation.goBack(); }} style={{ padding: 5, marginLeft: 1 }}>
                                <Image
                                    source={require('../img/btn_back_arrow2.png')}
                                    style={{ width: 26, height: 26, tintColor: "#ffffff" }}
                                    resizeMode='contain' />
                            </TouchableOpacity>
                        )
                    }

                    {
                        title && (
                            <Text allowFontScaling={false} style={{ fontSize: Layout.fsM, color: "#ffffff", marginLeft: 0 }}>{title}</Text>
                        )
                    }
                </View>

                <View style={{ height: Layout.window.topBarHeight, justifyContent: 'flex-end', alignItems: 'center', paddingRight: 8, flexDirection: 'row' }}>

                </View>
            </View>
        </SafeAreaView>
    );
}
export default CustomHeader;


const styles = StyleSheet.create({
    viewTopBar: {
        width: '100%',
        height: Layout.window.topBarHeight,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderBottomWidth: 2,
        // borderColor: Colors.grayLine,
        backgroundColor: Colors.defaultBg
    },
    viewTopBarLeft: {
        height: Layout.window.topBarHeight,
        justifyContent: 'center',
    },
    viewTopBarCenter: {
        flex: 1.5,
        height: Layout.window.topBarHeight,
        justifyContent: 'center',
        paddingLeft: 5
    },
    viewTopBarRight: {
        flex: 1,
        height: Layout.window.topBarHeight,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 10,
        flexDirection: 'row'
    },
});
