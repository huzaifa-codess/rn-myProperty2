import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Fonts, Colors, Sizes, CommonStyles } from "../../../constant/styles";
import { Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native"; // ✅ drawer compatible
import { router } from "expo-router";
import CitiesGrid from "../../../component/CitiesGrid";

const nearByPropertyList = [
  {
    id: "1",
    properyImage: require("../../../assets/images/house/house_1.jpg"),
    propertyName: "Sky View House",
    propertyAddress: "Opera Street, New York",
    propertyAmount: "360000",
    isFavourit: false,
  },
  {
    id: "2",
    properyImage: require("../../../assets/images/house/house_2.jpg"),
    propertyName: "Vraj House",
    propertyAddress: "Yogi Street, New York",
    propertyAmount: "920000",
    isFavourit: false,
  },
  {
    id: "3",
    properyImage: require("../../../assets/images/house/house_3.jpg"),
    propertyName: "Yogi Villa",
    propertyAddress: "Opera Street, New York",
    propertyAmount: "490000",
    isFavourit: false,
  },
  {
    id: "4",
    properyImage: require("../../../assets/images/house/house_5.jpg"),
    propertyName: "Sky View House",
    propertyAddress: "Opera Street, New York",
    propertyAmount: "300000",
    isFavourit: false,
  },
  {
    id: "5",
    properyImage: require("../../../assets/images/house/house_6.jpg"),
    propertyName: "Sky View House",
    propertyAddress: "Opera Street, New York",
    propertyAmount: "360000",
    isFavourit: false,
  },
];

const featuredPropertyList = [
  {
    id: "1",
    properyImage: require("../../../assets/images/house/house_1.jpg"),
    propertyName: "Sky View House",
    propertyAddress: "Opera Street, New York",
    propertyAmount: "360000",
    isFavourit: false,
  },
  {
    id: "2",
    properyImage: require("../../../assets/images/house/house_2.jpg"),
    propertyName: "Vraj House",
    propertyAddress: "Yogi Street, New York",
    propertyAmount: "920000",
    isFavourit: false,
  },
  {
    id: "3",
    properyImage: require("../../../assets/images/house/house_3.jpg"),
    propertyName: "Yogi Villa",
    propertyAddress: "Opera Street, New York",
    propertyAmount: "490000",
    isFavourit: false,
  },
  {
    id: "4",
    properyImage: require("../../../assets/images/house/house_5.jpg"),
    propertyName: "Sky View House",
    propertyAddress: "Opera Street, New York",
    propertyAmount: "300000",
    isFavourit: false,
  },
  {
    id: "5",
    properyImage: require("../../../assets/images/house/house_6.jpg"),
    propertyName: "Sky View House",
    propertyAddress: "Opera Street, New York",
    propertyAmount: "360000",
    isFavourit: false,
  },
];

const { width } = Dimensions.get("screen");

const HomeScreen = () => {
  const navigation = useNavigation();

  const [state, setState] = useState({
    activeButton: "all", // default active button
    nearbyProperyChangableList: nearByPropertyList,
    featuredPropertyChangableList: featuredPropertyList,
    showSnackBar: false,
    isInWishList: false,
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const {
    activeButton,
    nearbyProperyChangableList,
    featuredPropertyChangableList,
    showSnackBar,
    isInWishList,
  } = state;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.push("property/propertyScreen", {
          propertyImage: item.properyImage,
          propertyName: item.propertyName,
          propertyAddress: item.propertyAddress,
          propertyAmount: item.propertyAmount,
        })
      }
      style={styles.featuredPropertyContentStyle}
    >
      <Image
        source={item.properyImage}
        resizeMode="cover"
        style={styles.featuredPropertyImageStyle}
      />
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          handleFeaturedPropertyUpdate({ id: item.id });
          updateState({ isInWishList: item.isFavourit, showSnackBar: true });
        }}
        style={styles.addToFavouriteContainerStyle}
      >
        <MaterialIcons
          name={item.isFavourit ? "favorite" : "favorite-border"}
          size={16}
          color={Colors.grayColor}
        />
      </TouchableOpacity>
      <View style={styles.featuredPropertyInfoContentStyle}>
        <View style={{ width: width / 1.9 }}>
          <Text style={{ ...Fonts.blackColor14SemiBold }}>
            {item.propertyName}
          </Text>
          <Text numberOfLines={1} style={{ ...Fonts.grayColor12Medium }}>
            {item.propertyAddress}
          </Text>
        </View>
        <View style={styles.featuredPropertyAmountContentStyle}>
          <Text style={{ ...Fonts.blackColor16SemiBold }}>
            {item.propertyAmount}₹
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      {header()}
      <FlatList
        ListHeaderComponent={
          <>
            {buyAndRentButton()}
            {title({ title: "Nearby Properties" })}
            {nearbyProperties()}
            <CitiesGrid />
            {title({ title: "Featured Properties" })}
          </>
        }
        data={featuredPropertyChangableList}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
      <Snackbar
        style={styles.snackBarStyle}
        visible={showSnackBar}
        onDismiss={() => updateState({ showSnackBar: false })}
      >
        {isInWishList ? "Removed from shortlist" : "Added to shortlist"}
      </Snackbar>
    </View>
  );

  function handleFeaturedPropertyUpdate({ id }) {
    const newList = featuredPropertyChangableList.map((property) => {
      if (property.id === id) {
        const updatedItem = { ...property, isFavourit: !property.isFavourit };
        return updatedItem;
      }
      return property;
    });
    updateState({ featuredPropertyChangableList: newList });
  }

  function handleNearByPropertyUpdate({ id }) {
    const newList = nearbyProperyChangableList.map((property) => {
      if (property.id === id) {
        const updatedItem = { ...property, isFavourit: !property.isFavourit };
        return updatedItem;
      }
      return property;
    });
    updateState({ nearbyProperyChangableList: newList });
  }

  function nearbyProperties() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          navigation.push("property/propertyScreen", {
            propertyImage: item.properyImage,
            propertyName: item.propertyName,
            propertyAddress: item.propertyAddress,
            propertyAmount: item.propertyAmount,
          })
        }
        style={styles.nearByPropertContentStyle}
      >
        <Image
          source={item.properyImage}
          resizeMode="cover"
          style={styles.nearByPropertyImageStyle}
        />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            handleNearByPropertyUpdate({ id: item.id });
            updateState({ isInWishList: item.isFavourit, showSnackBar: true });
          }}
          style={styles.addToFavouriteContainerStyle}
        >
          <MaterialIcons
            name={item.isFavourit ? "favorite" : "favorite-border"}
            size={16}
            color={Colors.grayColor}
          />
        </TouchableOpacity>
        <View style={{ marginHorizontal: Sizes.fixPadding }}>
          <Text
            style={{
              ...Fonts.blackColor14SemiBold,
              marginTop: Sizes.fixPadding,
            }}
          >
            {item.propertyName}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              ...Fonts.grayColor12Medium,
              marginVertical: Sizes.fixPadding - 5.0,
            }}
          >
            {item.propertyAddress}
          </Text>
          <Text style={{ ...Fonts.blackColor16SemiBold }}>
            {item.propertyAmount}₹
          </Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <FlatList
        horizontal
        data={nearbyProperyChangableList}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingLeft: Sizes.fixPadding * 2.0,
          paddingBottom: Sizes.fixPadding + 5.0,
        }}
        showsHorizontalScrollIndicator={false}
      />
    );
  }

  function title({ title }) {
    return (
      <Text
        style={{
          ...Fonts.blackColor18SemiBold,
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginVertical: Sizes.fixPadding - 5.0,
        }}
      >
        {title}
      </Text>
    );
  }

  function buyAndRentButton() {
    return (
      <View style={styles.buyAndRentButtonContainerStyle}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => updateState({ activeButton: "all" })}
          style={{
            ...styles.buyAndRentButtonStyle,
            backgroundColor:
              activeButton === "all" ? Colors.primaryColor : Colors.whiteColor,
            borderColor: activeButton === "all" ? null : Colors.primaryColor,
            borderWidth: activeButton === "all" ? 0.0 : 1.0,
          }}
        >
          <Text
            style={
              activeButton === "all"
                ? { ...Fonts.whiteColor16Bold }
                : { ...Fonts.primaryColor16Medium }
            }
          >
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => updateState({ activeButton: "buy" })}
          style={{
            ...styles.buyAndRentButtonStyle,
            backgroundColor:
              activeButton === "buy" ? Colors.primaryColor : Colors.whiteColor,
            borderColor: activeButton === "buy" ? null : Colors.primaryColor,
            borderWidth: activeButton === "buy" ? 0.0 : 1.0,
          }}
        >
          <Text
            style={
              activeButton === "buy"
                ? { ...Fonts.whiteColor16Bold }
                : { ...Fonts.primaryColor16Medium }
            }
          >
            Buy
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => updateState({ activeButton: "rent" })}
          style={{
            ...styles.buyAndRentButtonStyle,
            backgroundColor:
              activeButton === "rent" ? Colors.primaryColor : Colors.whiteColor,
            borderColor: activeButton === "rent" ? null : Colors.primaryColor,
            borderWidth: activeButton === "rent" ? 0.0 : 1.0,
          }}
        >
          <Text
            style={
              activeButton === "rent"
                ? { ...Fonts.whiteColor16Bold }
                : { ...Fonts.primaryColor16Medium }
            }
          >
            Rent
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function header() {
    return (
      <View style={styles.headerStyle}>
        <View style={styles.headerContentStyle}>
          <Text style={{ ...Fonts.primaryColor18Bold }}>Global Zamindar</Text>
          <View style={{ flexDirection: "row" }}>
            <MaterialIcons
              name="search"
              size={24}
              color={Colors.primaryColor}
              onPress={() => navigation.push("search/searchScreen")}
            />
            <MaterialIcons
              name="notifications"
              size={24}
              color={Colors.primaryColor}
              style={{ marginLeft: Sizes.fixPadding + 5.0 }}
              onPress={() => navigation.push("notification/notificationScreen")}
            />
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerStyle: {
    height: 60.0,
    elevation: 5.0,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    justifyContent: "center",
    ...CommonStyles.shadow,
  },
  headerContentStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buyAndRentButtonContainerStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: Sizes.fixPadding * 2.0,
  },
  buyAndRentButtonStyle: {
    flex: 0.3,
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding - 3.0,
    alignItems: "center",
    justifyContent: "center",
  },
  addToFavouriteContainerStyle: {
    width: 30.0,
    height: 30.0,
    borderRadius: 15.0,
    position: "absolute",
    right: 10.0,
    top: 10.0,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  nearByPropertyImageStyle: {
    width: 160.0,
    height: 110.0,
    borderTopLeftRadius: Sizes.fixPadding + 5.0,
    borderTopRightRadius: Sizes.fixPadding + 5.0,
  },
  nearByPropertContentStyle: {
    backgroundColor: Colors.whiteColor,
    elevation: 4.0,
    width: 160.0,
    height: 203.0,
    borderRadius: Sizes.fixPadding + 5.0,
    marginRight: Sizes.fixPadding * 2.0,
    ...CommonStyles.shadow,
  },
  featuredPropertyContentStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    elevation: 3.0,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding + 5.0,
    ...CommonStyles.shadow,
  },
  featuredPropertyImageStyle: {
    borderTopLeftRadius: Sizes.fixPadding,
    borderTopRightRadius: Sizes.fixPadding,
    width: "100%",
    height: 220.0,
  },
  featuredPropertyInfoContentStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: Sizes.fixPadding,
    marginVertical: Sizes.fixPadding,
    alignItems: "center",
  },
  featuredPropertyAmountContentStyle: {
    borderWidth: 1.0,
    alignItems: "center",
    height: 30.0,
    justifyContent: "center",
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    borderColor: "rgba(128, 128, 128, 0.5)",
  },
  snackBarStyle: {
    position: "absolute",
    bottom: -10.0,
    left: -10.0,
    right: -10.0,
    backgroundColor: "#333333",
  },
});

export default HomeScreen;
