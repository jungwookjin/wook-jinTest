import React, { useState, useEffect, useLayoutEffect, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from "react-native";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import * as MyUtil from "../constants/MyUtil";
import * as SG from '../constants/Signature'


const NoticeItem = ({ item }: any) => {


    return (
        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: '90%', flexDirection: 'row', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: Colors.grayLine }}>
                <Image style={{ width: 20, height: 20 }} source={require('../img/ic_noti2.png')} resizeMode='contain' />

                <View style={{ flex: 1, paddingLeft: 7 }}>
                    <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsS, color: Colors.pastelPurple }}>{item.reg_date} to {MyUtil._codeToKor(item.target_type, 'target')}</Text>
                    <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsM, color: Colors.defaultText, marginTop: 4 }}>{item.title}</Text>
                    <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsS, color: Colors.baseTextGray, marginTop: 2 }}>{item.contents}</Text>
                </View>
            </View>
        </View>
    );
}
export default NoticeItem;