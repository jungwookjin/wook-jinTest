const getImgDefPath = (req:any) => {
    return req.protocol + '://' + req.get('host') + "/img/def"
}

export default {
    FATAL_ERROR: "FATAL_ERROR",  


    // ### DB 에러 코드
    DB_SUCSESS: 200,    // 정상 응답
    DB_ERR_SERVER: 500,     // 서버 에러
    DB_ERR_SERVER_L: 501,     // 서버 로직 에러
    DB_ERR_WRONG_REQ: 400,  // 잘못된 요청
    DB_ERR_ABNORMAL: 302,   // 비정상 데이터 다수 존재
    DB_TXT_ABNORMAL: "회원 정보 비정상(다수 존재)",  

    DB_USER_NONE: 211,    // 회원 정보 없음
    DB_TXT_USER_NONE: "회원 정보가 없습니다.",  



    // ### 이미지 경로
    PATH_IMG_DEF: getImgDefPath,
}