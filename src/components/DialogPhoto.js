
import React from 'react';
import { StyleSheet, View, Platform, Text, TouchableOpacity, Image } from 'react-native';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import FastImage from 'react-native-fast-image'
import Modal from 'react-native-modal';
import Layout from '../constants/Layout';
import Config from "../constants/Config";


export default class DialogPhoto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgIdx: -1,
            isProfileImgError: false,
            initialZoom: 1,
            isEnabledZoom: true,
            isLoad: true
        }
    }

    async componentDidMount() { }


    resetZoom = () => {
        this.setState({ initialZoom: 1, isEnabledZoom: false })
    }

    setZoom = (event, gestureState, zoomableViewEventObject) => {
        this.setState({ initialZoom: zoomableViewEventObject.zoomLevel, isEnabledZoom: true })
    }

    _handleMoveShouldSetPanResponder = (e, gestureState) => {
        let baseComponentResult =
            // remove from original code  this.props.zoomEnabled &&
            // because is it blocking the onZoomAfter event
            (Math.abs(gestureState.dx) > 2 ||
                Math.abs(gestureState.dy) > 2 ||
                gestureState.numberActiveTouches === 2)

        if (this.props.onMoveShouldSetPanResponder) {
            baseComponentResult = this.props.onMoveShouldSetPanResponder(
                e,
                gestureState,
                this._getZoomableViewEventObject(),
                baseComponentResult
            )
        }

        return baseComponentResult
    };



    render() {
        let { _modalCb, isModalOpen, arrAddImage, dialogImgIdx, } = this.props;
        let { imgIdx, isProfileImgError, initialZoom, isEnabledZoom } = this.state;
        if (typeof (dialogImgIdx) === 'undefined' || dialogImgIdx === null || dialogImgIdx === -1) { dialogImgIdx = 0 }
        if (imgIdx === -1) { imgIdx = dialogImgIdx }

        let profileSource = {}
        if (isProfileImgError) {
            profileSource = require('../img/default_img.png');
        } else {
            if (arrAddImage.length > 0) {
                profileSource.uri = Config.SERVER_URL +arrAddImage[imgIdx].file_nm

            } else {
                profileSource = require('../img/default_img.png');
            }
        }

        return (
            <Modal
                testID={'modal'}
                isVisible={isModalOpen}
                onSwipeComplete={({ swipingDirection }) => { _modalCb(false, {}) }}
                style={styles.view}
                backdropOpacity={0.8}
                onBackButtonPress={() => { _modalCb(false, {}) }}
                onBackdropPress={() => { _modalCb(false, {}) }}>


                <View style={{ flex: 1, width: Layout.window.width, paddingLeft: 0, paddingRight: 0, paddingBottom: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000000' }}>
                    <View style={{ width: Layout.window.width, height: Layout.window.height - 120, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
                        <ReactNativeZoomableView
                            style={{ width: Layout.window.width, height: Layout.window.height - 120, alignItems: 'center', justifyContent: 'center' }}
                            maxZoom={1.5}
                            minZoom={1}
                            zoomStep={0}
                            bindToBorders={true}
                            initialZoom={initialZoom}
                            zoomEnabled={isEnabledZoom}
                            onZoomAfter={this.setZoom}
                            movementSensibility={1}
                            onMoveShouldSetPanResponder={this._handleMoveShouldSetPanResponder}
                            captureEvent={true}>
                            <FastImage
                                source={profileSource}
                                style={{ width: Layout.window.width, height: Layout.window.height - 120, marginLeft: 0, flexDirection: 'row' }}
                                // onError={() => this.setState({ isProfileImgError: true })}
                                // onLoad={(e) => {
                                //     this.setState({ isLoad: true })
                                // }}
                                resizeMode='contain'>
                            </FastImage>
                        </ReactNativeZoomableView>

                        <TouchableOpacity style={{ width: 80, height: 80, justifyContent: 'center', paddingLeft: 10, position: 'absolute', left: 0 }} onPress={() => {
                            if (imgIdx > 0) { this.setState({ imgIdx: imgIdx - 1, initialZoom: 1, isEnabledZoom: false }) }
                        }}>
                            <Image
                                source={require('../img/btn_arrow_left.png')}
                                style={{ width: 50, height: 50, opacity: 0.4 }}
                                resizeMode='cover' />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ width: 80, height: 80, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 10, position: 'absolute', right: 0 }} onPress={() => {
                            if (imgIdx < arrAddImage.length - 1) { this.setState({ imgIdx: imgIdx + 1, initialZoom: 1, isEnabledZoom: false }) }
                        }}>
                            <Image
                                source={require('../img/btn_arrow_right.png')}
                                style={{ width: 50, height: 50, opacity: 0.4 }}
                                resizeMode='cover' />
                        </TouchableOpacity>
                    </View>


                    <TouchableOpacity
                        onPress={() => {
                            this.state.imgIdx = -1;
                            _modalCb(false, "", "")
                        }}
                        style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 30, left: 0 }}>

                        <Image
                            source={require('../img/ic_x.png')}
                            style={{ width: 30, height: 30, tintColor: '#ffffff' }}
                            resizeMode='cover' />
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        margin: 0,
        alignItems: 'center',
        marginBottom: Platform.OS === 'ios' ? 35 : 5
    },
});
