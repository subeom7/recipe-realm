import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Auth } from "aws-amplify";

function ProfileScreen() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => setUser(user))
      .catch((err) => console.log(err));
  }, []);

  function handleSignOut() {
    Auth.signOut()
      .then(() => console.log("signed out"))
      .catch((err) => console.log(err));
  }

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.text}>Welcome, {user.username}!</Text>
          <Button title="Sign Out" onPress={handleSignOut} />
        </>
      ) : (
        <Text style={styles.text}>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
