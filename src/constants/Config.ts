// const BASE_URL = 'http://211.221.7.127:9184/'; // test (정훈 PC)
// const BASE_URL = 'http://218.159.159.57:8091/';  // test (이사님 pc)
const BASE_URL = 'http://15.165.156.218:3909/'; // AWS


export default {

  // ***************** 서버 호출
  SERVER_URL: BASE_URL,
  API_URL: BASE_URL + '',

  IMG_URL: BASE_URL+'img/',   // 이미지 폴더
  PD_IMG_URL: BASE_URL+'pd/',   // 상품 이미지 폴더

  // ***************** 어싱크 키
  AS_KEY_LOGIN_INFO: 'as_key_login_info', 


  // ****************** 공통 사용 코드 
  APP_VER: '0.0.5',
  IS_LOG: false
};
