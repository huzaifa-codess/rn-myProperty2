import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Platform,
} from "react-native";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Snackbar } from "react-native-paper";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import CollapsibleToolbar from "react-native-collapsible-toolbar";
import MyStatusBar from "../../component/myStatusBar";
import { useLocalSearchParams, useNavigation } from "expo-router";
import MapView, { Marker } from "react-native-maps";

const nearestPlacesList = [
  {
    id: "1",
    place: "RailwayStation",
    isExpandable: false,
    more: [
      {
        id: "1",
        name: "Santa Cruise Railway Station",
        time: "8 min | 2.5 km",
      },
      {
        id: "2",
        name: "Manhattan Railway Station",
        time: "14 min | 4.0 km",
      },
    ],
  },
  {
    id: "2",
    place: "Airport",
    isExpandable: false,
    more: [
      {
        id: "1",
        name: "LaGuardia Airport",
        time: "8 min | 2.5 km",
      },
    ],
  },
  {
    id: "3",
    place: "Hospitals",
    isExpandable: false,
    more: [
      {
        id: "1",
        name: "Presbyterian Hospital",
        time: "8 min | 2.5 km",
      },
      {
        id: "2",
        name: "Lenox Hill Hospital",
        time: "14 min | 4.0 km",
      },
      {
        id: "3",
        name: "Mount Sinai Hospital",
        time: "20 min | 6.0 km",
      },
    ],
  },
  {
    id: "4",
    place: "Banks",
    isExpandable: false,
    more: [
      {
        id: "1",
        name: "Kotak Mahindra Bank",
        time: "5 min | 1.5 km",
      },
    ],
  },
];

const propertyPhotosList = [
  {
    id: "1",
    photo: require("../../assets/images/bedroom-1.jpg"),
  },
  {
    id: "2",
    photo: require("../../assets/images/bedroom-2.jpg"),
  },
  {
    id: "3",
    photo: require("../../assets/images/kitchen.jpg"),
  },
  {
    id: "4",
    photo: require("../../assets/images/bathroom-1.png"),
  },
  {
    id: "5",
    photo: require("../../assets/images/bathroom-2.jpg"),
  },
  {
    id: "6",
    photo: require("../../assets/images/parking.jpg"),
  },
];

const projectAminitiesList = [
  {
    id: "1",
    aminities: "Garden",
  },
  {
    id: "2",
    aminities: "Jogging Track",
  },
  {
    id: "3",
    aminities: "Power Backup",
  },
  {
    id: "4",
    aminities: "Complete RCC Structure",
  },
  {
    id: "5",
    aminities: "Design Door Frames",
  },
  {
    id: "6",
    aminities: "PVC Concealed wiring",
  },
];

