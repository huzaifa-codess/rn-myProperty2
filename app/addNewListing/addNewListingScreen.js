import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constant/styles";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import MyStatusBar from "../../component/myStatusBar";
import { useNavigation } from "expo-router";

const { width } = Dimensions.get("screen");

const AddNewListingScreen = () => {
  const navigation = useNavigation();

  const [state, setState] = useState({
    titleFocus: false,
    addressFocus: false,
    squarefeetFocus: false,
    noOfBathroomFocus: false,
    noOfBedroomFocus: false,
    noOfKitchenFocus: false,
    priceFocus: false,
    isBuy: true,
    showBottomSheet: false,
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const {
    titleFocus,
    addressFocus,
    squarefeetFocus,
    noOfBathroomFocus,
    noOfBedroomFocus,
    noOfKitchenFocus,
    priceFocus,
    isBuy,
    showBottomSheet,
  } = state;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 8.0 }}
        >
          {addPhoto()}
          {titleTextField()}
          {addressTextField()}
          {squarefeetTextField()}
          {noOfBathroomTextField()}
          {noOfBedroomTextField()}
          {noOfKitchenTextField()}
          {priceTextField()}
          {buyRentButton()}
        </ScrollView>
        {addListingButton()}
      </View>
      {changeProfileOptions()}
    </View>
  );

  function changeProfileOptions() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showBottomSheet}
        onRequestClose={() => {
          updateState({ showBottomSheet: false });
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            updateState({ showBottomSheet: false });
          }}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <View style={{ justifyContent: "flex-end", flex: 1 }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {}}
              style={styles.sheetWrapper}
            >
              <View style={styles.bottomSheetContentStyle}>
                <Text
                  style={{ ...Fonts.blackColor18Bold, textAlign: "center" }}
                >
                  Choose Option
                </Text>
                <View
                  style={{
                    backgroundColor: "#CFC6C6",
                    height: 1.0,
                    marginBottom: Sizes.fixPadding + 2.0,
                    marginTop: Sizes.fixPadding - 5.0,
                  }}
                ></View>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    updateState({ showBottomSheet: false });
                  }}
                  style={{
                    flexDirection: "row",
                    marginHorizontal: Sizes.fixPadding * 2.0,
                  }}
                >
                  <MaterialIcons
                    name="photo-camera"
                    size={24}
                    color={Colors.blackColor}
                  />
                  <Text
                    style={{
                      ...Fonts.blackColor16Medium,
                      marginLeft: Sizes.fixPadding,
                    }}
                  >
                    Camera
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    updateState({ showBottomSheet: false });
                  }}
                  style={{
                    flexDirection: "row",
                    marginTop: Sizes.fixPadding,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                  }}
                >
                  <MaterialIcons
                    name="photo-album"
                    size={22}
                    color={Colors.blackColor}
                  />
                  <Text
                    style={{
                      ...Fonts.blackColor16Medium,
                      marginLeft: Sizes.fixPadding,
                    }}
                  >
                    Choose from gallery
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  function addListingButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.pop()}
        style={styles.addNewListingButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>Add Listing</Text>
      </TouchableOpacity>
    );
  }

  function buyRentButton() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginTop: Sizes.fixPadding,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => updateState({ isBuy: true })}
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: width / 2.0,
          }}
        >
          <View style={styles.buyOrRentUnselectedStyle}>
            {isBuy ? <View style={styles.buyOrRentSelectedStyle}></View> : null}
          </View>
          <Text
            style={{
              ...Fonts.blackColor14Medium,
              marginLeft: Sizes.fixPadding - 2.0,
            }}
          >
            Buy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => updateState({ isBuy: false })}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <View style={styles.buyOrRentUnselectedStyle}>
            {isBuy ? null : <View style={styles.buyOrRentSelectedStyle}></View>}
          </View>
          <Text
            style={{
              ...Fonts.blackColor14Medium,
              marginLeft: Sizes.fixPadding - 2.0,
            }}
          >
            Rent
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function priceTextField() {
    return (
      <TextInput
        label="Price(in ₹)"
        mode="outlined"
        placeholder={priceFocus ? "Price(in ₹)" : ""}
        placeholderTextColor={Colors.grayColor}
        style={styles.textFieldStyle}
        onFocus={() => updateState({ priceFocus: true })}
        onBlur={() => updateState({ priceFocus: false })}
        cursorColor={Colors.blackColor}
        activeOutlineColor={Colors.primaryColor}
      />
    );
  }

  function noOfKitchenTextField() {
    return (
      <TextInput
        label="No. of kitchen rooms"
        mode="outlined"
        placeholder={noOfKitchenFocus ? "No. of kitchen rooms" : ""}
        placeholderTextColor={Colors.grayColor}
        style={styles.textFieldStyle}
        onFocus={() => updateState({ noOfKitchenFocus: true })}
        onBlur={() => updateState({ noOfKitchenFocus: false })}
        cursorColor={Colors.blackColor}
        activeOutlineColor={Colors.primaryColor}
        keyboardType="number-pad"
      />
    );
  }

  function noOfBedroomTextField() {
    return (
      <TextInput
        label="No. of bed rooms"
        mode="outlined"
        placeholder={noOfBedroomFocus ? "No. of bed rooms" : ""}
        placeholderTextColor={Colors.grayColor}
        style={styles.textFieldStyle}
        onFocus={() => updateState({ noOfBedroomFocus: true })}
        onBlur={() => updateState({ noOfBedroomFocus: false })}
        cursorColor={Colors.blackColor}
        activeOutlineColor={Colors.primaryColor}
        keyboardType="number-pad"
      />
    );
  }

  function noOfBathroomTextField() {
    return (
      <TextInput
        label="No. of bathrooms"
        mode="outlined"
        placeholder={noOfBathroomFocus ? "No. of bathrooms" : ""}
        placeholderTextColor={Colors.grayColor}
        style={styles.textFieldStyle}
        onFocus={() => updateState({ noOfBathroomFocus: true })}
        onBlur={() => updateState({ noOfBathroomFocus: false })}
        cursorColor={Colors.blackColor}
        activeOutlineColor={Colors.primaryColor}
        keyboardType="number-pad"
      />
    );
  }

  function squarefeetTextField() {
    return (
      <TextInput
        label="Square feet"
        mode="outlined"
        placeholder={squarefeetFocus ? "Square feet" : ""}
        placeholderTextColor={Colors.grayColor}
        style={styles.textFieldStyle}
        onFocus={() => updateState({ squarefeetFocus: true })}
        onBlur={() => updateState({ squarefeetFocus: false })}
        cursorColor={Colors.blackColor}
        activeOutlineColor={Colors.primaryColor}
        keyboardType="number-pad"
      />
    );
  }

  function addressTextField() {
    return (
      <TextInput
        label="Address"
        mode="outlined"
        placeholder={addressFocus ? "Address" : ""}
        placeholderTextColor={Colors.grayColor}
        style={styles.textFieldStyle}
        onFocus={() => updateState({ addressFocus: true })}
        onBlur={() => updateState({ addressFocus: false })}
        cursorColor={Colors.blackColor}
        activeOutlineColor={Colors.primaryColor}
      />
    );
  }

  function titleTextField() {
    return (
      <TextInput
        label="Title"
        mode="outlined"
        placeholder={titleFocus ? "Title" : ""}
        placeholderTextColor={Colors.grayColor}
        style={styles.textFieldStyle}
        onFocus={() => updateState({ titleFocus: true })}
        onBlur={() => updateState({ titleFocus: false })}
        cursorColor={Colors.blackColor}
        activeOutlineColor={Colors.primaryColor}
      />
    );
  }

  function addPhoto() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => updateState({ showBottomSheet: true })}
        style={styles.addPhotoContentStyle}
      >
        <MaterialCommunityIcons name="camera-plus" size={24} color="black" />
      </TouchableOpacity>
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
          Add New Listing
        </Text>
      </View>
    );
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
  textFieldStyle: {
    ...Fonts.blackColor14Medium,
    marginHorizontal: Sizes.fixPadding * 2.0,
    backgroundColor: Colors.whiteColor,
    marginVertical: Sizes.fixPadding - 3.0,
    height: 50.0,
  },
  buyOrRentUnselectedStyle: {
    height: 20.0,
    width: 20.0,
    borderRadius: 10.0,
    borderColor: Colors.primaryColor,
    borderWidth: 1.0,
    alignItems: "center",
    justifyContent: "center",
  },
  buyOrRentSelectedStyle: {
    width: 14.0,
    height: 14.0,
    borderRadius: 7.0,
    backgroundColor: Colors.primaryColor,
  },
  addNewListingButtonStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Sizes.fixPadding,
    position: "absolute",
    bottom: 0.0,
    left: 0.0,
    right: 0.0,
  },
  addPhotoContentStyle: {
    width: 100.0,
    height: 100.0,
    borderRadius: 50.0,
    borderColor: Colors.primaryColor,
    borderWidth: 1.0,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding,
  },
  bottomSheetContentStyle: {
    backgroundColor: Colors.whiteColor,
    paddingTop: Sizes.fixPadding + 5.0,
    paddingBottom: Sizes.fixPadding,
  },
});

export default AddNewListingScreen;
