import {
  View,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import SafeViewAndroid from "../components/SafeViewAndroid";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import {
  doc,
  query,
  where,
  collection,
  onSnapshot,
  setDoc,
  getDocs,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import generateId from "../lib/generateId";

const DUMMY_DATA = [
  //   {
  //     firstName: "Roselita",
  //     lastName: "Thayo",
  //     job: "Cook",
  //     photoURL:
  //       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D",
  //     age: 28,
  //     id: 1,
  //   },
  //   {
  //     firstName: "Jobs",
  //     lastName: "Clarks",
  //     job: "IT Support",
  //     photoURL:
  //       "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D",
  //     age: 36,
  //     id: 2,
  //   },
  //   {
  //     firstName: "Robert",
  //     lastName: "Hurt",
  //     job: "Driver",
  //     photoURL:
  //       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D",
  //     age: 40,
  //     id: 3,
  //   },
  //   {
  //     firstName: "Alice",
  //     lastName: "Jones",
  //     job: "Make up artist",
  //     photoURL:
  //       "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D",
  //     age: 24,
  //     id: 4,
  //   },
  //   {
  //     firstName: "Margret",
  //     lastName: "Stewart",
  //     job: "Animator",
  //     photoURL:
  //       "https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D",
  //     age: 42,
  //     id: 5,
  //   },
  //   {
  //     firstName: "Andreas",
  //     lastName: "Kane",
  //     job: "Fireman",
  //     photoURL:
  //       "https://images.unsplash.com/photo-1639747280804-dd2d6b3d88ac?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
  //     age: 48,
  //     id: 6,
  //   },
  //   {
  //     firstName: "Thalia",
  //     lastName: "Simones",
  //     job: "Bartender",
  //     photoURL:
  //       "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
  //     age: 26,
  //     id: 7,
  //   },
  //   {
  //     firstName: "Cynthia",
  //     lastName: "Lones",
  //     job: "Florist",
  //     photoURL:
  //       "https://images.unsplash.com/photo-1598550880863-4e8aa3d0edb4?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
  //     age: 30,
  //     id: 8,
  //   },
  //   {
  //     firstName: "Jack",
  //     lastName: "Colt",
  //     job: "Designer",
  //     photoURL:
  //       "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
  //     age: 35,
  //     id: 9,
  //   },
  //   {
  //     firstName: "Hulio",
  //     lastName: "Festas",
  //     job: "Electrician",
  //     photoURL:
  //       "https://plus.unsplash.com/premium_photo-1709865803775-459f844f7dc9?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
  //     age: 32,
  //     id: 10,
  //   },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logOut } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const swipeRef = useRef(null);

  //   useLayoutEffect(
  //     () =>
  //       onSnapshot(doc(db, "users", user.idToken), (snapshot) => {
  //         console.log(snapshot)
  //         if (!snapshot.exists()) {
  //           navigation.navigate("Modal");
  //         }
  //       }),
  //     []
  //   );

  useEffect(() => {
    let unsub;

    const fetchCards = async () => {
      const passes = await getDocs(
        collection(db, "users", user.idToken, "passes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const swipes = await getDocs(
        collection(db, "users", user.idToken, "swipes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const passedUserIds = passes.length > 0 ? passes : ["test"];
      const swipedUserIds = swipes.length > 0 ? swipes : ["test"];

      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds, ...swipedUserIds])
        ),
        (snapshot) => {
          setProfiles(
            snapshot.docs
              .filter((doc) => doc.id !== user.idToken)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
    };

    fetchCards();
    return unsub;
  }, [db]);

  const swipeLeft = (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    console.log(`You swiped Pass on ${userSwiped.displayName}`);

    setDoc(doc(db, "users", user.idToken, "passes", userSwiped.id), userSwiped);
  };

  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    const loggedInProfile = await (
      await getDocs(db, "users", user.idToken)
    ).data();

    // Check if the user swiped on you...
    getDoc(doc(db, "users", userSwiped.id, "swipes", user.idToken)).then(
      (documentSnapshot) => {
        if (documentSnapshot.exists()) {
          console.log(`Hooray, you matched with ${userSwiped.displayName}`);
          setDoc(
            doc(db, "users", user.idToken, "swipes", userSwiped.id),
            userSwiped
          );

          // Create a match
          setDoc(doc(db, "matches", generateId(user.idToken, userSwiped.id)), {
            users: {
              [user.idToken]: loggedInProfile,
              [userSwiped.id]: userSwiped,
            },
            usersMatched: [user.idToken, userSwiped.id],
            timestamp: serverTimestamp(),
          });

          navigation.navigate("Match", {
            loggedInProfile,
            userSwiped,
          });
        } else {
          console.log(`You swiped on ${userSwiped.dispay} (${userSwiped.job})`);
          setDoc(
            doc(db, "users", user.idToken, "swipes", userSwiped.id),
            userSwiped
          );
        }
      }
    );

    console.log(`You swiped on ${userSwiped.displayName} (${userSwiped.job})`);
    setDoc(doc(db, "users", user.idToken, "swipes", userSwiped.id), userSwiped);
  };

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-5">
          <TouchableOpacity onPress={logOut}>
            <Image
              className="h-10 w-10 rounded-full"
              source={{ uri: user.user.photo }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
            <Image
              className="h-14 w-14 object-cover"
              source={require("../assets/tinder2.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
            <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
          </TouchableOpacity>
        </View>

        {/* Cards */}
        <View className="flex-1 -mt-6">
          <Swiper
            ref={swipeRef}
            containerStyle={{
              backgroundColor: "transparent",
            }}
            cards={profiles}
            stackSize={5}
            cardIndex={0}
            animateCardOpacity
            verticalSwipe={false}
            onSwipedLeft={(cardIndex) => {
              console.log("Swipe Pass!!");
              swipeLeft(cardIndex);
            }}
            onSwipedRight={(cardIndex) => {
              console.log("Swipe Match!!");
              swipeRight(cardIndex);
            }}
            overlayLabels={{
              left: {
                title: "Nope",
                style: {
                  label: {
                    textAlign: "right",
                    color: "red",
                  },
                },
              },
              right: {
                title: "Match",
                style: {
                  label: {
                    color: "#4DED30",
                  },
                },
              },
            }}
            renderCard={(card) =>
              card ? (
                <View
                  key={card.id}
                  className="bg-white h-3/4 rounded-xl relative"
                >
                  <Image
                    className="absolute top-0 h-full w-full rounded-xl"
                    source={{ uri: card.photoURL }}
                  />

                  <View
                    style={styles.cardShadow}
                    className="bg-white flex-row w-full h-20 absolute bottom-0 justify-between items-center px-6 py-2 rounded-b-xl shadow-xl"
                  >
                    <View>
                      <Text className="text-xl font-bold">
                        {card.displayName}
                      </Text>
                      <Text>{card.job}</Text>
                    </View>
                    <Text className="text-2xl font-bold">{card.age}</Text>
                  </View>
                </View>
              ) : (
                <View
                  style={styles.cardShadow}
                  className="relative bg-white h-3/4 rounded-xl justify-center items-center"
                >
                  <Text className="font-bold pb-5">No more profiles</Text>
                  <Image
                    className="h-20 w-20"
                    height={100}
                    width={100}
                    source={{ uri: "https://links.papareact.com/6gb" }}
                  />
                </View>
              )
            }
          />
        </View>
        <View className="flex flex-row justify-evenly m-2">
          <TouchableOpacity
            onPress={() => swipeRef.current.swipeLeft()}
            className="items-center justify-center rounded-full w-16 h-16 bg-red-200"
          >
            <Entypo name="cross" size={24} color="red" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => swipeRef.current.swipeRight()}
            className="items-center justify-center rounded-full w-16 h-16 bg-green-200"
          >
            <AntDesign name="heart" size={24} color="green" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
