import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from "react-native";
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
const Stack = createStackNavigator();

import Layout from './constants/Layout';
import Colors from './constants/Colors';

import Login from './screens/Login';
import Main from './screens/Main';
import MenuPage from './screens/MenuPage';
import CramList from './screens/CramList';
import CramListParents from './screens/CramListParents';
import CramDetail from './screens/CramDetail';
import AlarmList from './screens/AlarmList';
import MyInfo from './screens/del';
import AttendChart from './screens/AttendChart';
import InfoUpdate from './screens/InfoUpdate';
import Notidetail from './screens/Notidetail';
import ChildList from './screens/ChildList';
import PicList from './screens/PicList';



const CustomHeader = () => {
    const route = useRoute();
    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <View style={styles.viewTopBar}>
                <View style={styles.viewTopBarLeft}>
                    <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                        <Image
                            source={require('./img/btn_back_white.png')}
                            style={{ width: 30, height: 30, marginLeft: 10, tintColor: Colors.baseTextLightGray }}
                            resizeMode='contain' />
                    </TouchableOpacity>
                </View>

                <View style={styles.viewTopBarCenter}>
                    <Text style={{ fontSize: Layout.fsM, color: '#000000' }}>{route.params.topTitle}</Text>
                </View>

                <View style={styles.viewTopBarRight}>
                </View>
            </View>
        </SafeAreaView>
    );
}

function Navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerShown: false, gestureEnabled: false }}
                />
                <Stack.Screen
                    name="Main"
                    component={Main}
                    options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerShown: false, gestureEnabled: false }}
                />
                <Stack.Screen
                    name="MenuPage"
                    component={MenuPage}
                    options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, headerShown: false, gestureEnabled: false }}
                />
                <Stack.Screen
                    name="Notidetail"
                    component={Notidetail}
                    options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerShown: false, gestureEnabled: false }}
                    initialParams={{
                        detailItem: { reg_date: "", target_type: "", title: "", contents: "", file_nm: "" }
                    }}
                />
                <Stack.Screen
                    name="InfoUpdate"
                    component={InfoUpdate}
                    options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerShown: false }}
                    initialParams={{ isJoin: false, uniq_key: "", easy_type: "" }}
                />
                <Stack.Screen
                    name="CramList"
                    component={CramList}
                    options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerShown: false }}
                />
                <Stack.Screen
                    name="CramListParents"
                    component={CramListParents}
                    options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerShown: false }}
                    initialParams={{ arrData: [] }}
                />
                <Stack.Screen
                    name="CramDetail"
                    component={CramDetail}
                    options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerShown: false }}
                    initialParams={{ biz_no: "" }}
                />
                <Stack.Screen
                    name="AlarmList"
                    component={AlarmList}
                    options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerShown: false }}
                />
                <Stack.Screen
                    name="MyInfo"
                    component={MyInfo}
                    options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerShown: false }}
                />
                <Stack.Screen
                    name="AttendChart"
                    component={AttendChart}
                    options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerShown: false }}
                />
                <Stack.Screen
                    name="ChildList"
                    component={ChildList}
                    options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerShown: false }}
                />
                <Stack.Screen
                    name="PicList"
                    component={PicList}
                    options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    viewTopBar: {
        width: '100%',
        height: Layout.window.topBarHeight,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderColor: Colors.grayLine,
        backgroundColor: Colors.defaultBg
    },
    viewTopBarLeft: {
        flex: 1,
        height: Layout.window.topBarHeight,
        justifyContent: 'center',
    },
    viewTopBarCenter: {
        flex: 1.5,
        height: Layout.window.topBarHeight,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewTopBarRight: {
        flex: 1,
        height: Layout.window.topBarHeight,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 10,
    },
});


export default Navigator;
