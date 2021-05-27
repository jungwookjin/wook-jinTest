
import React from 'react';
import { StyleSheet, View, Platform, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Layout from '../constants/Layout';
import * as MyUtil from '../constants/MyUtil'


export default class ModalBottom extends React.Component {
    render() {
        const { _modalCb, isModalOpen, arrMenuName } = this.props;

        return (
            <Modal
                testID={'modal'}
                isVisible={isModalOpen}
                swipeDirection={['down']}
                onSwipeComplete={({ swipingDirection }) => { _modalCb(false, {}) }}
                style={styles.view}
                backdropOpacity={0.5}
                onBackButtonPress={() => { _modalCb(false, {}) }}
                onBackdropPress={() => { _modalCb(false, {}) }}>


                <View style={{ width: Layout.window.width - 40, marginBottom: 6, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.9)', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>

                    {
                        !MyUtil._isNull(arrMenuName) && arrMenuName.map((item, idx) => (
                            <View key={idx} style={{ width: Layout.window.width - 40, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => { _modalCb(true, { menuName: item }) }} style={{ width: '100%', height: 56, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text allowFontScaling={false} style={{ fontSize: Layout.fsM, color: 'blue' }}>{item}</Text>
                                </TouchableOpacity>

                                {
                                    arrMenuName.length !== (idx + 1) && (
                                        <View style={{ width: '96%', height: 1, backgroundColor: 'rgba(0,0,0,0.1)' }}></View>
                                    )
                                }
                            </View>
                        ))
                    }
                </View>

                <TouchableOpacity onPress={() => { _modalCb(false, {}) }} style={{ width: Layout.window.width - 40, height: 50, borderRadius: 10, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center' }}>
                    <Text allowFontScaling={false} style={{ fontSize: Layout.fsM, color: 'blue' }}>Cancel</Text>
                </TouchableOpacity>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        justifyContent: 'flex-end',
        margin: 0,
        alignItems: 'center',
        marginBottom: Platform.OS === 'ios' ? 35 : 5
    },
});
