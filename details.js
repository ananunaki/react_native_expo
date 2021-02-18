import React, { useEffect, useState } from "react";
import { saveDeviceData, loadDeviceData } from "./jsonService";
import {calculateAge} from './helpers';
import "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    padding: 10,
  }
})

export default function Details({ navigation }) {
  const [data, setdata] = useState({});
  const [isBusy, setBusy] = useState("");

  const loadData = async () => {
    let fetchData;
    try {
      fetchData = await loadDeviceData("nativedata");
    } catch (e) {}
    return fetchData;
  };

  useEffect(() => {
    (async () => {
      let recievedData = await loadData();
      setdata(recievedData);
      setBusy(false);
    })();
  }, [isBusy]);
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text} >Saved information</Text>
        <Text style={styles.text} >User with "{data.username}" username, {calculateAge(data.birthday) == 0 ? "less than one year old" : `${calculateAge(data.birthday)} years old` } and {data.married ? "married" : "not married"}</Text>
      </View>
    </>
  );
}
