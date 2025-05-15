// import React from "react";
// import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
// import {
//   DrawerContentScrollView,
//   DrawerItemList,
// } from "@react-navigation/drawer";

// const CustomDrawer = (props) => {
//   return (
//     <View style={{ flex: 1 }}>
//       <DrawerContentScrollView
//         {...props}
//         contentContainerStyle={{ backgroundColor: "#004aad" }}
//       >
//         <View style={styles.profileSection}>
//           <Image
//             source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
//             style={styles.profileImage}
//           />
//           <Text style={styles.profileName}>Welcome, Zamindar</Text>
//         </View>

//         <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
//           {/* ✅ This line requires `props.state.routes` to exist */}
//           <DrawerItemList {...props} />
//         </View>
//       </DrawerContentScrollView>

//       <View style={styles.logoutSection}>
//         <TouchableOpacity onPress={() => alert("Logging out")}>
//           <Text style={styles.logoutText}>Logout</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default CustomDrawer;

// const styles = StyleSheet.create({
//   profileSection: {
//     padding: 20,
//     alignItems: "center",
//   },
//   profileImage: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     marginBottom: 10,
//   },
//   profileName: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   logoutSection: {
//     padding: 20,
//     borderTopWidth: 1,
//     borderColor: "#ccc",
//   },
//   logoutText: {
//     color: "#004aad",
//     fontWeight: "bold",
//   },
// });

// // import React from "react";
// // import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
// // import {
// //   DrawerContentScrollView,
// //   DrawerItemList,
// // } from "@react-navigation/drawer";
// // import { useRouter } from "expo-router";

// // const CustomDrawer = (props) => {
// //   const router = useRouter();

// //   return (
// //     <View style={{ flex: 1 }}>
// //       <DrawerContentScrollView
// //         {...props}
// //         contentContainerStyle={{ backgroundColor: "#004aad" }}
// //       >
// //         <View style={styles.profileSection}>
// //           <Image
// //             source={{
// //               uri: "https://randomuser.me/api/portraits/men/1.jpg",
// //             }}
// //             style={styles.profileImage}
// //           />
// //           <Text style={styles.profileName}>Welcome, Zamindar</Text>
// //         </View>

// //         <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
// //           <DrawerItemList {...props} />
// //         </View>
// //       </DrawerContentScrollView>

// //       <View style={styles.logoutSection}>
// //         <TouchableOpacity onPress={() => router.push("/auth/loginScreen")}>
// //           <Text style={styles.logoutText}>Logout</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   profileSection: {
// //     padding: 20,
// //     alignItems: "center",
// //   },
// //   profileImage: {
// //     height: 80,
// //     width: 80,
// //     borderRadius: 40,
// //     marginBottom: 10,
// //     borderWidth: 2,
// //     borderColor: "#fff",
// //   },
// //   profileName: {
// //     color: "#fff",
// //     fontSize: 18,
// //     fontWeight: "bold",
// //   },
// //   logoutSection: {
// //     padding: 20,
// //     borderTopWidth: 1,
// //     borderTopColor: "#ccc",
// //   },
// //   logoutText: {
// //     fontSize: 16,
// //     fontWeight: "bold",
// //     color: "red",
// //   },
// // });

// // export default CustomDrawer;
