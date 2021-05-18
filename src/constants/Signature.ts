// ********* 함수 시그니처 ********* //

export type httpReq = Promise<{ IS_SUCCESS: boolean; DATA_RESULT: any; }> 
export type HeaderParams = {
    navigation: any,
    isBackBtn: boolean
};