import React, { } from "react";
import { View, Text, TouchableOpacity, Image, } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import * as MyUtil from "../constants/MyUtil";


const NoticeItem = ({ item }: any) => {
    const navigation = useNavigation();


    return (
        <TouchableOpacity style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { navigation.navigate({ name: 'Notidetail', params: { detailItem: item } }); }}>
            <View style={{ width: '90%', flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 0.7, borderBottomColor: '#dbdbdb' }}>
                <Image style={{ width: 20, height: 20 }} source={require('../img/ic_noti2.png')} resizeMode='contain' />

                <View style={{ flex: 1, paddingLeft: 7 }}>
                    <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsS, color: Colors.pastelPurple }}>{item.reg_date} to {MyUtil._codeToKor(item.target_type, 'target')}</Text>
                    <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsM, color: '#ffffff', marginTop: 4 }}>{item.title}</Text>
                    <Text allowFontScaling={false} numberOfLines={1} style={{ fontSize: Layout.fsS, color: '#dbdbdb', marginTop: 2 }}>{item.contents}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
export default NoticeItem;