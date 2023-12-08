import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, TouchableOpacity, Image, Text, ActivityIndicator, Alert, ScrollView } from 'react-native';
import ReactNativeZoomableView from '@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView';
import FastImage from 'react-native-fast-image';
import { Vimeo } from 'vimeo';
import Modal from 'react-native-modal';
import Config from "../constants/Config";
import Layout from '../constants/Layout';
import * as MyUtil from "../constants/MyUtil";
import VideoPlayer from './VideoPlayer';
import Colors from '../constants/Colors';
import * as ServerApi from "../constants/ServerApi";

// _modalCb, isModalOpen, arrAddImage, dialogImgIdx,
const DialogPhoto = ({ _modalCb, isModalOpen, arrAddImage, dialogImgIdx, imgType, navigator }: any) => {
    const [imgIdx, setImgIdx] = useState<number>(-1);
    const [isProfileImgError, setIsProfileImgError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);



    useEffect(() => {
        async function fetchData() {

            const result: any = await ServerApi.getVimeoInfo('/videos/731614737');
            console.log('썸네일 : ' + result.DATA_RESULT.pictures.base_link)
            console.log('영상 URL : ' + result.DATA_RESULT.files[0].link)


            // console.log('arrAddImage: ' +JSON.stringify(arrAddImage))

            // client.request({ method: 'GET', path: '/videos/731614737' }, function (error, body, status_code, headers) {
            //     if (error) { return Alert.alert('error : ' + error); };

            //     console.log('영상 링크 : ' + body.files[0].link);
            //     console.log('썸네일 링크 : ' + body.pictures.base_link);
            // })
        };

        fetchData();

        return () => {
        };
    }, []);



    const viewImgIdx = (imgIdx === -1) ? dialogImgIdx : imgIdx;
    if (typeof (dialogImgIdx) === 'undefined' || dialogImgIdx === null || dialogImgIdx === -1) { dialogImgIdx = 0; };

    let profileSource: any = {};
    let fileType = 'p';

    if (isProfileImgError) {
        profileSource = require('../img/default_img.png');
    } else {
        try {
            if (!MyUtil._isNull(arrAddImage)) {
                if (arrAddImage.length > 0) {
                    profileSource.uri = Config.SERVER_URL + arrAddImage[viewImgIdx].file_nm;

                    console.log('Config.SERVER_URL + arrAddImage[imgIdx].file_nm : ' + Config.SERVER_URL + arrAddImage[viewImgIdx].file_nm)

                    // if (!MyUtil._isNull(arrAddImage[viewImgIdx].file_type)) {
                    //     fileType = arrAddImage[viewImgIdx].file_type;
                    // };
                };
            } else {
                profileSource = require('../img/default_img.png');
            };

            // profileSource.file_type = fileType;
            // profileSource.url_thumb = arrAddImage[viewImgIdx].url_thumb;
        } catch (error) { console.log('profile ADD ERROR : '+error)};
    };


    return (
        <Modal
            testID={'modal'}
            isVisible={isModalOpen}
            style={styles.modalWrap}
            backdropOpacity={0.8}
            onBackButtonPress={() => { setImgIdx(-1); _modalCb(false, {}); }}
            onBackdropPress={() => { setImgIdx(-1); _modalCb(false, {}); }}>

            <View style={{ flex: 1, width: Layout.window.width, paddingLeft: 0, paddingRight: 0, paddingBottom: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000000' }}>
                <View style={{ width: Layout.window.width, height: Layout.window.modalHeight, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
                    {
                        isLoading ? <ActivityIndicator color={Colors.mainColor} style={{}} /> : (
                            fileType === 'v' ? (
                                // <VideoPlayer getSource={profileSource}/>
                                <VideoPlayer
                                    source={profileSource}
                                    navigator={navigator}
                                    tapAnywhereToPause={false}
                                    toggleResizeModeOnFullscreen={false}
                                    isFullScreen={false}
                                    thumbnail={profileSource.url_thumb}
                                    disableBack={true}
                                    disableVolume={true}
                                    disableFullscreen={true}
                                    controlTimeout={5000}
                                    // paused={this.state.paused}
                                    seekColor={Colors.mainColor}
                                />
                            ) : (
                                <ReactNativeZoomableView
                                    contentWidth={Layout.window.width}
                                    contentHeight={Layout.window.modalHeight}
                                    maxZoom={3}
                                    minZoom={1}
                                    initialZoom={1}
                                    zoomEnabled={true}
                                    zoomStep={1}
                                    movementSensibility={1}
                                    doubleTapZoomToCenter={true}
                                    doubleTapDelay={100}
                                // bindToBorders={true}
                                >
                                    <FastImage source={profileSource} resizeMode='contain'
                                        style={{ width: Layout.window.width, height: Layout.window.modalHeight, marginLeft: 0, flexDirection: 'row' }}
                                        onError={() => setIsProfileImgError(true)} />
                                </ReactNativeZoomableView>
                            )
                        )
                    }
                </View>


                <View style={{ width: Layout.window.width, position: 'absolute', bottom: 0, flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.8)' }}>

                    <View style={{ width: Layout.window.width, backgroundColor: 'rgba(0,0,0,0.4)', maxHeight: 200 }}>
                        <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 20 }} style={{}} keyboardShouldPersistTaps='handled'>
                            <Text allowFontScaling={false} style={{ fontSize: Layout.fsL, lineHeight: Layout.fsL + 4, fontWeight: 'bold', color: '#ffffff', width: Layout.window.width, paddingHorizontal: 15 }}>{arrAddImage[viewImgIdx]?.title ? arrAddImage[viewImgIdx]?.title : ''}</Text>
                            <Text allowFontScaling={false} style={{ fontSize: Layout.fsM, lineHeight: Layout.fsM + 4, marginTop: 8, color: '#ffffff', width: Layout.window.width, paddingHorizontal: 15 }}>{arrAddImage[viewImgIdx]?.contents ? arrAddImage[viewImgIdx]?.contents : ''}</Text>
                        </ScrollView>
                    </View>

                    <View style={{ width: Layout.window.width, flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.btnWrap} onPress={() => {
                            if (viewImgIdx > 0) {
                                setIsLoading(true);

                                setTimeout(() => {
                                    const changeIdx = viewImgIdx - 1;
                                    if (!MyUtil._isNull(arrAddImage[changeIdx].file_type)) { fileType = arrAddImage[changeIdx].file_type; };
                                    setImgIdx(changeIdx);
                                    setIsLoading(false);
                                }, 150);
                            } else {
                                Alert.alert('', '마지막 사진 입니다.');
                            };
                        }}>
                            <Image style={styles.arrowBtn} source={require('../img/btn_previous.png')} resizeMode='contain' />
                            <Text allowFontScaling={false} style={styles.addPetTxt}>이전</Text>
                        </TouchableOpacity>

                        <View style={{ flex: 1, height: 1 }}></View>

                        <TouchableOpacity style={styles.btnWrap} onPress={() => {
                            if (viewImgIdx < arrAddImage.length - 1) {
                                setIsLoading(true);

                                setTimeout(() => {
                                    const changeIdx = viewImgIdx + 1;
                                    if (!MyUtil._isNull(arrAddImage[changeIdx].file_type)) { fileType = arrAddImage[changeIdx].file_type; };
                                    setImgIdx(changeIdx);
                                    setIsLoading(false);
                                }, 150);
                            } else {
                                Alert.alert('', '마지막 사진 입니다.');
                            };
                        }}>
                            <Text allowFontScaling={false} style={styles.addPetTxt}>다음</Text>
                            <Image style={styles.arrowBtn} source={require('../img/btn_next.png')} resizeMode='contain' />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity onPress={() => { setImgIdx(-1); _modalCb(false, "", ""); }}
                    style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: Platform.OS === 'ios' ? 30 : 10, left: 0 }}>

                    <Image
                        source={require('../img/ic_x.png')}
                        style={{ width: 30, height: 30, tintColor: '#ffffff' }}
                        resizeMode='cover' />
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalWrap: {
        justifyContent: 'center',
        margin: 0,
        alignItems: 'center',
        marginBottom: Platform.OS === 'ios' ? 35 : 0
    },
    btnWrap: {
        padding: 18, flexDirection: 'row', alignItems: 'center'
    },
    addPetTxt: { fontFamily: Layout.fsFontNsR, fontSize: Layout.fsL, color: '#ffffff', marginHorizontal: 8 },
    arrowBtn: { width: 12, height: 12, padding: 8, tintColor: '#ffffff' }
});

export default DialogPhoto;