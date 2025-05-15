import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Fonts, Colors, Sizes, CommonStyles } from "../../constant/styles";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Modal } from "react-native-paper";
import MyStatusBar from "../../component/myStatusBar";
import { useNavigation } from "expo-router";

const myListingPropertyList = [
  {
    id: "1",
    properyImage: require("../../assets/images/house/house_2.jpg"),
    propertyName: "Vraj House",
    propertyAddress: "Yogi Street, New York",
    propertyAmount: "920000",
    isFavourit: false,
  },
  {
    id: "2",
    properyImage: require("../../assets/images/house/house_5.jpg"),
    propertyName: "Sky View House",
    propertyAddress: "Opera Street, New York",
    propertyAmount: "300000",
    isFavourit: false,
  },
];

const { width } = Dimensions.get("window");

const MyListingScreen = () => {
  const navigation = useNavigation();

  const [state, setState] = useState({
    myListingPropertyChangableList: myListingPropertyList,
    isDeleteItem: false,
    deleteItemId: "",
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { myListingPropertyChangableList, isDeleteItem, deleteItemId } = state;

  const renderItem = ({ item }) => (
    <View style={styles.mylistingPropertyContentStyle}>
      <Image
        source={item.properyImage}
        resizeMode="cover"
        style={styles.myListingPropertyImageStyle}
      />
      <View style={styles.myListingPropertyInfoContentStyle}>
        <View style={{ width: width / 1.9 }}>
          <Text style={{ ...Fonts.blackColor14SemiBold }}>
            {item.propertyName}
          </Text>
          <Text numberOfLines={1} style={{ ...Fonts.grayColor12Medium }}>
            {item.propertyAddress}
          </Text>
        </View>
        <View style={styles.myListingPropertyAmountContentStyle}>
          <Text style={{ ...Fonts.blackColor16SemiBold }}>
            {item.propertyAmount}₹
          </Text>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          updateState({ isDeleteItem: true, deleteItemId: item.id })
        }
        style={styles.deleteButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor14Medium }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      {header()}
      {myListingPropertyChangableList.length == 0 ? (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <MaterialCommunityIcons
            name="format-list-bulleted"
            size={50}
            color={Colors.grayColor}
          />
          <Text
            style={{ ...Fonts.grayColor18Bold, marginTop: Sizes.fixPadding }}
          >
            No listing found
          </Text>
        </View>
      ) : (
        <View>
          <FlatList
            data={myListingPropertyChangableList}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
            contentContainerStyle={{
              paddingTop: Sizes.fixPadding * 2.0,
              paddingBottom: Sizes.fixPadding * 8.0,
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
      {deleteListingDialog()}
    </View>
  );

  function deleteListingDialog() {
    return (
      <Modal
        visible={isDeleteItem}
        onDismiss={() => {
          updateState({ isDeleteItem: false });
        }}
        contentContainerStyle={styles.dialogContainerStyle}
      >
        <View
          style={{ backgroundColor: Colors.whiteColor, alignItems: "center" }}
        >
          <Text
            style={{
              ...Fonts.blackColor16Bold,
              paddingBottom: Sizes.fixPadding - 5.0,
            }}
          >
            Delete this listing?
          </Text>
          <View style={styles.cancelAndDeleteButtonContentStyle}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>
                updateState({
                  isDeleteItem: false,
                  deleteItemId: "",
                })
              }
              style={styles.cancelButtonStyle}
            >
              <Text style={{ ...Fonts.blackColor14Medium }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                updateState({ isDeleteItem: false });
                handleMyListingPropertyUpdate();
              }}
              style={styles.dialogDeleteButtonStyle}
            >
              <Text style={{ ...Fonts.whiteColor14Medium }}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  function header() {
    return (
      <View style={styles.headerContentStyle}>
        <MaterialIcons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => navigation.pop()}
          style={{ position: "absolute", left: 20.0 }}
        />
        <Text
          style={{
            ...Fonts.blackColor18Bold,
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          My Listing
        </Text>
      </View>
    );
  }

  function handleMyListingPropertyUpdate() {
    const newList = myListingPropertyChangableList.filter((val, i) => {
      if (val.id !== deleteItemId) {
        return val;
      }
    });
    updateState({ myListingPropertyChangableList: newList });
  }
};

const styles = StyleSheet.create({
  headerContentStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 60.0,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    elevation: 10.0,
    ...CommonStyles.shadow,
  },
  mylistingPropertyContentStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    elevation: 3.0,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding + 5.0,
    ...CommonStyles.shadow,
  },
  myListingPropertyInfoContentStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: Sizes.fixPadding,
    marginVertical: Sizes.fixPadding,
    alignItems: "center",
  },
  myListingPropertyImageStyle: {
    borderTopLeftRadius: Sizes.fixPadding,
    borderTopRightRadius: Sizes.fixPadding,
    width: "100%",
    height: 220.0,
  },
  myListingPropertyAmountContentStyle: {
    borderWidth: 1.0,
    alignItems: "center",
    height: 30.0,
    justifyContent: "center",
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    borderColor: "rgba(128, 128, 128, 0.5)",
  },
  deleteButtonStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    height: 40.0,
    borderBottomLeftRadius: Sizes.fixPadding,
    borderBottomRightRadius: Sizes.fixPadding,
  },
  dialogContainerStyle: {
    backgroundColor: Colors.whiteColor,
    width: "85%",
    alignSelf: "center",
    borderRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding * 2.0,
  },
  dialogDeleteButtonStyle: {
    flex: 0.45,
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding - 7.0,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: Sizes.fixPadding + 5.0,
  },
  cancelButtonStyle: {
    flex: 0.45,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    borderColor: Colors.blackColor,
    borderWidth: 1.0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Sizes.fixPadding - 7.0,
  },
  cancelAndDeleteButtonContentStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Sizes.fixPadding,
  },
});

export default MyListingScreen;
