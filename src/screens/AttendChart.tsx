import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, ImageBackground, Text, Image, Alert, TouchableOpacity,processColor } from "react-native";
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
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
        datasets: [
            {
                data: [10, 4, 6, 8, 5, 20, 10, 4, 6, 8, 5, 20, 10, 4, 6, 8, 5, 20, 10, 4, 6, 8, 5, 20, 10, 4, 6, 8, 5, 20],
                strokeWidth: 2,
            },
            {
                data: [5, 2, 8, 4, 1, 7, 5, 2, 8, 4, 1, 7, 5, 2, 8, 4, 1, 7, 5, 2, 8, 4, 1, 7, 5, 2, 8, 4, 1, 7],
                strokeWidth: 2,
            },
        ],
        legend: ['김정훈', '송재영'],
    };
    const greenBlue = "rgb(26, 182, 151)";
    const petrel = "rgb(59, 145, 153)";


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
                                    style={{height:250,width:Layout.window.width}}
                                    data={{
                                        dataSets: [
                                            {
                                                values: [
                                                    {
                                                        y: 65,
                                                        x: 0,
                                                        marker: "65 kg"
                                                    },
                                                    {
                                                        y: 77,
                                                        x: 1,
                                                        marker: "77 kg"
                                                    },
                                                    {
                                                        y: 76,
                                                        x: 2,
                                                        marker: "76 kg"
                                                    },
                                                    {
                                                        y: 74,
                                                        x: 3,
                                                        marker: "74 kg"
                                                    },
                                                    {
                                                        y: 76,
                                                        x: 4,
                                                        marker: "76 kg"
                                                    },
                                                    {
                                                        y: 65,
                                                        x: 5,
                                                        marker: "Today: 65 kg"
                                                    }
                                                ],
                                                label: "",
                                                config: {
                                                    mode: "CUBIC_BEZIER",
                                                    drawValues: false,
                                                    lineWidth: 2,
                                                    drawCircles: true,
                                                    circleColor: processColor(petrel),
                                                    drawCircleHole: false,
                                                    circleRadius: 5,
                                                    highlightColor: processColor("transparent"),
                                                    color: processColor(petrel),
                                                    drawFilled: true,
                                                    fillGradient: {
                                                        colors: [processColor(petrel), processColor(greenBlue)],
                                                        positions: [0, 0.5],
                                                        angle: 90,
                                                        orientation: "TOP_BOTTOM"
                                                    },
                                                    fillAlpha: 1000,
                                                    valueTextSize: 15
                                                }
                                            },

                                            {
                                                values: [
                                                    {
                                                        y: 35,
                                                        x: 0,
                                                        marker: "35 kg"
                                                    },
                                                    {
                                                        y: 47,
                                                        x: 1,
                                                        marker: "47 kg"
                                                    },
                                                    {
                                                        y: 46,
                                                        x: 2,
                                                        marker: "46 kg"
                                                    },
                                                    {
                                                        y: 44,
                                                        x: 3,
                                                        marker: "44 kg"
                                                    },
                                                    {
                                                        y: 46,
                                                        x: 4,
                                                        marker: "46 kg"
                                                    },
                                                    {
                                                        y: 35,
                                                        x: 5,
                                                        marker: "Today: 35 kg"
                                                    }
                                                ],
                                                label: "",
                                                config: {
                                                    mode: "CUBIC_BEZIER",
                                                    drawValues: false,
                                                    lineWidth: 2,
                                                    drawCircles: true,
                                                    circleColor: processColor(petrel),
                                                    drawCircleHole: false,
                                                    circleRadius: 5,
                                                    highlightColor: processColor("transparent"),
                                                    color: processColor(petrel),
                                                    drawFilled: true,
                                                    fillGradient: {
                                                        colors: [processColor('red'), processColor('yellow')],
                                                        positions: [0, 0.5],
                                                        angle: 90,
                                                        orientation: "TOP_BOTTOM"
                                                    },
                                                    fillAlpha: 1000,
                                                    valueTextSize: 15
                                                }
                                            }
                                        ]
                                    }}
                                    chartDescription={{ text: "" }}
                                    legend={{
                                        enabled: false
                                    }}
                                    marker={{
                                        enabled: true,
                                        markerColor: processColor("white"),
                                        textColor: processColor("black")
                                    }}
                                    xAxis={{
                                        enabled: true,
                                        granularity: 1,
                                        drawLabels: true,
                                        position: "BOTTOM",
                                        // drawAxisLine: true,
                                        drawGridLines: false,
                                        // fontFamily: "HelveticaNeue-Medium",
                                        // fontWeight: "bold",
                                        textSize: 12,
                                        textColor: processColor("gray"),
                                        valueFormatter: ["M", "T", "W", "T", "F", "S"]
                                    }}
                                    yAxis={{
                                        left: {
                                            enabled: false
                                        },
                                        right: {
                                            enabled: false
                                        }
                                    }}
                                    autoScaleMinMaxEnabled={true}
                                    animation={{
                                        durationX: 0,
                                        durationY: 1500,
                                        easingY: "EaseInOutQuart"
                                    }}
                                    drawGridBackground={false}
                                    drawBorders={false}
                                    touchEnabled={true}
                                    dragEnabled={true}
                                    scaleEnabled={true}
                                    scaleXEnabled={true}
                                    scaleYEnabled={true}
                                    pinchZoom={true}
                                    doubleTapToZoomEnabled={false}
                                    dragDecelerationEnabled={true}
                                    dragDecelerationFrictionCoef={0.99}
                                    keepPositionOnRotation={false}
                                    // onSelect={this.handleSelect.bind(this)}
                                    onChange={event => console.log(event.nativeEvent)}
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




{/* <VictoryChart
width={Layout.window.width}
height={Layout.window.width}
theme={VictoryTheme.material}
domainPadding={{ y: 10, x: 10 }}
containerComponent={<VictoryZoomContainer />}
>
<VictoryLine
    style={{ data: { stroke: '#0460d9', strokeWidth: 3 } }}
    data={line1Data}
    x="quarter"
    y="earnings"
/>




<VictoryPortal>
    <VictoryScatter
        labelComponent={<VictoryTooltip renderInPortal={false}/>}
        data={line1Data}
        x="quarter"
        y="earnings"
        size={2}
        style={{
            data: {
                fill: '#ff00ff',
            },
        }}
    />
</VictoryPortal>
</VictoryChart> */}