const PropertyScreen = () => {
  const navigation = useNavigation();

  const [state, setState] = useState({
    expanded: false,
    nearestPlacesChangableList: nearestPlacesList,
    showSnackBar: false,
    isInWishList: false,
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { expanded, nearestPlacesChangableList, showSnackBar, isInWishList } =
    state;

  const { propertyImage, propertyName, propertyAddress, propertyAmount } =
    useLocalSearchParams();

  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMap(true);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <CollapsibleToolbar
        renderContent={() => (
          <View style={{ paddingBottom: Sizes.fixPadding * 8.0 }}>
            {propertyInfo()}
            {title({ title: "Description" })}
            {dummyText()}
            {title({ title: "Photos" })}
            {photos()}
            {title({ title: "Location" })}
            {showMap && mapInfo()}
            {title({ title: "Project Amenities" })}
            {aminities()}
            {nearestPlaces()}
          </View>
        )}
        renderNavBar={() => (
          <View style={styles.headerWrapper}>
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={Colors.whiteColor}
              onPress={() => navigation.pop()}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons
                onPress={() =>
                  updateState({
                    showSnackBar: true,
                    isInWishList: !isInWishList,
                  })
                }
                name={isInWishList ? "favorite" : "favorite-border"}
                size={24}
                color={Colors.whiteColor}
              />
              <MaterialIcons
                name="share"
                size={24}
                color={Colors.whiteColor}
                style={{ marginLeft: Sizes.fixPadding }}
              />
            </View>
          </View>
        )}
        renderToolBar={() => (
          <Image
            source={propertyImage}
            style={{
              width: "100%",
              height: 350,
              borderBottomLeftRadius: Sizes.fixPadding * 2.0,
              borderBottomRightRadius: Sizes.fixPadding * 2.0,
            }}
          />
        )}
        collapsedNavBarBackgroundColor={Colors.primaryColor}
        toolBarHeight={350}
        showsVerticalScrollIndicator={false}
        bounces={false}
      />
      {contactOwnerInfo()}
      <Snackbar
        style={styles.snackBarStyle}
        visible={showSnackBar}
        elevation={0.0}
        onDismiss={() => updateState({ showSnackBar: false })}
      >
        {isInWishList ? "Added to shortlist" : "Removed from shortlist"}
      </Snackbar>
    </View>
  );

  function contactOwnerInfo() {
    return (
      <View style={styles.ownerInfoContentStyle}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/images/user/user_7.jpg")}
              style={{ width: 50.0, height: 50.0, borderRadius: 25.0 }}
            />
            <View style={{ marginLeft: Sizes.fixPadding }}>
              <Text style={{ ...Fonts.blackColor16Bold }}>John Smith</Text>
              <Text style={{ ...Fonts.grayColor14Medium }}>Owner</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              navigation.push("message/messageScreen", { name: "John Smith" })
            }
            style={styles.ownerContactContentStyle}
          >
            <Text style={{ ...Fonts.whiteColor14SemiBold }}>Contact</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function handleNearestPlacesUpdate({ id, isExpanded }) {
    const newList = nearestPlacesChangableList.map((property) => {
      if (property.id === id) {
        const updatedItem = { ...property, isExpandable: isExpanded };
        return updatedItem;
      }
      return property;
    });
    updateState({ nearestPlacesChangableList: newList });
  }

  function nearestPlaces() {
    return (
      <View>
        {nearestPlacesChangableList.map((item) => (
          <View
            key={item.id}
            style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}
          >
            <Collapse
              onToggle={(isExpanded) =>
                handleNearestPlacesUpdate({ id: item.id, isExpanded })
              }
            >
              <CollapseHeader>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: Sizes.fixPadding - 8.0,
                  }}
                >
                  <Text style={{ ...Fonts.blackColor14Bold }}>
                    {item.place}({item.more.length})
                  </Text>
                  <MaterialIcons
                    name={
                      item.isExpandable
                        ? "keyboard-arrow-up"
                        : "keyboard-arrow-down"
                    }
                    size={24}
                    color={Colors.primaryColor}
                  />
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={{ marginVertical: Sizes.fixPadding - 5.0 }}>
                  {item.more.map((item) => (
                    <View
                      key={item.id}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginVertical: Sizes.fixPadding - 7.0,
                      }}
                    >
                      <Text style={{ ...Fonts.grayColor12Medium }}>
                        {item.name}
                      </Text>
                      <Text style={{ ...Fonts.grayColor12Medium }}>
                        {item.time}
                      </Text>
                    </View>
                  ))}
                </View>
              </CollapseBody>
            </Collapse>
          </View>
        ))}
      </View>
    );
  }

  function aminities() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding - 8.0,
          paddingBottom: Sizes.fixPadding - 5.0,
        }}
      >
        {projectAminitiesList.map((item) => (
          <View key={item.id}>
            <View style={styles.aminitiesContentStyle}>
              <MaterialIcons
                name="check-circle"
                size={20}
                color={Colors.primaryColor}
              />
              <Text
                style={{
                  ...Fonts.blackColor14Regular,
                  marginLeft: 2.0,
                  marginTop: 1.5,
                }}
              >
                {item.aminities}
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  }

  function mapInfo() {
    return (
      <View style={styles.mapStyle}>
        <MapView
          style={{ height: 150 }}
          initialRegion={{
            latitude: 37.33233141,
            longitude: -122.0312186,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          loadingEnabled
          loadingIndicatorColor={Colors.primaryColor}
        >
          {showMap && (
            <Marker
              coordinate={{ latitude: 37.33233141, longitude: -122.0312186 }}
              pinColor={Colors.primaryColor}
            />
          )}
        </MapView>
      </View>
    );
  }

  function photos() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        style={{ overflow: "hidden" }}
        onPress={() =>
          navigation.push("imageFullView/imageFullViewScreen", {
            propertyImage: item.photo,
          })
        }
      >
        <Image
          source={item.photo}
          style={styles.propertyPhotosStyle}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
    return (
      <FlatList
        horizontal
        data={propertyPhotosList}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: Sizes.fixPadding * 2.0,
          paddingTop: Sizes.fixPadding - 5.0,
        }}
      />
    );
  }

  function dummyText() {
    return (
      <Text
        style={{
          ...Fonts.blackColor12Regular,
          marginHorizontal: Sizes.fixPadding * 2.0,
          textAlign: "justify",
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies mi id
        faucibus odio lobortis vitae, ante malesuada mauris. Nulla quis orci,
        libero turpis morbi diam. Non placerat est consectetur hendrerit sem
        fringilla leo. Urna posuere aliquet justo, vitae at pharetra. Euismod
        sagittis malesuada mattis commodo faucibus purus convallis.
      </Text>
    );
  }

  function title({ title }) {
    return (
      <Text
        style={{
          ...Fonts.blackColor18Bold,
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginTop: Sizes.fixPadding,
        }}
      >
        {title}
      </Text>
    );
  }

  function propertyInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <Text
          style={{ ...Fonts.blackColor18Bold, marginTop: Sizes.fixPadding }}
        >
          {propertyName}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: Sizes.fixPadding,
          }}
        >
          <View>
            <Text style={{ ...Fonts.grayColor14Medium }}>
              {propertyAddress}
            </Text>
            <Text style={{ ...Fonts.blackColor14SemiBold }}>5000ft2</Text>
          </View>
          <View style={styles.propertyAmountContentStyle}>
            <Text style={{ ...Fonts.blackColor16SemiBold }}>
              {propertyAmount}₹
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: Sizes.fixPadding,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={{ ...Fonts.blackColor22Bold }}>6</Text>
            <Text
              style={{
                ...Fonts.blackColor14Regular,
                marginTop: Sizes.fixPadding - 20,
              }}
            >
              Bedrooms
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ ...Fonts.blackColor22Bold }}>4</Text>
            <Text
              style={{
                ...Fonts.blackColor14Regular,
                marginTop: Sizes.fixPadding - 20,
              }}
            >
              Bathrooms
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ ...Fonts.blackColor22Bold }}>2</Text>
            <Text
              style={{
                ...Fonts.blackColor14Regular,
                marginTop: Sizes.fixPadding - 20,
              }}
            >
              Kitchens
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ ...Fonts.blackColor22Bold }}>3</Text>
            <Text
              style={{
                ...Fonts.blackColor14Regular,
                marginTop: Sizes.fixPadding - 20,
              }}
            >
              Parkings
            </Text>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  propertyAmountContentStyle: {
    borderWidth: 1.0,
    alignItems: "center",
    height: 34.0,
    justifyContent: "center",
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    borderColor: "rgba(128, 128, 128, 0.5)",
  },
  propertyPhotosStyle: {
    width: 120.0,
    height: 150.0,
    borderRadius: Sizes.fixPadding,
    marginRight: Sizes.fixPadding + 8.0,
  },
  mapStyle: {
    borderRadius: Sizes.fixPadding,
    marginVertical: Sizes.fixPadding - 5.0,
    overflow: "hidden",
    backgroundColor: Colors.whiteColor,
    elevation: 3.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  aminitiesContentStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Sizes.fixPadding - 3.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  ownerInfoContentStyle: {
    position: "absolute",
    bottom: 0.0,
    height: 70.0,
    backgroundColor: Colors.whiteColor,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    borderTopColor: "rgba(128, 128, 128, 0.2)",
    borderTopWidth: 1.0,
    elevation: 2.0,
  },
  ownerContactContentStyle: {
    height: 31.0,
    width: 78.0,
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: "center",
    justifyContent: "center",
  },
  snackBarStyle: {
    position: "absolute",
    bottom: 60.0,
    left: -10.0,
    right: -10.0,
    backgroundColor: "#333333",
    elevation: 0.0,
  },
  headerWrapper: {
    marginHorizontal: Sizes.fixPadding * 1.5,
    marginVertical: Platform.OS == "ios" ? 0 : Sizes.fixPadding * 1.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default PropertyScreen;
