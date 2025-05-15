import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Modal, Dimensions, ScrollView, TouchableOpacity, Platform } from "react-native";
import { Fonts, Colors, Sizes, CommonStyles } from "../../../constant/styles";
import { Switch } from 'react-native-paper';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "expo-router";

const { width } = Dimensions.get('screen');

const SettingScreen = () => {

    const navigation = useNavigation();

    const [state, setState] = useState({
        matchedPropertySwitch: true,
        newLaunchedPropertySwitch: false,
        newPropertySwitch: false,
        isLogout: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        matchedPropertySwitch,
        newLaunchedPropertySwitch,
        newPropertySwitch,
        isLogout,
    } = state;

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            {header()}
            <ScrollView
                automaticallyAdjustKeyboardInsets={true}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
            >
                {userInfo()}
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.push('myListing/myListingScreen')}
                >
                    {moreInfo({ info: 'My Listing' })}
                </TouchableOpacity>
                {title({ title: 'ABOUT' })}
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.push('privacyPolicy/privacyPolicyScreen')}
                >
                    {moreInfo({ info: 'Privacy Policy' })}
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.push('termsOfUse/termsOfUseScreen')}
                >
                    {moreInfo({ info: 'Terms of use' })}
                </TouchableOpacity>
                {title({ title: 'Manage Notification' })}
                {matchedPropertyNotification({ info: 'For Matched Properties' })}
                {newLanchedPropertyNotification({ info: 'For New Launched Properties' })}
                {newPropertyNotification({ info: 'For Property News' })}
                {title({ title: 'APP' })}
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.push('support/supportScreen')}
                >
                    {moreInfo({ info: 'Support' })}
                </TouchableOpacity>

                {moreInfo({ info: 'Report a Bug' })}
                {moreInfo({ info: 'App Version 1.0' })}
                {logOutInfo()}
            </ScrollView>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('addNewListing/addNewListingScreen')}
                style={styles.floatingButtonStyle}
            >
                <MaterialIcons name="add" size={35} color={Colors.whiteColor} />
            </TouchableOpacity>
            {logOutDialog()}
        </View>
    )

    function logOutDialog() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={isLogout}
                onRequestClose={() => { updateState({ isLogout: false }) }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => { updateState({ isLogout: false }) }}
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <View style={{ justifyContent: "center", flex: 1 }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { }}
                            style={{ ...styles.dialogContainerStyle }}
                        >
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ ...Fonts.blackColor16Bold, paddingBottom: Sizes.fixPadding - 5.0, }}>
                                    You sure want to logout?
                                </Text>
                                <View style={styles.cancelAndLogoutButtonWrapStyle}>
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        onPress={() => updateState({ isLogout: false })}
                                        style={styles.cancelButtonStyle}
                                    >
                                        <Text style={{ ...Fonts.blackColor14Medium }}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.9}
                                        onPress={() => {
                                            updateState({ isLogout: false })
                                            navigation.push('auth/loginScreen')
                                        }}
                                        style={styles.logOutButtonStyle}
                                    >
                                        <Text style={{ ...Fonts.whiteColor14Medium }}>Log out</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    function logOutInfo() {
        return (
            <TouchableOpacity
                onPress={() => updateState({ isLogout: true })}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: Sizes.fixPadding * 2.0
                }}
            >
                <MaterialCommunityIcons name="login-variant" size={24} color="#FF0000" />
                <Text style={{ ...Fonts.redColor14Medium, marginLeft: Sizes.fixPadding }}>
                    Logout
                </Text>
            </TouchableOpacity>
        )
    }

    function newPropertyNotification({ info }) {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <View style={styles.infoWithSwitchWrapStyle}>
                    <View style={{ width: width - 80, }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor14Medium }}>
                            {info}
                        </Text>
                    </View>
                    <Switch
                        value={newPropertySwitch}
                        color={newPropertySwitch ? Colors.primaryColor : 'rgba(128, 128, 128, 0.3)'}
                        onValueChange={() => { updateState({ newPropertySwitch: !newPropertySwitch }) }}
                        style={{
                            transform: [{ scale: Platform.OS == 'ios' ? 0.6 : 1 }],
                            marginBottom: Platform.OS == 'ios' ? Sizes.fixPadding : 0
                        }}
                    />
                </View>
                {divider()}
            </View>
        )
    }

    function newLanchedPropertyNotification({ info }) {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <View style={styles.infoWithSwitchWrapStyle}>
                    <View style={{ width: width - 80, }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor14Medium }}>
                            {info}
                        </Text>
                    </View>
                    <Switch
                        value={newLaunchedPropertySwitch}
                        color={newLaunchedPropertySwitch ? Colors.primaryColor : 'rgba(128, 128, 128, 0.3)'}
                        onValueChange={() => { updateState({ newLaunchedPropertySwitch: !newLaunchedPropertySwitch }) }}
                        style={{
                            transform: [{ scale: Platform.OS == 'ios' ? 0.6 : 1 }],
                            marginBottom: Platform.OS == 'ios' ? Sizes.fixPadding : 0
                        }}
                    />
                </View>
                {divider()}
            </View>
        )
    }

    function divider() {
        return (
            <View style={{
                backgroundColor: 'rgba(128, 128, 128, 0.5)', height: 0.8,
                marginVertical: Sizes.fixPadding,
            }}>
            </View>
        )
    }

    function matchedPropertyNotification({ info }) {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <View style={styles.infoWithSwitchWrapStyle}>
                    <View style={{ width: width - 80, }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor14Medium }}>
                            {info}
                        </Text>
                    </View>
                    <Switch
                        value={matchedPropertySwitch}
                        color={matchedPropertySwitch ? Colors.primaryColor : 'rgba(128, 128, 128, 0.3)'}
                        onValueChange={() => { updateState({ matchedPropertySwitch: !matchedPropertySwitch }) }}
                        style={{
                            transform: [{ scale: Platform.OS == 'ios' ? 0.6 : 1 }],
                            marginBottom: Platform.OS == 'ios' ? Sizes.fixPadding : 0
                        }}
                    />
                </View>
                {divider()}
            </View>
        )
    }

    function title({ title }) {
        return (
            <Text
                numberOfLines={1}
                style={{
                    ...Fonts.blackColor12Regular,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    marginVertical: Sizes.fixPadding
                }}>
                {title}
            </Text>
        )
    }

    function moreInfo({ info }) {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: width - 80, }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor14Medium }}>
                            {info}
                        </Text>
                    </View>
                    <MaterialIcons name="arrow-forward-ios" size={15} color={Colors.blackColor} />
                </View>
                {divider()}
            </View>
        )
    }

    function userInfo() {
        return (
            <View style={styles.userInfoContentStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../../../assets/images/user/user_5.jpg')}
                        style={{
                            height: 80.0, width: 80.0,
                            borderRadius: 40.0,
                        }}
                    />
                    <View style={{
                        width: width - 200,
                        marginLeft: Sizes.fixPadding * 2.0
                    }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor18Bold }}>
                            Stella French
                        </Text>
                    </View>

                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.push('editProfile/editProfileScreen')}
                    style={styles.editButtonStyle}>
                    <MaterialIcons name="edit" size={24} color={Colors.whiteColor} />
                </TouchableOpacity>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerStyle}>
                <Text style={{ ...Fonts.primaryColor18Bold }}>Settings</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cancelAndLogoutButtonWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding,
    },
    headerStyle: {
        height: 60.0,
        elevation: 5.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        ...CommonStyles.shadow
    },
    userInfoContentStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding * 2.0,
    },
    editButtonStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor
    },
    floatingButtonStyle: {
        height: 60.0,
        width: 60.0,
        backgroundColor: Colors.primaryColor,
        borderRadius: 30.0,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 20.0,
        bottom: 20.0,
    },
    dialogContainerStyle: {
        backgroundColor: Colors.whiteColor,
        width: '85%',
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding * 2.0
    },
    cancelButtonStyle: {
        flex: 0.45,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        borderColor: Colors.blackColor,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding - 7.0,
    },
    logOutButtonStyle: {
        flex: 0.45,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 7.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding + 5.0,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
    },
    infoWithSwitchWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: -10.0
    }
})

export default SettingScreen;