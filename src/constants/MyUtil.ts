import axios from "axios";
import { Alert, Platform, StatusBar, PermissionsAndroid } from "react-native";
import * as MyAsyncStorage from "./MyAsyncStorage";
import * as ServerApi from "./ServerApi";
import allActions from "../components/redux/allActions";
import CST from '../constants/constants';
import Config from "./Config";
import Layout from "./Layout";

export async function _httpReq(methodName: string, data: any) {
    let result = "";
    let url = Config.API_URL + methodName;

    _consoleLog("============ >>>>>> " + url + " () 요청 - " + JSON.stringify(data));

    try {
        let response: any = await axios({
            method: 'post',
            url: url,
            headers: { 'Content-Type': 'application/json' },
            data: data
        });

        let responseOK = response && response.status === 200;
        if (responseOK) {
            result = response.data;
            _consoleLog("============ <<<<<< " + methodName + "() 정상 result : " + JSON.stringify(result));

            return {
                IS_SUCCESS: true,
                DATA_RESULT: result
            };

        } else {
            result = response.error;
            _consoleLog("============ <<<<<< " + methodName + "() 응답 status error : " + result);
            Alert.alert("", `네트워크 환경이 불안정합니다. 앱을 재시작해주세요.\n\n${methodName}\n(${result})`);

            return {
                IS_SUCCESS: false,
                DATA_RESULT: result
            };
        }


    } catch (error:any) {
        _consoleLog("============ <<<<<< " + methodName + "() 네트워크 error : " + error);
        Alert.alert("", `네트워크 환경이 불안정합니다. 앱을 재시작해주세요.\n\n${methodName}\n(${error.message})`);

        return {
            IS_SUCCESS: false,
            DATA_RESULT: error
        };
    }
}



export async function _httpGetReq(reqURL: string) {
    let result = "";

    _consoleLog("============ >>>>>> " + reqURL + " () 요청 - ");

    try {
        let response: any = await axios({
            method: 'get',
            url: reqURL,
        });

        let responseOK = response && response.status === 200;
        if (responseOK) {
            result = response.data;
            _consoleLog("============ <<<<<< " + "() 정상 result : " + JSON.stringify(result));

            return {
                IS_SUCCESS: true,
                DATA_RESULT: result
            };

        } else {
            result = response.error;
            _consoleLog("============ <<<<<< " + "() 응답 status error : " + result);
            Alert.alert("", `네트워크 환경이 불안정합니다. 앱을 재시작해주세요.\n\n(${result})`);

            return {
                IS_SUCCESS: false,
                DATA_RESULT: result
            };
        }


    } catch (error:any) {
        _consoleLog("============ <<<<<< " + "() 네트워크 error : " + error);
        Alert.alert("", `네트워크 환경이 불안정합니다. 앱을 재시작해주세요.\n\n(${error.message})`);

        return {
            IS_SUCCESS: false,
            DATA_RESULT: error
        };
    }
}





export async function _multiPartReq(methodName: string, formData: any) {
    let result: any = '';
    let url = Config.API_URL + methodName;

    _consoleLog("============ >>>>>> " + methodName + " () 요청 - " + JSON.stringify(formData));

    let response: any = await axios({
        method: 'post',
        url: url,
        headers: { 'content-type': 'multipart/form-data' },
        data: formData
    });

    let responseOK = response && response.status === 200;
    if (responseOK) {
        result = response.data;
        _consoleLog("============ <<<<<< () 정상 result : " + JSON.stringify(result));

        return {
            IS_SUCCESS: true,
            DATA_RESULT: result
        };

    } else {
        result = response.error;
        _consoleLog("============ <<<<<< () 응답 status error : " + result);
        return {
            IS_SUCCESS: false,
            DATA_RESULT: result
        };
    }
}


