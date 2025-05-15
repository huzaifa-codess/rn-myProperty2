import React from "react";
import { View, Image } from "react-native";
import { Colors } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import MyStatusBar from "../../component/myStatusBar";
import { useLocalSearchParams, useNavigation } from "expo-router";

const ImageFullViewScreen = () => {

    const navigation = useNavigation();

    const { propertyImage } = useLocalSearchParams();

    return (
        <View style={{ flex: 1, backgroundColor: Colors.blackColor, }}>
            <MyStatusBar />
            <View style={{ flex: 1, justifyContent: 'center' }}>
                {closeButton()}
                <Image
                    source={propertyImage}
                    style={{ height: 414.0, width: '100%' }}
                />
            </View>
        </View>
    )

    function closeButton() {
        return (
            <MaterialIcons
                name="close"
                size={24}
                color={Colors.whiteColor}
                onPress={() => navigation.pop()}
                style={{ position: 'absolute', left: 10.0, top: 10.0, }}
            />
        )
    }
}

export default ImageFullViewScreen;