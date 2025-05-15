import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Fonts, Colors, Sizes, CommonStyles } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import MyStatusBar from "../../component/myStatusBar";
import { useNavigation } from "expo-router";

const PrivacyPolicyScreen = () => {

    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0 }}
                >
                    {dummyText()}
                    {dummyText()}
                    {dummyText()}
                </ScrollView>
            </View>
        </View>
    )

    function dummyText() {
        return (
            <Text
                style={{
                    ...Fonts.blackColor14Medium,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    marginBottom: Sizes.fixPadding,
                }}
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, venenatis leo ante morbi magnis porttitor. Massa ut mauris id aliquam at dapibus dignissim aliquam. In porta arcu, purus amet ipsum, aliquet tortor. Amet, bibendum erat iaculis in ipsum integer.
            </Text>
        )
    }

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
                    Privacy Policy
                </Text>
            </View>
        )
    }
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
})

export default PrivacyPolicyScreen;