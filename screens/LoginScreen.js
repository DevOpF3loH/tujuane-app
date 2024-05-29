import {
  View,
  Text,
  Button,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";
import SafeViewAndroid from "../components/SafeViewAndroid";

const LoginScreen = () => {
  const { signInGoogle } = useAuth();
  const { user } = useAuth();
  return (
    <View className="flex-1">
      <ImageBackground
        resizeMode="cover"
        className="flex-1"
        source={{ uri: "https://tinder.com/static/tinder.png" }}
      >
        <TouchableOpacity
          className="absolute bottom-40 w-52 mx-28 bg-white p-4 rounded-2xl"
          onPress={signInGoogle}
        >
          <Text className="text-center font-semibold">
            Sign in & get swiping
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
