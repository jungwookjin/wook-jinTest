import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, ImageBackground, Text, Image, Alert, TouchableOpacity, processColor } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import { LineChart } from "react-native-charts-wrapper";
import { RootState } from '../components/redux/rootReducer'
import * as ITF from '../constants/Interface'
import Loader from "../components/Loader"
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import CustomHeader from "../components/CustomHeader";



const AttendChart = () => {
    const navigation = useNavigation();
    const { rxLoginInfo } = useSelector((state: RootState) => state.rxLoginInfo, (prev, next) => { return prev.rxLoginInfo === next.rxLoginInfo; })
    const [loading, setLoading] = useState(false);
    const defaultDataConfig = {
        lineWidth: 1.5,
        valueTextSize: 9,
        valueTextColor: processColor('#bfbfbf'),
        valueFormatter: ''
    }
    const chartData = {
        dataSets: [{
            label: '김정훈',
            config: { ...defaultDataConfig, ...{ colors: [processColor('#D14B5A')], circleColors: [processColor('#D14B5A')] } },
            values: [
                { x: 1, y: 90 },
                { x: 2, y: 100 },
                { x: 3, y: 90 },
                { x: 4, y: 90 },
                { x: 5, y: 80 },
                { x: 6, y: 80 },
                { x: 7, y: 70 },
                { x: 8, y: 100 },
                { x: 9, y: 80 },
                { x: 10, y: 80 },
                { x: 11, y: 80 },
                { x: 12, y: 100 },
            ]
        },
        {
            label: '송재영',
            config: { ...defaultDataConfig, ...{ colors: [processColor('#04de54')], circleColors: [processColor('#04de54')] } },
            values: [
                { x: 1, y: 70 },
                { x: 2, y: 80 },
                { x: 3, y: 30 },
                { x: 4, y: 50 },
                { x: 5, y: 70 },
                { x: 6, y: 50 },
                { x: 7, y: 50 },
                { x: 8, y: 30 },
                { x: 9, y: 80 },
                { x: 10, y: 60 },
                { x: 11, y: 60 },
                { x: 12, y: 80 },
            ]
        },],

    };

    useEffect(() => {
        async function fetchData() {  }
        fetchData();
    }, []);


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgNavy }}>
            {
                loading ? (<Loader />) : (
                    <View style={{ flex: 1, width: Layout.window.width }}>
                        <CustomHeader navigation={navigation} isBackBtn={true} title={'출석률'} themeColor={'#ffffff'} />

                        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} keyboardShouldPersistTaps='handled'>

                            <View style={{ width: Layout.window.widthFix, marginTop: 0 }}>
                                <Text allowFontScaling={false} numberOfLines={1} style={{ color: '#ffffff', fontSize: Layout.fsM, fontWeight: 'bold', marginTop: 20 }}>월별 출석률</Text>
                            </View>

                            <View style={{ width: Layout.window.widthFix, marginTop: 0, justifyContent: 'center', alignItems: 'center' }}>
                                <LineChart
                                    style={{ height: 260, width: Layout.window.widthFix + 10 }}
                                    data={chartData}
                                    xAxis={{
                                        drawGridLines: false,
                                        granularityEnabled: true,
                                        granularity: 1,
                                        position: 'BOTTOM',
                                        textColor: processColor('#ffffff')
                                    }}
                                    yAxis={{
                                        left: { granularityEnabled: false, drawAxisLines: true, drawGridLines: false, drawLabels: true, textColor: processColor('#ffffff') },
                                        right: { drawLabels: false }
                                    }}
                                    legend={{
                                        enabled: true,
                                        textColor: processColor('#ffffff'),
                                        form: 'LINE',
                                        formToTextSpace: 5,
                                        xEntrySpace: 12
                                    }}
                                    marker={{ enabled: true }}
                                    drawGridBackground={false}
                                    drawBorders={false}
                                    borderColor={processColor('#c4c4c4')}
                                    borderWidth={0}
                                    autoScaleMinMaxEnabled={false}
                                    touchEnabled={true}
                                    dragEnabled={true}
                                    scaleEnabled={true}
                                    scaleXEnabled={true}
                                    scaleYEnabled={true}
                                    pinchZoom={true}
                                    doubleTapToZoomEnabled={false}
                                    highlightPerTapEnabled={true}
                                    highlightPerDragEnabled={true}
                                    dragDecelerationEnabled={true}
                                    dragDecelerationFrictionCoef={0.99}
                                    keepPositionOnRotation={false}
                                    onChange={(event) => console.log(event.nativeEvent)}
                                    chartDescription={{ text: '' }}
                                // gridBackgroundColor={processColor('#ffffff')}
                                // ref="chart"
                                // visibleRange={this.state.visibleRange}
                                // onSelect={this.handleSelect.bind(this)}
                                />
                            </View>

                        </ScrollView>
                    </View>
                )
            }
        </SafeAreaView >
    );

}

const styles = StyleSheet.create({
});

export default AttendChart;