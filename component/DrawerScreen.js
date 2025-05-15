// import { DrawerContentScrollView } from "@react-navigation/drawer";
// import React, { useState } from "react";
// import {
//   Image,
//   ImageBackground,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { Overlay } from "@rneui/themed";
// import { Colors, Fonts, Sizes } from "../constant/styles";
// import { StatusBar } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { __getUser } from "../utils/localization";
// const DrawerScreen = (props) => {
//   const [selectedOptionIndex, setSelectedOptionIndex] = useState(1);
//   const [showLogoutDialog, setShowLogoutDialog] = useState(false);
//   const [expanded, setExpanded] = React.useState(true);

//   const handlePress = () => setExpanded(!expanded);

//   return (
//     <View style={{ flex: 1 }}>
//       <StatusBar
//         translucent={false}
//         backgroundColor={Colors.primaryColor}
//         barStyle={"light-content"}
//       />
//       {profileInfo()}
//       <DrawerContentScrollView
//         {...props}
//         contentContainerStyle={{
//           flexGrow: 1,
//           backgroundColor: Colors.primaryColor,
//         }}
//         showsVerticalScrollIndicator={false}
//       >
//         {drawerContent()}
//       </DrawerContentScrollView>
//       {logoutDialog()}
//     </View>
//   );

//   function logoutDialog() {
//     return (
//       <Overlay
//         isVisible={showLogoutDialog}
//         onBackdropPress={() => setShowLogoutDialog(false)}
//         overlayStyle={styles.dialogStyle}
//       >
//         <Text style={{ ...styles.logoutTextStyle }}>
//           Are you sure want to logout?
//         </Text>
//         <View style={{ flexDirection: "row", alignItems: "center" }}>
//           <TouchableOpacity
//             activeOpacity={0.99}
//             onPress={() => {
//               setShowLogoutDialog(false);
//             }}
//             style={{
//               marginRight: Sizes.fixPadding,
//               ...styles.dialogButtonStyle,
//             }}
//           >
//             <Text
//               style={{
//                 marginTop: Sizes.fixPadding - 7.0,
//                 lineHeight: 18.0,
//                 ...Fonts.primaryColor16SemiBold,
//               }}
//             >
//               Cancel
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             activeOpacity={0.99}
//             onPress={() => {
//               setShowLogoutDialog(false);
//               props.navigation.navigate("Login");

//               AsyncStorage.removeItem("login")
//                 .then((data) => {})
//                 .catch((error) => {});
//             }}
//             style={{
//               ...styles.dialogButtonStyle,
//               marginLeft: Sizes.fixPadding,
//               backgroundColor: Colors.primaryColor,
//             }}
//           >
//             <Text
//               style={{
//                 marginTop: Sizes.fixPadding - 7.0,
//                 lineHeight: 18.0,
//                 ...Fonts.whiteColor16SemiBold,
//               }}
//             >
//               Logout
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </Overlay>
//     );
//   }

//   function drawerContent() {
//     return <View style={styles.drawerContentWrapStyle}>{drawerOptions()}</View>;
//   }

//   function drawerOptions() {
//     return (
//       <View style={{ paddingTop: Sizes.fixPadding * 3.0 }}>
//         {otherOptions()}
//         {divider()}

//         {aboutOptions()}
//         {divider()}
//         {logoutOption()}
//       </View>
//     );
//   }

//   function logoutOption() {
//     return (
//       <TouchableOpacity
//         activeOpacity={0.99}
//         onPress={() => {
//           setShowLogoutDialog(true);
//         }}
//         style={{ ...styles.drawerOptionStyle, alignSelf: "flex-start" }}
//       >
//         <Image
//           source={require("../assets/images/user/user_1.jpg")}
//           style={{
//             ...styles.drawerIconsStyle,
//             tintColor: Colors.blackColor,
//           }}
//         />
//         <Text
//           style={{
//             marginTop: Sizes.fixPadding - 7.0,
//             lineHeight: 22.0,
//             marginLeft: Sizes.fixPadding + 5,
//             ...Fonts.blackColor14Medium,
//           }}
//         >
//           Logout
//         </Text>
//       </TouchableOpacity>
//     );
//   }

//   function divider() {
//     return <View style={styles.drawerDividerStyle} />;
//   }

//   function aboutOptions() {
//     return (
//       <View>
//         <Text
//           style={{
//             marginHorizontal: Sizes.fixPadding * 2.0,
//             ...Fonts.grayColor14Regular,
//           }}
//         >
//           About
//         </Text>
//         <View style={{ marginTop: Sizes.fixPadding + 5.0 }}>
//           {drawerOptionSort({
//             icon: require("../assets/images/user/user_1.jpg"),
//             option: "Privacy Policy",
//             index: 6,
//             navigateTo: "TermsAndConditions",
//             varable: { id: 1, name: "Privacy Policy" },
//           })}
//           {drawerOptionSort({
//             icon: require("../assets/images/user/user_1.jpg"),
//             option: "Terms & Conditions",
//             index: 7,
//             navigateTo: "TermsAndConditions",
//             varable: { id: 2, name: "Terms & Conditions" },
//           })}
//         </View>
//       </View>
//     );
//   }

//   function otherOptions() {
//     return (
//       <View>
//         {drawerOptionSort({
//           icon: require("../assets/images/user/user_1.jpg"),
//           option: "Customers",
//           index: 3,
//           navigateTo: null,
//         })}

