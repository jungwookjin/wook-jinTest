import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, ImageBackground, Text, Image, Alert, TouchableOpacity, StatusBar } from "react-native";
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import { useSelector } from 'react-redux';
import { RootState } from '../components/redux/rootReducer';
import * as ITF from '../constants/Interface';
import * as SG from '../constants/Signature';
import * as MyUtil from "../constants/MyUtil";
import Loader from "../components/Loader";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import CustomHeader from "../components/CustomHeader";
import ModalBottom from "../components/ModalBottom"



const InfoUpdate = () => {
    const route = useRoute<RouteProp<SG.StackParams, 'InfoUpdate'>>();
    const navigation = useNavigation();
    const { rxLoginInfo } = useSelector((state: RootState) => state.rxLoginInfo, (prev, next) => { return prev.rxLoginInfo === next.rxLoginInfo; });
    const [loading, setLoading] = useState(false);
    const [isJoin, setIsJoin] = useState<boolean>(route.params.isJoin);
    const [profileImg, setProfileImg] = useState<any>(null);
    const [profileImgError, setProfileImgError] = useState<boolean>(false);
    const [isModalBottom, setIsModalBottom] = useState<boolean>(false);

    useEffect(() => {
        async function fetchData() { }
        fetchData();
    }, []);


    // 다이얼로그에서 넘어오는 정보
    const _modalBottomCb = useCallback(async (isOk, jData) => {
        setIsModalBottom(false)

        setTimeout(async () => {
            if (isOk) {
                if (!(await MyUtil._checkCameraPermission())) {
                    return Alert.alert("권한 필요", "허용되지 않은 권한이 있습니다.\n설정에서 모든 권한을 허용해주세요.");
                }

                if (jData.isCamera) {
                    ImagePicker.openCamera({
                        width: 600,
                        height: 600,
                        cropping: true,
                        freeStyleCropEnabled: false,
                        avoidEmptySpaceAroundImage: false,
                        includeBase64: true,
                        compressImageMaxWidth: 1000,
                        compressImageMaxHeight: 1000,
                        mediaType: 'photo'
                    }).then((image: any) => {
                        setProfileImg(image)
                        setProfileImgError(false)

                    }).catch((error: any) => {
                        MyUtil._consoleLog("imagepicker error : " + JSON.stringify(error.code))
                        try {
                            if ((JSON.stringify(error.message) == `"Cannot find image data"`)) {
                                Alert.alert("error", "이미지를 찾을 수 없습니다!\n클라우드가 아닌 휴대폰 갤러리에서 이미지를 선택해주세요!")
                            }
                        } catch (e) { console.log("pickererror : " + e) }
                    });

                } else {
                    ImagePicker.openPicker({
                        width: 600,
                        height: 600,
                        cropping: true,
                        freeStyleCropEnabled: false,
                        avoidEmptySpaceAroundImage: false,
                        includeBase64: true,
                        compressImageMaxWidth: 1000,
                        compressImageMaxHeight: 1000,
                        mediaType: 'photo'
                    }).then(async (image: any) => {
                        setProfileImg(image)
                        setProfileImgError(false)

                    }).catch((error: any) => {
                        MyUtil._consoleLog("imagepicker error : " + JSON.stringify(error.code))
                        try {
                            if ((JSON.stringify(error.message) == `"Cannot find image data"`)) {
                                Alert.alert("error", "이미지를 찾을 수 없습니다!\n클라우드가 아닌 휴대폰 갤러리에서 이미지를 선택해주세요!")
                            }
                        } catch (e) { console.log("pickererror : " + e) }
                    });
                }
            }
        }, 500)
    }, [])






    // ******************************************
    let profileSource: any = {}
    if (profileImg !== null) {
        profileSource.uri = 'data:' + profileImg.mime + ';base64,' + profileImg.data; // 이미지 피커 선택된 이미지
    } else {
        profileSource = require('../img/ic_circle_profile.png');
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgNavy }}>
            <View style={{ width: Layout.window.widthFix, flex: 1 }}>
                <StatusBar barStyle="light-content" backgroundColor={Colors.bgNavy} />
                {
                    loading ? (<Loader />) : (
                        <View style={{ flex: 1, width: Layout.window.width }}>
                            <CustomHeader navigation={navigation} isBackBtn={true} title={isJoin ? '회원 가입' : '정보 수정'} themeColor={'#ffffff'} />

                            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} keyboardShouldPersistTaps='handled'>

                                <TouchableOpacity style={{ width: 120, height: 120, marginTop: 10 }}
                                    onPress={() => { setIsModalBottom(true) }}>
                                    <Image
                                        style={{ width: 120, height: 120, borderRadius: 120 }}
                                        source={profileSource}
                                        resizeMode='contain' />
                                    <Image
                                        style={{ width: 36, height: 36, borderRadius: 18, position: 'absolute', bottom: 8, right: 6 }}
                                        source={require('../img/btn_circle_camera.png')}
                                        resizeMode='contain' />
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    )
                }
            </View>



            <ModalBottom isModalOpen={isModalBottom} _modalCb={_modalBottomCb} />
        </SafeAreaView >
    );

}

const styles = StyleSheet.create({
});

export default InfoUpdate;