import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, } from "react-native";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import * as MyUtil from "../constants/MyUtil";


const CramClassItem = ({ item }: any) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <View style={{ width: Layout.window.widthFix, paddingVertical: 12, paddingHorizontal: 14, backgroundColor: '#ffffff', borderRadius: 18, marginTop: 13, alignItems: 'center' }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Text allowFontScaling={false} numberOfLines={1} style={{ color: Colors.defaultText, fontSize: Layout.fsSM, flex: 1 }}>({item.p_name}) {item.subj_nm}</Text>

                <TouchableOpacity style={{ padding: 5 }} onPress={() => { setIsOpen(!isOpen) }}>
                    <Image style={{ width: 14, height: 14, transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }}
                        source={require('../img/ic_arrow_b_s.png')}
                        resizeMode='contain' />
                </TouchableOpacity>
            </View>

            {
                isOpen && (
                    <View style={{ width: '100%', paddingTop: 5, paddingLeft: 7 }}>
                        {item.mon1 === 'y' && <Text allowFontScaling={false} numberOfLines={1} style={{ color: Colors.baseTextGray, fontSize: Layout.fsSM, flex: 1 }}>일 : {item.mon1_start_time}~{item.mon1_end_time}</Text>}
                        {item.mon2 === 'y' && <Text allowFontScaling={false} numberOfLines={1} style={{ color: Colors.baseTextGray, fontSize: Layout.fsSM, flex: 1 }}>월 : {item.mon2_start_time}~{item.mon2_end_time}</Text>}
                        {item.mon3 === 'y' && <Text allowFontScaling={false} numberOfLines={1} style={{ color: Colors.baseTextGray, fontSize: Layout.fsSM, flex: 1 }}>화 : {item.mon3_start_time}~{item.mon3_end_time}</Text>}
                        {item.mon4 === 'y' && <Text allowFontScaling={false} numberOfLines={1} style={{ color: Colors.baseTextGray, fontSize: Layout.fsSM, flex: 1 }}>수 : {item.mon4_start_time}~{item.mon4_end_time}</Text>}
                        {item.mon5 === 'y' && <Text allowFontScaling={false} numberOfLines={1} style={{ color: Colors.baseTextGray, fontSize: Layout.fsSM, flex: 1 }}>목 : {item.mon5_start_time}~{item.mon5_end_time}</Text>}
                        {item.mon6 === 'y' && <Text allowFontScaling={false} numberOfLines={1} style={{ color: Colors.baseTextGray, fontSize: Layout.fsSM, flex: 1 }}>금 : {item.mon6_start_time}~{item.mon6_end_time}</Text>}
                        {item.mon7 === 'y' && <Text allowFontScaling={false} numberOfLines={1} style={{ color: Colors.baseTextGray, fontSize: Layout.fsSM, flex: 1 }}>토 : {item.mon7_start_time}~{item.mon7_end_time}</Text>}
                    </View>
                )
            }
        </View>
    );
}
export default CramClassItem;