//         <View style={{ marginLeft: 40 }}>
//           {drawerOptionSort({
//             icon: null,
//             option: "Profile",
//             index: 3,
//             navigateTo: "Profile",
//           })}
//           {drawerOptionSort({
//             icon: null,
//             option: "My Transaction",
//             index: 3,
//             navigateTo: "transition",
//           })}
//           {drawerOptionSort({
//             icon: null,
//             option: "Support",
//             index: 3,
//             navigateTo: "HelpAndSupport",
//           })}
//         </View>

//         {drawerOptionSort({
//           icon: require("../assets/images/user/user_1.jpg"),
//           option: "Notification",
//           index: 3,
//           navigateTo: "Notifications",
//         })}
//       </View>
//     );
//   }

//   function drawerOptionSort({ icon, option, index, navigateTo, varable }) {
//     return (
//       <TouchableOpacity
//         activeOpacity={0.99}
//         onPress={() => {
//           setSelectedOptionIndex(index);
//           navigateTo && props.navigation.navigate(navigateTo, { varable });
//           setSelectedOptionIndex(1);
//         }}
//         style={{
//           ...styles.drawerOptionStyle,
//           backgroundColor:
//             selectedOptionIndex == index
//               ? Colors.primaryColor
//               : Colors.whiteColor,
//           alignSelf: selectedOptionIndex == index ? "stretch" : "flex-start",
//           paddingVertical:
//             selectedOptionIndex == index ? Sizes.fixPadding : 0.0,
//         }}
//       >
//         {icon ? (
//           <Image
//             source={icon}
//             style={{
//               ...styles.drawerIconsStyle,
//               tintColor:
//                 selectedOptionIndex == index
//                   ? Colors.whiteColor
//                   : Colors.blackColor,
//             }}
//           />
//         ) : null}
//         <Text
//           style={{
//             marginTop: Sizes.fixPadding - 7.0,
//             lineHeight: 22.0,
//             marginLeft: Sizes.fixPadding + 5,
//             ...(selectedOptionIndex == index
//               ? { ...Fonts.whiteColor16Medium }
//               : { ...Fonts.blackColor14Medium }),
//           }}
//         >
//           {option}
//         </Text>
//       </TouchableOpacity>
//     );
//   }

//   function profileInfo() {
//     return (
//       <View style={styles.profileInfoWrapStyle}>
//         <ImageBackground
//           // source={
//           //   __getUser().profile
//           //     ? {
//           //         uri: "https://todo.xidmet.co.in" + __getUser().profile,
//           //       }
//           //     : require("../assets/images/user.png")
//           // }
//           source={require("../assets/images/user/user_1.jpg")}
//           style={{ ...styles.profileImageStyle }}
//         />
//         <View style={{ marginLeft: Sizes.fixPadding, flex: 1 }}>
//           <Text
//             numberOfLines={1}
//             style={{
//               lineHeight: 20.0,
//               ...Fonts.whiteColor15Medium,
//             }}
//           >
//             {__getUser().name}
//           </Text>
//           <Text
//             numberOfLines={1}
//             style={{
//               lineHeight: 15.0,
//               ...Fonts.whiteColor13Regular,
//             }}
//           >
//             {__getUser().email}
//           </Text>
//         </View>
//       </View>
//     );
//   }
// };

// const styles = StyleSheet.create({
//   drawerOptionStyle: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginRight: Sizes.fixPadding * 2.0,
//     borderTopRightRadius: Sizes.fixPadding * 3.0,
//     borderBottomRightRadius: Sizes.fixPadding * 3.0,
//     paddingHorizontal: Sizes.fixPadding * 2.0,
//     marginBottom: Sizes.fixPadding * 2.0,
//   },
//   profileInfoWrapStyle: {
//     backgroundColor: Colors.primaryColor,
//     flexDirection: "row",
//     alignItems: "center",
//     paddingTop: Sizes.fixPadding * 3.0,
//     paddingHorizontal: Sizes.fixPadding * 2.0,
//     paddingBottom: Sizes.fixPadding + 5.0,
//   },
//   profileImageStyle: {
//     width: 50.0,
//     height: 50.0,
//     resizeMode: "center",
//     borderRadius: 25.0,
//     backgroundColor: Colors.blackColor,
//     overflow: "hidden",
//   },
//   drawerContentWrapStyle: {
//     flex: 1,
//     backgroundColor: Colors.whiteColor,
//     elevation: 1.0,
//     shadowColor: Colors.lightGrayColor,
//   },

//   drawerDividerStyle: {
//     backgroundColor: Colors.lightGrayColor,
//     height: 1.0,
//     marginTop: Sizes.fixPadding + 5.0,
//     marginBottom: Sizes.fixPadding * 3.0,
//     marginHorizontal: Sizes.fixPadding * 2.0,
//   },
//   drawerIconsStyle: {
//     width: 22.0,
//     height: 22.0,
//     resizeMode: "contain",
//   },
//   dialogStyle: {
//     width: "90%",
//     backgroundColor: Colors.whiteColor,
//     borderRadius: Sizes.fixPadding - 5.0,
//     paddingHorizontal: Sizes.fixPadding * 2.0,
//     paddingVertical: Sizes.fixPadding + 5.0,
//   },
//   dialogButtonStyle: {
//     flex: 1,
//     borderColor: Colors.primaryColor,
//     borderWidth: 1.0,
//     borderRadius: Sizes.fixPadding - 5.0,
//     paddingVertical: Sizes.fixPadding + 2.0,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: Sizes.fixPadding * 2.0,
//   },
//   logoutTextStyle: {
//     marginTop: Sizes.fixPadding - 7.0,
//     lineHeight: 18.0,
//     textAlign: "center",
//     ...Fonts.blackColor16SemiBold,
//   },
// });

// export default DrawerScreen;
