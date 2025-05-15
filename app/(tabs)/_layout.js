import { Tabs } from 'expo-router';
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, BackHandler, Text, Pressable } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { useFocusEffect } from '@react-navigation/native';
import MyStatusBar from "../../component/myStatusBar";

export default function TabLayout() {

  const backAction = () => {
    backClickCount == 1 ? BackHandler.exitApp() : _spring();
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", backAction);
      };
    }, [backAction])
  );

  function _spring() {
    setBackClickCount(1)
    setTimeout(() => {
      setBackClickCount(0)
    }, 1000)
  }

  const [backClickCount, setBackClickCount] = useState(0);

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.primaryColor,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: { ...styles.bottomTabBarStyle },
          tabBarButton: (props) => (
            <Pressable
                {...props}
                android_ripple={{
                    color: Colors.whiteColor,
                }}
            />
        ),

        }}
      >
        <Tabs.Screen
          name="home/homeScreen"
          options={{
            tabBarIcon: ({ focused }) => (
              bottomTabBarItem({
                focused: focused,
                iconName: "home",
              })
            ),
          }}
        />
        <Tabs.Screen
          name="chat/chatScreen"
          options={{
            tabBarIcon: ({ focused }) => (
              bottomTabBarItem({
                focused: focused,
                iconName: "chat",
              })
            ),
          }}
        />
        <Tabs.Screen
          name="shortlist/shortlistScreen"
          options={{
            tabBarIcon: ({ focused }) => (
              bottomTabBarItem({
                focused: focused,
                iconName: "favorite",
              })
            ),
          }}
        />
        <Tabs.Screen
          name="setting/settingScreen"
          options={{
            tabBarIcon: ({ focused }) => (
              bottomTabBarItem({
                focused: focused,
                iconName: "settings",
              })
            ),
          }}
        />
      </Tabs>
      {
        backClickCount == 1
          ?
          <View style={styles.animatedView}>
            <Text style={{ ...Fonts.whiteColor12Regular }}>
              Press Back Once Again to Exit
            </Text>
          </View>
          :
          null
      }
    </View>
  );

  function bottomTabBarItem({ focused, iconName }) {
    return (
      <View style={focused ? styles.bottomTabSelectedIconStyle : null}>
        <MaterialIcons name={iconName} size={24} color={Colors.primaryColor} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bottomTabBarStyle: {
    height: 60.0,
    backgroundColor: Colors.whiteColor,
    borderTopColor: 'rgba(128, 128, 128, 0.2)',
    borderTopWidth: 1.0,
    elevation: 2.0,
    paddingTop:Sizes.fixPadding
  },
  bottomTabSelectedIconStyle: {
    height: 40.0,
    width: 40.0,
    borderRadius: 20.0,
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  animatedView: {
    backgroundColor: "#333333",
    position: "absolute",
    bottom: 40,
    alignSelf: 'center',
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
  },
})

