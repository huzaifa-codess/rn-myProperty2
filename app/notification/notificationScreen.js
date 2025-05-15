import React, { useState, useRef } from 'react';
import { Fonts, Colors, Sizes, CommonStyles } from "../../constant/styles";
import {
    Text,
    View,
    StyleSheet,
    Animated,
    Dimensions,
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';
import MyStatusBar from '../../component/myStatusBar';
import { useNavigation } from 'expo-router';

const { width } = Dimensions.get('screen');

const notificationList = [
    {
        key: '1',
        name: 'Your listing approved!',
        description: 'Congratulations... Your listing has been approved..',

    },
    {
        key: '2',
        name: 'Your listing rejected!',
        description: 'We are sorry... Your listing are rejected. You need to do some changes..',
    },
];

const rowTranslateAnimatedValues = {};

const NotificationScreen = () => {

    const navigation = useNavigation();

    const [showSnackBar, setShowSnackBar] = useState(false);

    const [snackBarMsg, setSnackBarMsg] = useState('');

    const [listData, setListData] = useState(notificationList);

    Array(listData.length + 1)
        .fill('')
        .forEach((_, i) => {
            rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
        });

    const animationIsRunning = useRef(false);

    const onSwipeValueChange = swipeData => {

        const { key, value } = swipeData;

        if ((value < -Dimensions.get('window').width || value > Dimensions.get('window').width) && !animationIsRunning.current) {
            animationIsRunning.current = true;
            Animated.timing(rowTranslateAnimatedValues[key], {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start(() => {

                const newData = [...listData];
                const prevIndex = listData.findIndex(item => item.key === key);
                newData.splice(prevIndex, 1);
                const removedItem = listData.find(item => item.key === key);

                setSnackBarMsg(`${removedItem.name} dismissed`);

                setListData(newData);

                setShowSnackBar(true);

                animationIsRunning.current = false;
            });
        }
    };

    const renderItem = data => (
        <Animated.View
            style={[
                {
                    height: rowTranslateAnimatedValues[
                        data.item.key
                    ].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 108],
                    }),
                },
            ]}
        >
            <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <View style={styles.notificationContentStyle}>
                    <View style={styles.notificationIconContentStyle}>
                        <MaterialIcons name="notifications" size={28} color={Colors.whiteColor} />
                    </View>
                    <View style={{
                        marginLeft: Sizes.fixPadding + 5.0,
                        width: width - 140,
                    }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
                            {data.item.name}
                        </Text>
                        <Text numberOfLines={2} style={{ ...Fonts.blackColor14Regular, marginTop: Sizes.fixPadding - 5.0 }}>
                            {data.item.description}
                        </Text>
                    </View>
                </View>
            </View>
        </Animated.View>
    );

    const renderHiddenItem = () => (
        <View style={styles.rowBack}>
        </View>
    );

    function header() {
        return (
            <View style={styles.headerContentStyle}>
                <MaterialIcons
                    name="arrow-back"
                    size={24}
                    color="black"
                    onPress={() => navigation.pop()}
                    style={{ position: 'absolute', left: 20.0, }}
                />
                <Text style={{
                    ...Fonts.blackColor18Bold,
                    alignSelf: 'center',
                    justifyContent: 'center'
                }}>
                    Notifications
                </Text>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, }}>
            <MyStatusBar />
            <View style={styles.container}>
                {header()}
                {listData.length == 0 ?
                    <View style={{
                        flex: 1,
                        alignItems: 'center', justifyContent: 'center',
                    }}>
                        <MaterialIcons name="notifications-off" size={50} color={Colors.grayColor} />
                        <Text style={{ ...Fonts.grayColor18Bold, marginTop: Sizes.fixPadding * 2.0 }}>
                            No new notifications
                        </Text>
                    </View>
                    :
                    <SwipeListView
                        data={listData}
                        renderItem={renderItem}
                        renderHiddenItem={renderHiddenItem}
                        rightOpenValue={-Dimensions.get('window').width}
                        leftOpenValue={Dimensions.get('window').width}
                        onSwipeValueChange={onSwipeValueChange}
                        useNativeDriver={false}
                        contentContainerStyle={{ paddingVertical: Sizes.fixPadding + 2.0 }}
                    />
                }
                <Snackbar
                    style={styles.snackBarStyle}
                    visible={showSnackBar}
                    onDismiss={() => setShowSnackBar(false)}
                >
                    {snackBarMsg}
                </Snackbar>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContentStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60.0,
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        elevation: 10.0,
        ...CommonStyles.shadow
    },
    notificationContentStyle: {
        height: 91.0,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: 'rgba(128, 128, 128, 0.05)',
        borderWidth: 1.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding - 5.0,
        borderRadius: Sizes.fixPadding,
        ...CommonStyles.shadow,
        elevation: 2.0,
        paddingLeft: Sizes.fixPadding,
    },
    notificationIconContentStyle: {
        height: 60.0,
        width: 60.0,
        backgroundColor: Colors.primaryColor,
        borderRadius: 30.0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: Colors.whiteColor,
        flex: 1,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'red',
        flex: 1,
        marginTop: Sizes.fixPadding - 3.0,
        marginBottom: Sizes.fixPadding + 2.0,
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: -10.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333'
    }
});

export default NotificationScreen;