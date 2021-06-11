import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, ImageBackground, Text, Image, Alert, TouchableOpacity, StatusBar, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../components/redux/rootReducer';
import * as ServerApi from "../constants/ServerApi";
import * as MyAsyncStorage from "../constants/MyAsyncStorage";
import * as ITF from '../constants/Interface';
import * as SG from '../constants/Signature';
import * as MyUtil from "../constants/MyUtil";
import Config from "../constants/Config";
import Loader from "../components/Loader";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import CST from '../constants/constants';
import CustomHeader from "../components/CustomHeader";
import ModalBottom from "../components/ModalBottom";
import ModalBottomSelect from "../components/ModalBottomSelect";
import allActions from "../components/redux/allActions"
import Sprintf from 'sprintf-js';
const sprintf = Sprintf.sprintf;




const InfoUpdate = () => {
    const dispatch = useDispatch()
    const route = useRoute<RouteProp<SG.StackParams, 'InfoUpdate'>>();
    const navigation = useNavigation();
    const { rxLoginInfo } = useSelector((state: RootState) => state.rxLoginInfo, (prev, next) => { return prev.rxLoginInfo === next.rxLoginInfo; });
    const [loading, setLoading] = useState(false);
    const [isJoin, setIsJoin] = useState<boolean>(route.params.isJoin);
    const [uniq_key, setUniq_key] = useState<any>(route.params.uniq_key);
    const [easy_type, setEasy_type] = useState<any>(route.params.easy_type);
    const [profileImg, setProfileImg] = useState<any>(null);
    const [profileImgError, setProfileImgError] = useState<boolean>(false);
    const [isModalBottom, setIsModalBottom] = useState<boolean>(false);
    const [isModalSelect, setIsModalSelect] = useState<boolean>(false);
    const [isDateDialog, setIsDateDialog] = useState<boolean>(false)
    const [name, setName] = useState<string>('');
    const [gender, setGender] = useState("");
    const [birth, setBirth] = useState("");
    const [phone, setPhone] = useState("");
    const [school, setSchool] = useState("");
    const [arrMenuName, setArrMenuName] = useState<any>([]);


    useEffect(() => {
        async function fetchData() {
            if (!isJoin) {
                setName(rxLoginInfo.name);
                setBirth(rxLoginInfo.res_date);
                setGender(rxLoginInfo.gender === CST.MALE ? '남자' : '여자');
                setPhone(rxLoginInfo.handphone);
            }
        }
        fetchData();
    }, []);


    const JoinStart = useCallback(async (getProfileImg, getName, getBirth, getGender, getPhone, getSchool) => {
        if (isJoin) {
            if (MyUtil._isNull(uniq_key)) { return Alert.alert('', '잘못된 접근입니다! (uniq_key null)') }
            if (MyUtil._isNull(easy_type)) { return Alert.alert('', '잘못된 접근입니다! (easy_type null)') }
            if (MyUtil._isNull(getProfileImg)) { return Alert.alert('', '사진을 등록해주세요!') }
        }
        if (MyUtil._isNull(getName)) { return Alert.alert('', '이름을 입력해주세요!') }
        if (MyUtil._isNull(getBirth)) { return Alert.alert('', '생년월일을 입력해주세요!') }
        if (MyUtil._isNull(getGender)) { return Alert.alert('', '성별을 입력해주세요!') }
        if (!MyUtil._isNum(getPhone)) { return Alert.alert('', '핸드폰번호는 숫자만 입력해주세요.') }

        const TimeStamp = Date.now();
        const formData = new FormData();

        if (isJoin) {
            formData.append('uniq_key', uniq_key);
            formData.append('easy_type', easy_type);
        } else {
            formData.append('u_id', rxLoginInfo.u_id);
        }
        formData.append('name', getName);
        formData.append('gender', getGender === '남자' ? CST.MALE : CST.FEMALE);
        formData.append('res_date', getBirth);
        formData.append('handphone', getPhone);
        formData.append('school', getSchool);
        formData.append('time_stamp', TimeStamp);

        if (getProfileImg !== null) {
            formData.append("img_profile", {
                name: "img_profile.jpg",
                type: getProfileImg.mime,
                uri: getProfileImg.path
            });
        }

        let result;
        if (isJoin) {
            result = await ServerApi._join(formData);
        } else {
            result = await ServerApi.m_app_info_u(formData);
        }
        if (result.IS_SUCCESS === true && result.DATA_RESULT.RSP_CODE === CST.DB_SUCSESS) {

            if (isJoin) {
                Alert.alert("", "정상적으로 가입이 완료되었습니다!");
                LoginStart(easy_type, uniq_key)


            } else {
                Alert.alert("", "정상적으로 정보 수정이 완료되었습니다!");

                // 로그인 정보 갱신
                await MyUtil._loginRenewal(dispatch, navigation);
                return navigation.goBack();
            }
        } else {
            MyUtil._alertMsg('JoinStart', result.DATA_RESULT)
        }
    }, [uniq_key, easy_type, isJoin, rxLoginInfo])


    const LoginStart = useCallback(async (easy_type, uniq_key) => {
        const result = await ServerApi._login(easy_type, uniq_key);
        if (result.IS_SUCCESS === true && result.DATA_RESULT.RSP_CODE === CST.DB_SUCSESS) {
            MyAsyncStorage._writeAsyncStorage(Config.AS_KEY_LOGIN_INFO, { easy_type, uniq_key });
            dispatch(allActions.setRxLoginInfo(result.DATA_RESULT))
            navigation.reset({ index: 0, routes: [{ name: 'Main', params: {} }] });

        } else {
            MyUtil._alertMsg('LoginStart', result.DATA_RESULT)
        }
    }, [])



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


    // 다이얼로그에서 넘어오는 정보
    const _modalSelectCb = useCallback(async (isOk, detailDt) => {
        setIsModalSelect(false)

        setTimeout(async () => {
            if (isOk) {
                if (detailDt.menuName === '남자') {
                    setGender('남자')
                } else if (detailDt.menuName === '여자') {
                    setGender('여자')
                }
            }
        }, 500)
    }, [])

    const _datePickerHandlerCancel = useCallback(() => {
        setIsDateDialog(false)

    }, [])

    const _datePickerHandler = (date: any) => {
        if (typeof (date) === 'undefined') { return }
        let strDate = sprintf("%04d-%02d-%02d", date.getFullYear(), date.getMonth() + 1, date.getDate());
        setIsDateDialog(false)
        setBirth(strDate);
    };




    // ******************************************

    let profileSource: any = {}
    if (profileImgError) {
        profileSource = require('../img/ic_circle_profile.png');
    } else {
        if (profileImg !== null) {
            profileSource.uri = 'data:' + profileImg.mime + ';base64,' + profileImg.data; // 이미지 피커 선택된 이미지
        } else {
            if (!MyUtil._isNull(rxLoginInfo.profile_img)) {
                profileSource.uri = Config.SERVER_URL + rxLoginInfo.profile_img; // 수정시 초기 이미지
            } else {
                profileSource.uri = "error"; // 추가시 아무것도 안뜨기때문에 에러 유도
            }
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgNavy }}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : undefined} enabled>
                <StatusBar barStyle="light-content" backgroundColor={Colors.bgNavy} />

                <View style={{ width: Layout.window.widthFix, flex: 1 }}>
                    {
                        loading ? (<Loader />) : (
                            <View style={{ flex: 1, width: Layout.window.width }}>
                                <CustomHeader navigation={navigation} isBackBtn={true} title={isJoin ? '회원 가입' : '정보 수정'} themeColor={'#ffffff'} />

                                <ScrollView style={{ flex: 1, width: Layout.window.width }} contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} keyboardShouldPersistTaps='handled'>

                                    <TouchableOpacity style={{ width: 120, height: 120, marginTop: 10, marginBottom: 25 }}
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


                                    <View style={styles.ipWrap}>
                                        <View style={styles.menuTitle}>
                                            <Text allowFontScaling={false} style={styles.menuTitleText}>이름</Text>
                                            <Text allowFontScaling={false} style={[styles.menuTitleText, { color: '#ff0000' }]}> *</Text>
                                        </View>

                                        <TextInput
                                            style={[styles.tiBox]}
                                            autoCapitalize='none'
                                            placeholder={`입력해주세요`}
                                            placeholderTextColor={Colors.baseTextLightGray}
                                            value={name}
                                            multiline={true}
                                            onChangeText={(text) => setName(text)} />
                                    </View>

                                    <TouchableOpacity style={styles.ipWrap} onPress={() => { setIsDateDialog(true) }}>
                                        <View style={styles.menuTitle}>
                                            <Text allowFontScaling={false} style={styles.menuTitleText}>생년월일</Text>
                                            <Text allowFontScaling={false} style={[styles.menuTitleText, { color: '#ff0000' }]}> *</Text>
                                        </View>

                                        <TextInput
                                            style={[styles.tiBox]}
                                            autoCapitalize='none'
                                            placeholder={`선택해주세요`}
                                            pointerEvents="none"
                                            editable={false}
                                            placeholderTextColor={Colors.baseTextLightGray}
                                            value={birth}
                                            multiline={true} />
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.ipWrap} onPress={() => {
                                        setArrMenuName(['남자', '여자'])
                                        setIsModalSelect(true)
                                    }}>
                                        <View style={styles.menuTitle}>
                                            <Text allowFontScaling={false} style={styles.menuTitleText}>성별</Text>
                                            <Text allowFontScaling={false} style={[styles.menuTitleText, { color: '#ff0000' }]}> *</Text>
                                        </View>

                                        <TextInput
                                            style={[styles.tiBox]}
                                            autoCapitalize='none'
                                            placeholder={`선택해주세요`}
                                            pointerEvents="none"
                                            editable={false}
                                            placeholderTextColor={Colors.baseTextLightGray}
                                            value={gender}
                                            multiline={true} />
                                    </TouchableOpacity>

                                    <View style={styles.ipWrap}>
                                        <View style={styles.menuTitle}>
                                            <Text allowFontScaling={false} style={styles.menuTitleText}>전화번호</Text>
                                        </View>
                                        <TextInput
                                            style={[styles.tiBox]}
                                            autoCapitalize='none'
                                            placeholder={`숫자만 입력해주세요`}
                                            placeholderTextColor={Colors.baseTextLightGray}
                                            value={phone}
                                            multiline={true}
                                            keyboardType='numeric'
                                            onChangeText={(text) => setPhone(text)} />
                                    </View>

                                    {/* <View style={styles.ipWrap}>
                                        <View style={styles.menuTitle}>
                                            <Text allowFontScaling={false} style={styles.menuTitleText}>학교</Text>
                                        </View>

                                        <TextInput
                                            style={[styles.tiBox]}
                                            autoCapitalize='none'
                                            placeholder={`입력해주세요`}
                                            placeholderTextColor={Colors.baseTextLightGray}
                                            value={school}
                                            multiline={true}
                                            onChangeText={(text) => setSchool(text)} />
                                    </View> */}

                                    <View style={{ width: 1, height: 30 }}></View>
                                </ScrollView>


                                <TouchableOpacity style={{ width: Layout.window.width, height: 50, backgroundColor: '#425386', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}
                                    onPress={() => {
                                        JoinStart(profileImg, name, birth, gender, phone, school)
                                    }}>
                                    <Text allowFontScaling={false} style={{ fontSize: Layout.fsM, color: '#ffffff', marginLeft: 0, fontWeight: 'bold' }}>{isJoin ? '회원 가입' : '정보 수정'}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                </View>


                <ModalBottomSelect isModalOpen={isModalSelect} _modalCb={_modalSelectCb} arrMenuName={arrMenuName} />
                <ModalBottom isModalOpen={isModalBottom} _modalCb={_modalBottomCb} />
                <DateTimePickerModal
                    isVisible={isDateDialog}
                    mode={'date'}
                    is24Hour={true}
                    // datePickerModeAndroid="spinner"
                    onConfirm={_datePickerHandler}
                    onCancel={_datePickerHandlerCancel}
                    date={new Date()}
                />
            </KeyboardAvoidingView>
        </SafeAreaView >
    );

}

const styles = StyleSheet.create({
    ipWrap: {
        width: 280,
        height: 48,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    menuTitle: {
        width: 76, marginLeft: 20, fontWeight: 'bold', flexDirection: 'row', alignItems: 'center'
    },
    menuTitleText: {
        fontSize: Layout.fsSM, color: '#000000', fontWeight: 'bold'
    },
    tiBox: {
        flex: 1, fontSize: Layout.fsSM, color: '#000000', paddingTop: 0, paddingBottom: 0, marginTop: 0
    }
});

export default InfoUpdate;