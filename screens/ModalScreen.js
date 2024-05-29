import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import SafeViewAndroid from "../components/SafeViewAndroid";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const ModalScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const incompleteForm = !image || !job || !age;

  const updateUserProfile = () => {
    setIsSubmitting(true);
    setDoc(doc(db, "users", user.idToken), {
      id: user.idToken,
      displayName: user.user.name,
      photoURL: image,
      job: job,
      age: age,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View className="flex 1 items-center">
        <Image
          className="h-20 w-full"
          resizeMode="contain"
          source={{ uri: "https://links.papareact.com/2pf" }}
        />

        <Text className="text-xl text-gray-500 p-2 font-bold">
          Welcome {user.user.name}
        </Text>

        <Text className="text-center p-4 font-bold text-red-400">
          Step 1: The Profile Pic
        </Text>
        <TextInput
          value={image}
          onChangeText={(text) => setImage(text)}
          className="text-center text-xl pb-2"
          placeholder="Enter a Profile Pic URL"
        />

        <Text className="text-center p-4 font-bold text-red-400">
          Step 2: The Job
        </Text>
        <TextInput
          value={job}
          onChangeText={(text) => setJob(text)}
          className="text-center text-xl pb-2"
          placeholder="Enter your Occupation"
        />

        <Text className="text-center p-4 font-bold text-red-400">
          Step 1: The Age
        </Text>
        <TextInput
          value={age}
          onChangeText={(text) => setAge(text)}
          className="text-center text-xl pb-2"
          placeholder="Enter your Age"
          maxLength={2}
          keyboardType="numeric"
        />

        <TouchableOpacity
          disabled={incompleteForm || isSubmitting}
          className={` flex-row justify-around items-center
            w-64
             p-3 rounded-xl
            ${incompleteForm ? "bg-gray-400" : "bg-red-400"}`}
          onPress={updateUserProfile}
        >
          {isSubmitting && <ActivityIndicator size="large" color="#00ff00" />}
          <Text className="text-center text-white text-xl">Update Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ModalScreen;
