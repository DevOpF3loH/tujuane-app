import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import {
  doc,
  query,
  where,
  collection,
  onSnapshot,
  query,
  setDoc,
  getDocs,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import useAuth from "../hooks/useAuth";
import ChatRow from "./ChatRow";

const ChatList = () => {
  const [matches, setMatches] = useState([]);
  const { user } = useAuth();

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches"),
          where("usersMatched", "array-contains", user.idToken)
        ),
        (snapshot) =>
          setMatches(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          )
      ),
    [user]
  );
  return matches.length > 0 ? (
    <FlatList
      className="h-full"
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatRow matchDetails={item} />}
    />
  ) : (
    <View>
      <Text>No matches at the moment 🥲</Text>
    </View>
  );
};

export default ChatList;
