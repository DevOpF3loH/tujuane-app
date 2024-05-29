import {
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SafeViewAndroid from "../components/SafeViewAndroid";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";
import useAuth from "../hooks/useAuth";
import { useRoute } from "@react-navigation/native";
import ReceiverMessage from "../components/ReceiverMessage";
import SenderMessage from "../components/SenderMessage";
import {
  doc,
  query,
  where,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  snapshot,
  setDoc,
  getDocs,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

const MessageScreen = () => {
  const { user } = useAuth();
  const { params } = useRoute();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const { matchDetails } = params;

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches", matchDetails.id, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [(matchDetails, db)]
  );

  const sendMessage = () => {
    addDoc(collection(db, "matches", matchDetails.id, "messages"), {
      timestamp: serverTimestamp(),
      userId: user.idToken,
      displayName: user.displayName,
      photoURL: matchDetails.users[user.idToken].photoURL,
      message: input,
    });

    setInput("");
  };

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View className="flex-1">
        <Header
          title={
            getMatchedUserInfo(matchDetails?.users, user.idToken).displayName
          }
          callEnabled
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
          keyboardVerticalOffset={10}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <FlatList
              data={messages}
              inverted={-1}
              className="pl-4"
              keyExtractor={(item) => item.id}
              renderItem={({ item: message }) =>
                messages.userId === user.idToken ? (
                  <SenderMessage key={message.id} message={message} />
                ) : (
                  <ReceiverMessage key={message.id} message={message} />
                )
              }
            />
          </TouchableWithoutFeedback>

          <View className="flex-row justify-between items-center border-t border-gray-200 px-5 py-2">
            <TextInput
              className="h-10 text-lg"
              placeholder="Send Message..."
              onChangeText={setInput}
              onSubmitEditing={sendMessage}
              value={input}
            />
            <Button onPress={sendMessage} title="Send" color="#FF5864" />
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default MessageScreen;