// 천단위 콤마
export function _toThousandsCommas(num: any) {
    if (typeof (num) === 'undefined') {
        return "0"
    } else if (num === null) {
        return "0"
    } else if (num === "0") {
        return "0"
    } else {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

export function _dateFormat(date: Date) {
    let hour = date.getHours() < 10 ? ("0" + date.getHours()) : date.getHours()
    let min = date.getMinutes() < 10 ? ("0" + date.getMinutes()) : date.getMinutes()
    let result = hour + ":" + min;

    return result;
}


// export function getNotchHight() {
//     let notchHeight = 0;
//     if (Platform.OS == 'ios') {
//         if (StatusBar.currentHeight() == 20) {
//             notchHeight = 25;
//         }
//         else if (StatusBar.currentHeight() > 20) {
//             notchHeight = StatusBar.currentHeight() + 34;
//         }
//     }
//     else if (Platform.OS == 'android') {
//         if (StatusBar.currentHeight() > 25) {
//             notchHeight = 0;
//         }
//         else {
//             notchHeight = StatusBar.currentHeight();
//         }
//     }
//     return notchHeight;
// }


export function _isNull(obj: any) {
    if (typeof (obj) === 'undefined') {
        return true
    } else if (obj === "undefined") {
        return true
    } else if (obj === null) {
        return true
    } else if (obj === "null") {
        return true
    } else if (obj === "") {
        return true
    } else if (obj === "NaN") {
        return true
    } else if (obj === 0) {
        return true
    } else if (obj === "0") {
        return true
    } else if (obj === NaN) {
        return true
    } else if (obj.length === 0) {
        return true
    } else if (obj.length === "0.0") {
        return true
    } else {
        return false
    }
}

export function _isNum(obj: string) {
    var regType1 = /^[0-9]*$/;
    if (!regType1.test(obj)) {
        return false
    } else {
        return true
    }
}

export function _codeToKor(code: string, type: string) {
    if (type === 'target') {
        if (code === 'A') {
            return '전체'
        } else if (code === 'S') {
            return '학생'
        } else if (code === 'P') {
            return '부모'
        }
    } else if (type === 'c_gb_dt') {
        if (code === CST.C_BG_CEO) {
            return '원장님';
        } else if (code === CST.C_BG_TEACHER) {
            return '선생님';
        } else if (code === CST.C_BG_PARENTS) {
            return '학부모';
        } else if (code === CST.C_BG_STUDENT) {
            return '학생';
        }
    }
}

// URL 쿼리 스트링 파서
export function _queryStringParse(url: string) {
    if (_isNull(url)) { return "" }
    var regex = /[?&]([^=#]+)=([^&#]*)/g,
        params: any = {},
        match;
    while (match = regex.exec(url)) {
        params[match[1]] = match[2];
    }
    return params;
}

// 도메인 파서
export function _getDomain(url: string) {
    if (_isNull(url)) { return "" }
    console.log("url : " + JSON.stringify(url))
    let domain = url.split('?')
    return domain.length > 0 ? domain[0] : "";
}

export function _consoleLog(text: string) {
    if (Config.IS_LOG) {
        console.log("** (myLog) ** \n" + text);
    }
}

export function _consoleError(text: string) {
    if (Config.IS_LOG) {
        console.error("** (myLog) ** \n" + text);
    }
}

export function _alertMsg(apiNm: any, dataResult: any) {
    if (!_isNull(dataResult.MSG)) {
        Alert.alert("", "" + dataResult.MSG)
    } else if (!_isNull(dataResult.ERROR)) {
        Alert.alert("", `네트워크 환경이 불안정 합니다!\n${apiNm}:${dataResult.ERROR}`)
    } else if (!_isNull(dataResult.RSP_CODE)) {
        Alert.alert("", `네트워크 환경이 불안정 합니다!\n${apiNm}:${dataResult.RSP_CODE}`)
    } else {
        Alert.alert("", `네트워크 환경이 불안정 합니다!\n${apiNm}`)
    }
}


export async function _checkCameraPermission() {
    if (Platform.OS === 'android') {

        await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            // PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        ]);

        const cameraGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
        const readGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
        const writeGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
        // const recordGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO)

        if (cameraGranted && readGranted && writeGranted) {
            return true
        } else {
            return false;
        }

    } else {
        return true;
        // const statuses = await requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE, PERMISSIONS.IOS.PHOTO_LIBRARY]);
        // const cameraGranted = statuses[PERMISSIONS.IOS.CAMERA];
        // const microphoneGranted = statuses[PERMISSIONS.IOS.MICROPHONE];
        // const photoGranted = statuses[PERMISSIONS.IOS.PHOTO_LIBRARY];

        // if ((cameraGranted === RESULTS.GRANTED) && (photoGranted === RESULTS.GRANTED) && (microphoneGranted === RESULTS.GRANTED)) {
        //     return true
        // } else {
        //     return false;
        // }
    }
}


export async function _loginRenewal(dispatch: any, navigation: any) {
    const loginInfo = await MyAsyncStorage._getAsyncStorage(Config.AS_KEY_LOGIN_INFO)

    const result = await ServerApi._login(loginInfo.easy_type, loginInfo.uniq_key)

    if (result.IS_SUCCESS === true && result.DATA_RESULT.RSP_CODE === CST.DB_SUCSESS) {
        // * 로그인 정보 리덕스 저장
        dispatch(allActions.setRxLoginInfo(result.DATA_RESULT))

    } else {
        dispatch(allActions.logOut())
        MyAsyncStorage._writeAsyncStorage(Config.AS_KEY_LOGIN_INFO, null);
        Alert.alert("", "로그인이 필요합니다!\n로그인 페이지로 이동됩니다.")
        navigation.reset({ index: 0, routes: [{ name: 'Login', params: {} }] })
    }
}
