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
    const chartData = {
        dataSets: [{
            values: [{ x: 4, y: 135, marker: "" }, { x: 5, y: 0.88, marker: "" }, { x: 6, y: 0.77, marker: "" }, { x: 7, y: 105, marker: "" }], label: 'A',
        }, {
            values: [{ x: 4, y: 105, marker: "" }, { x: 5, y: 90, marker: "" }, { x: 6, y: 130, marker: "" }, { x: 7, y: 100, marker: "" }], label: 'B',
        }, {
            values: [{ x: 4, y: 110, marker: "" }, { x: 5, y: 110, marker: "" }, { x: 6, y: 105, marker: "" }, { x: 7, y: 115, marker: "" }], label: 'C',
        }],
    };

    useEffect(() => {
        async function fetchData() {
            console.log("rxLoginInfo : " + JSON.stringify(rxLoginInfo))
        }
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

                            <View style={{ width: Layout.window.width, marginTop: 0, justifyContent: 'center', alignItems: 'center' }}>
                                <LineChart
                                    // ref="chart"
                                    style={{ height: 250, width: Layout.window.width }}
                                    data={chartData}
                                    chartDescription={{ text: '' }}
                                    // legend={this.state.legend}
                                    marker={{
                                        enabled: true,
                                        digits: 2,
                                        markerColor: processColor('#F0C0FF8C'),
                                        textColor: processColor('white'),
                                        textSize: 16
                                    }}
                                    xAxis={{
                                        granularityEnabled: true,
                                        granularity: 1,
                                        position: 'BOTTOM'
                                    }}
                                    yAxis={{
                                        right: { inverted: false, }
                                    }}
                                    drawGridBackground={false}
                                    borderColor={processColor('teal')}
                                    borderWidth={1}
                                    drawBorders={true}
                                    autoScaleMinMaxEnabled={false}
                                    touchEnabled={true}
                                    dragEnabled={true}
                                    scaleEnabled={true}
                                    scaleXEnabled={true}
                                    scaleYEnabled={true}
                                    pinchZoom={true}
                                    doubleTapToZoomEnabled={true}
                                    highlightPerTapEnabled={true}
                                    highlightPerDragEnabled={false}
                                    // visibleRange={this.state.visibleRange}
                                    dragDecelerationEnabled={true}
                                    dragDecelerationFrictionCoef={0.99}
                                    keepPositionOnRotation={false}
                                    // onSelect={this.handleSelect.bind(this)}
                                    onChange={(event) => console.log(event.nativeEvent)}
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


// dataSets: [
//     {
//         values: [
//             {
//                 y: 65,
//                 x: 0,
//                 marker: "65 kg"
//             },
//             {
//                 y: 77,
//                 x: 1,
//                 marker: "77 kg"
//             },
//             {
//                 y: 76,
//                 x: 2,
//                 marker: "76 kg"
//             },
//             {
//                 y: 74,
//                 x: 3,
//                 marker: "74 kg"
//             },
//             {
//                 y: 76,
//                 x: 4,
//                 marker: "76 kg"
//             },
//             {
//                 y: 65,
//                 x: 5,
//                 marker: "Today: 65 kg"
//             }
//         ],
//         label: "",
//         config: {
//             mode: "CUBIC_BEZIER",
//             drawValues: false,
//             lineWidth: 2,
//             drawCircles: true,
//             circleColor: processColor(petrel),
//             drawCircleHole: false,
//             circleRadius: 5,
//             highlightColor: processColor("transparent"),
//             color: processColor(petrel),
//             drawFilled: true,
//             fillGradient: {
//                 colors: [processColor(petrel), processColor(greenBlue)],
//                 positions: [0, 0.5],
//                 angle: 90,
//                 orientation: "TOP_BOTTOM"
//             },
//             fillAlpha: 1000,
//             valueTextSize: 15
//         }
//     },

//     {
//         values: [
//             {
//                 y: 35,
//                 x: 0,
//                 marker: "35 kg"
//             },
//             {
//                 y: 47,
//                 x: 1,
//                 marker: "47 kg"
//             },
//             {
//                 y: 46,
//                 x: 2,
//                 marker: "46 kg"
//             },
//             {
//                 y: 44,
//                 x: 3,
//                 marker: "44 kg"
//             },
//             {
//                 y: 46,
//                 x: 4,
//                 marker: "46 kg"
//             },
//             {
//                 y: 35,
//                 x: 5,
//                 marker: "Today: 35 kg"
//             }
//         ],
//         label: "",
//         config: {
//             mode: "CUBIC_BEZIER",
//             drawValues: false,
//             lineWidth: 2,
//             drawCircles: true,
//             circleColor: processColor(petrel),
//             drawCircleHole: false,
//             circleRadius: 5,
//             highlightColor: processColor("transparent"),
//             color: processColor(petrel),
//             drawFilled: true,
//             fillGradient: {
//                 colors: [processColor('red'), processColor('yellow')],
//                 positions: [0, 0.5],
//                 angle: 90,
//                 orientation: "TOP_BOTTOM"
//             },
//             fillAlpha: 1000,
//             valueTextSize: 15
//         }
//     }
// ]