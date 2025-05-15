import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const itemSize = screenWidth / 3 - 20;

const cities = [
  {
    name: "Hyderabad",
    properties: 2,
    image: require("../assets/hyderabad.jpg"),
  },
  {
    name: "Hi-Tech City",
    properties: 10,
    image: require("../assets/hitech.jpg"),
  },
  {
    name: "Gachibowli",
    properties: 1,
    image: require("../assets/gachibowli.jpg"),
  },
  {
    name: "Delhi",
    properties: 2,
    image: require("../assets/delhi.jpg"),
  },
  {
    name: "Alandi",
    properties: 3,
    image: require("../assets/alandi.jpg"),
  },
  {
    name: "Mumbai",
    properties: 2,
    image: require("../assets/mumbai.jpg"),
  },
  {
    name: "Andheri",
    properties: 1,
    image: require("../assets/andheri.jpg"),
  },
];

export default function CitiesGrid() {
  return (
    <FlatList
      data={cities}
      keyExtractor={(item) => item.name}
      numColumns={3}
      contentContainerStyle={{ paddingVertical: 20 }}
      renderItem={({ item }) => (
        <View style={styles.cityItem}>
          <Image source={item.image} style={styles.cityImage} />
          <Text style={styles.cityName}>{item.name}</Text>
          <Text style={styles.propertyCount}>
            {item.properties} + Properties
          </Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  cityItem: {
    width: itemSize,
    alignItems: "center",
    margin: 10,
  },
  cityImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    resizeMode: "cover",
    marginBottom: 8,
  },
  cityName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  propertyCount: {
    fontSize: 12,
    color: "#555",
    marginTop: 2,
  },
});
