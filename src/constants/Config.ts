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
  AS_BG_SERVICE_BACK: 'as_bg_service_background',
  AS_BG_SERVICE_DEEP_LINK: 'as_bg_service_deep_link',


  // ***************** 비메오 키
  VIMEO_C_ID: '955473a3d6345ce1860dea6ee6c1b3f5e4d039e3',
  VIMEO_C_SECRET: 'IKPP5OuRZyPPxYIijFbUPGB1wjHznpnuU9isLRWD6rwdQnios6d0nrKws2JB2mCJ5ZpnWYATpvTjcw4BdM/STQsGO/k75XNDP0s2UA97rR+WW1J8yzL5RCpQ0Nv+cXgP',
  VIMEO_C_A_TOKEN: 'be46eee993b2a2e6ae8866916579c191',



  // ****************** 공통 사용 코드 
  APP_VER: '0.4.03',
  IS_LOG: false
};
