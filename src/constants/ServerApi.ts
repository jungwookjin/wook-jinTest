import * as MyUtil from "./MyUtil";
import * as SG from "./Signature";
import Config from "./Config";
import messaging from '@react-native-firebase/messaging';
import { Alert } from "react-native";

export async function _login(easy_type: string, uniq_key: string): SG.httpReq {
    const REQ_METHODS = "users/login";
    let fcmToken = ""

    try {
        fcmToken = await messaging().getToken();
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
        easy_type, uniq_key, token:fcmToken
    };

    return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_app_photo(u_id: string, page: string, c_gb:string): SG.httpReq {
    const REQ_METHODS = "users/m_app_photo";

    const data =
    {
        u_id, page,c_gb
    };

    return await MyUtil._httpReq(REQ_METHODS, data);
}



export async function m_app_alarm(u_id: string, page: string): SG.httpReq {
    const REQ_METHODS = "users/m_app_alarm";

    const data =
    {
        u_id, page
    };

    return await MyUtil._httpReq(REQ_METHODS, data);
}


export async function m_app_my_subj(u_id: string, mon: string): SG.httpReq {
    const REQ_METHODS = "users/m_app_my_subj";

    const data =
    {
        u_id, mon
    };

    return await MyUtil._httpReq(REQ_METHODS, data);
}


export async function m_app_my_child_subj(u_id: string, mon: string): SG.httpReq {
    const REQ_METHODS = "users/m_app_my_child_subj";

    const data =
    {
        u_id, mon
    };

    return await MyUtil._httpReq(REQ_METHODS, data);
}


export async function m_app_stu_biz(u_id: string): SG.httpReq {
    const REQ_METHODS = "users/m_app_stu_biz";

    const data =
    {
        u_id
    };

    return await MyUtil._httpReq(REQ_METHODS, data);
}


export async function m_app_my_child(u_id: string): SG.httpReq {
    const REQ_METHODS = "users/m_app_my_child";

    const data =
    {
        u_id
    };

    return await MyUtil._httpReq(REQ_METHODS, data);
}


export async function m_app_child_d(u_id: string,c_u_id:string): SG.httpReq {
    const REQ_METHODS = "users/m_app_child_d";

    const data =
    {
        u_id,c_u_id
    };

    return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_app_code_child(c_code: string): SG.httpReq {
    const REQ_METHODS = "users/m_app_code_child";

    const data =
    {
        c_code
    };

    return await MyUtil._httpReq(REQ_METHODS, data);
}


export async function m_app_child_i(u_id: string, c_u_id: string, f_relation: string): SG.httpReq {
    const REQ_METHODS = "users/m_app_child_i";

    const data =
    {
        u_id,
        c_u_id,
        f_relation
    };

    return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_app_subj_qr_attend_i(u_id: string, biz_code: string, subj_no: string): SG.httpReq {
    const REQ_METHODS = "users/m_app_subj_qr_attend_i";

    const data =
    {
        u_id, biz_code, subj_no
    };

    return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_app_my_attend(u_id:string,mon:string,subj_no:string): SG.httpReq {
    const REQ_METHODS = "users/m_app_my_attend";

    const data =
    {
        u_id, mon, subj_no
    };

    return await MyUtil._httpReq(REQ_METHODS, data);
}
export async function m_app_biz_subj_list(biz_no: string, u_id: string,c_gb:string): SG.httpReq {
    const REQ_METHODS = "users/m_app_biz_subj_list";

    const data =
    {
        biz_no, u_id,c_gb
    };

    return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_app_my_subj_dt_list(u_id: string, day: string): SG.httpReq {
    const REQ_METHODS = "users/m_app_my_subj_dt_list";

    const data =
    {
        u_id, day
    };

    return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_app_my_child_subj_dt_list(u_id: string, day: string): SG.httpReq {
    const REQ_METHODS = "users/m_app_my_child_subj_dt_list";

    const data =
    {
        u_id, day
    };

    return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_app_noti(u_id: string, page: string): SG.httpReq {
    const REQ_METHODS = "users/m_app_noti";

    const data =
    {
        u_id, page
    };

    return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function _join(formData: any) {
    const REQ_METHODS = "users/join";

    return await MyUtil._multiPartReq(REQ_METHODS, formData);
}

export async function m_app_info_u(formData: any) {
    const REQ_METHODS = "users/m_app_info_u";

    return await MyUtil._multiPartReq(REQ_METHODS, formData);
}
