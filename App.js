import React, { useState } from 'react';
import { StyleSheet, Text } from "react-native";

import MainScreen from './main';
import DetailsScreen from './details';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {
  const [isBusy, setBusy] = useState(false);
  const Stack = createStackNavigator();

  // useEffect(() => {
  //   (async () => {
      
  //   })();
  // }, [isBusy]);

  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#dedede",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    width: "100%",
    color: "#000",
    textAlign: "left",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});
