import React, { useState, useCallback } from "react";
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Sizes, Fonts } from "../../constant/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "expo-router";

const RegisterScreen = () => {
  const navigation = useNavigation();

  const backAction = () => {
    navigation.push("auth/loginScreen");
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [backAction])
  );

  const [state, setState] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { userName, email, password, confirmPassword } = state;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../../assets/images/screen.png")}
        resizeMode="stretch"
      >
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          colors={["black", "rgba(0,0.10,0,0.77)", "rgba(0,0,0,0.1)"]}
          style={{ flex: 1, paddingHorizontal: Sizes.fixPadding * 2.0 }}
        >
          <ScrollView
            automaticallyAdjustKeyboardInsets={true}
            showsVerticalScrollIndicator={false}
          >
            {backArrow()}
            {registerInfo()}
            {userNameTextField()}
            {emailTextField()}
            {passwordTextField()}
            {confirmPasswordTextField()}
            {continueButton()}
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );

  function continueButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          navigation.push("(tabs)");
        }}
      >
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={[
            "rgba(16,84,124, 0.8)",
            "rgba(16,84,124, 0.6)",
            "rgba(16,84,124, 0.4)",
          ]}
          style={styles.continueButtonStyle}
        >
          <Text style={{ ...Fonts.whiteColor18Medium }}>Continue</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  function confirmPasswordTextField() {
    return (
      <TextInput
        style={{ ...Fonts.whiteColor14Medium, ...styles.textFieldContentStyle }}
        value={confirmPassword}
        secureTextEntry={true}
        onChangeText={(text) => updateState({ confirmPassword: text })}
        placeholder="Confirm Password"
        placeholderTextColor="white"
        cursorColor={Colors.primaryColor}
        selectionColor={Colors.primaryColor}
        textContentType="oneTimeCode"
      />
    );
  }

  function passwordTextField() {
    return (
      <TextInput
        style={{ ...Fonts.whiteColor14Medium, ...styles.textFieldContentStyle }}
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => updateState({ password: text })}
        placeholder="Password"
        placeholderTextColor="white"
        cursorColor={Colors.primaryColor}
        selectionColor={Colors.primaryColor}
        textContentType="oneTimeCode"
      />
    );
  }

  function emailTextField() {
    return (
      <TextInput
        style={{ ...Fonts.whiteColor14Medium, ...styles.textFieldContentStyle }}
        value={email}
        onChangeText={(text) => updateState({ email: text })}
        placeholder="Email"
        placeholderTextColor="white"
        keyboardType="email-address"
        cursorColor={Colors.primaryColor}
        selectionColor={Colors.primaryColor}
      />
    );
  }

  function userNameTextField() {
    return (
      <TextInput
        style={{ ...Fonts.whiteColor14Medium, ...styles.textFieldContentStyle }}
        value={userName}
        onChangeText={(text) => updateState({ userName: text })}
        placeholder="Username"
        placeholderTextColor="white"
        cursorColor={Colors.primaryColor}
        selectionColor={Colors.primaryColor}
      />
    );
  }

  function backArrow() {
    return (
      <MaterialIcons
        name="arrow-back"
        size={24}
        color={Colors.whiteColor}
        style={{
          marginTop: Sizes.fixPadding * 7.0,
          marginBottom: Sizes.fixPadding,
          alignSelf: "flex-start",
        }}
        onPress={() => navigation.push("auth/loginScreen")}
      />
    );
  }

  function registerInfo() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding * 3.0,
          marginBottom: Sizes.fixPadding * 4.0,
        }}
      >
        <Text style={{ ...Fonts.whiteColor36SemiBold }}>Register</Text>
        <Text
          style={{
            ...Fonts.whiteColor14Regular,
            marginTop: Sizes.fixPadding - 15.0,
          }}
        >
          Create account
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  textFieldContentStyle: {
    alignItems: "center",
    justifyContent: "center",
    height: 55.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    backgroundColor: "rgba(128, 128, 128, 0.8)",
    borderRadius: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.5,
  },
  continueButtonStyle: {
    borderRadius: Sizes.fixPadding * 2.0,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Sizes.fixPadding + 10.0,
    height: 56.0,
    marginBottom: Sizes.fixPadding * 2.0,
  },
});

export default RegisterScreen;
