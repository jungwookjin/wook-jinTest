import React, { Component, useCallback } from 'react';
import { Platform, StyleSheet, Alert, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { ExpandableCalendar, CalendarProvider } from 'react-native-calendars';
import Layout from '../constants/Layout';




export default class Main extends Component {

    onDateChanged = (/* date, updateSource */) => {
        console.log('ExpandableCalendarScreen onDateChanged: ');
        // fetch and set data for date + week ahead
    };

    onMonthChange = (/* month, updateSource */) => {
        console.log('ExpandableCalendarScreen onMonthChange: ');
    };


    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <CalendarProvider
                    onDateChanged={this.onDateChanged}
                    onMonthChange={this.onMonthChange}
                    disabledOpacity={0.6}
                    date={"2021-05-28"}
                // showTodayButton
                // todayBottomMargin={16}
                // theme={this.todayBtnTheme}
                >
                    <ExpandableCalendar
                        // horizontal={false}
                        hideArrows
                        disablePan
                        hideKnob
                        // initialPosition={ExpandableCalendar.positions.OPEN}
                        // calendarStyle={styles.calendar}
                        // headerStyle={styles.calendar} // for horizontal only
                        // disableWeekScroll
                        scrollEnabled={false}
                        // theme={this.theme}
                        // disableAllTouchEventsForDisabledDays
                        // firstDay={1}
                        hideExtraDays={true}
                        // markedDates={{ "2021-05-28": { "marked": true }, "2021-05-31": { "marked": true }, "2021-06-01": { "marked": true }, "2021-06-02": { "marked": true }, "2021-06-03": { "disabled": true }, "2021-06-04": { "marked": true }, "2021-06-05": { "marked": true }, "2021-06-06": { "disabled": true }, "2021-06-07": { "marked": true }, "2021-06-08": { "marked": true }, "2021-06-09": { "marked": true } }}
                    // leftArrowImageSource={leftArrowIcon}
                    // rightArrowImageSource={rightArrowIcon}
                    animateScroll
                    />
                    <View style={{ width: Layout.window.width, flex: 1, backgroundColor: '#ff00ff' }}></View>
                </CalendarProvider>

            </SafeAreaView>
        );
    }
}




function getTheme() {
    const disabledColor = 'grey';

    return {
        // arrows
        arrowColor: 'black',
        arrowStyle: { padding: 0 },
        // month
        monthTextColor: 'black',
        textMonthFontSize: 16,
        textMonthFontFamily: 'HelveticaNeue',
        textMonthFontWeight: 'bold',
        // day names
        textSectionTitleColor: 'black',
        textDayHeaderFontSize: 12,
        textDayHeaderFontFamily: 'HelveticaNeue',
        textDayHeaderFontWeight: 'normal',
        // dates
        dayTextColor: '#00AAAF',
        textDayFontSize: 18,
        textDayFontFamily: 'HelveticaNeue',
        textDayFontWeight: '500',
        textDayStyle: { marginTop: Platform.OS === 'android' ? 2 : 4 },
        // selected date
        selectedDayBackgroundColor: '#00AAAF',
        selectedDayTextColor: 'white',
        // disabled date
        textDisabledColor: disabledColor,
        // dot (marked date)
        dotColor: '#00AAAF',
        selectedDotColor: 'white',
        disabledDotColor: disabledColor,
        dotStyle: { marginTop: -2 }
    };
}

