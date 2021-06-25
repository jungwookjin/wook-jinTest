// ********* 함수 시그니처 ********* //
export type StackParams = {
    A: undefined;
    InfoUpdate: {
        isJoin: boolean,
        uniq_key: string,
        easy_type: String
    }
    COMMON: {
        detailItem: any,
        biz_no: string
    }
}

export type httpReq = Promise<{ IS_SUCCESS: boolean; DATA_RESULT: any; }>
export type HeaderParams = {
    navigation: any,
    isBackBtn: boolean,
    title: string,
    themeColor: string
};