import React, { useState, useEffect, useLayoutEffect, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from "react-native";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import * as MyUtil from "../constants/MyUtil";
import * as SG from '../constants/Signature'


const NoticeItem = ({ }) => {


    return (
        <View style={{ width: '90%', paddingVertical: 15, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: Colors.grayLine }}>
            <Image style={{ width: 20, height: 20 }} source={require('../img/ic_noti2.png')} resizeMode='contain' />

            <View style={{ flex: 1, paddingLeft: 7 }}>
                <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsS, color: Colors.pastelPurple }}>2021-05-11 to 모두</Text>
                <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsM, color: Colors.defaultText, marginTop: 4 }}>5월 12일 부처님 오신날은 휴원 합니다.</Text>
                <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsS, color: Colors.baseTextGray, marginTop: 2 }}>5월은 유독 쉬는 날이 많은 것 같습니다. :) 잘 쉬시고 5월 …</Text>
            </View>
        </View>
    );
}
export default NoticeItem;