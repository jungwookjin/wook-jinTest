
import React, {  useCallback } from "react";
import { StyleSheet, View, Platform, Text, SafeAreaView, TouchableOpacity, Linking, KeyboardAvoidingView, Alert } from 'react-native';
import Modal from 'react-native-modal';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';


const ModalQrCode = ({ _modalCb, isModalOpen }) => {

    // useEffect(() => {
    // }, [isModalOpen]);

    const OnSuccess = useCallback((event) => {
        _modalCb(true, event.data)
        // Linking.openURL(event.data).catch(err =>
        //     console.error('An error occured', err)
        // );
    }, []);

    return (
        <Modal
            avoidKeyboard={false}
            testID={'modal'}
            isVisible={isModalOpen}
            style={styles.view}
            backdropOpacity={0.3}
            onBackButtonPress={() => { _modalCb(false, {}) }}
            onBackdropPress={() => { _modalCb(false, {}) }}>


            <KeyboardAvoidingView enabled behavior={undefined}>
                <SafeAreaView style={{ flex: 1, width: Layout.window.width, alignItems: 'center' }}>
                    <TouchableOpacity style={{ width: Layout.window.width, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                        onPress={() => { _modalCb(false, {}) }}>
                        <Text allowFontScaling={false} style={{ fontSize: Layout.fsM, color: '#ffffff', fontWeight: 'bold', marginRight: 15, marginTop: 12 }}>닫기</Text>
                    </TouchableOpacity>

                    <View style={{ width: Layout.window.width, flex: 1, marginTop: 0, borderRadius: 10, backgroundColor: 'rgba(0,0,0,1)', justifyContent: 'center', alignItems: 'center' }}>
                        <QRCodeScanner
                            onRead={OnSuccess}
                            // flashMode={RNCamera.Constants.FlashMode.torch}
                            topContent={<></>}
                            bottomContent={<></>}
                        />

                        <View style={{ position: 'absolute', borderWidth: 2, width: Layout.window.width - 150, height: Layout.window.width - 150, borderColor: Colors.mainBlue, borderRadius: 15 }}></View>

                        <View style={{ position: 'absolute', bottom: 100 ,padding:10,borderRadius:12,backgroundColor:Colors.mainBlue}}>
                            <Text allowFontScaling={false} style={{ fontSize: Layout.fsS, color: '#000000' }}>QR코드를 파란 박스에 맞춰주세요</Text>
                        </View>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </Modal>
    )
}
export default ModalQrCode;


const styles = StyleSheet.create({
    view: {
        justifyContent: 'flex-end',
        margin: 0,
        alignItems: 'center'
    },
    viewRow: {
        width: Layout.window.width - 30, flexDirection: 'row', alignItems: 'center'
    },
    gubunLine: {
        width: '100%', height: 1, backgroundColor: Colors.grayLine3
    }
});
