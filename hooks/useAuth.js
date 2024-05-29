import { View, Text } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const AuthContext = createContext({
  // initial state..
});

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState();
  const [user, setUser] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "804984628238-bd174aupnlbo5rtim157bjegpc7l1719.apps.googleusercontent.com",
    });
  }, []);

  const signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      setUser(user);
      setError();
    } catch (e) {
      setError(e);
    }
  };

  const logOut = () => {
    setUser(), GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, signInGoogle, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
