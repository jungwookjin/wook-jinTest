import * as MyUtil from "./MyUtil";
import * as SG from "./Signature";
import Config from "./Config";
import { Alert } from "react-native";

export async function _login(easy_type: string, uniq_key: string): SG.httpReq {
    const REQ_METHODS = "users/login";
    let fcmToken = ""

    try {
        // fcmToken = await messaging().getToken();
        if (fcmToken) {
            MyUtil._consoleLog("******* 로그인 토큰 : " + fcmToken);
        } else {
            // user doesn't have a device token yet
            MyUtil._consoleLog("******* 로그인 토큰 없음");
            fcmToken = "";
        }
    } catch (error) {
        Alert.alert("", "알림이 거부된 상태입니다!\n설정에서 알림을 허용해주세요!");
    }


    const data =
    {
        easy_type, uniq_key
    };

    return await MyUtil._httpReq(REQ_METHODS, data);
}


export async function m_app_alarm(u_id: string,row_no:string): SG.httpReq {
    const REQ_METHODS = "users/m_app_alarm";
 
    const data =
    {
        u_id,row_no
    };

    return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function _join(formData: any) {
    const REQ_METHODS = "users/join";

    return await MyUtil._multiPartReq(REQ_METHODS, formData);
}

