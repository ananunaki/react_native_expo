import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { saveDeviceData, loadDeviceData } from "./jsonService";
import {calculateAge} from './helpers';
import { RadioButton } from "react-native-paper";
import {
  Text,
  View,
  StyleSheet,
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
  },
  submitButton: {
    position: "absolute",
    bottom: 0,
    padding: 10,
  },
  textInput: {
    width: "80%",
    color: "#000",
    textAlign: "left",
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "#20232a",
    borderRadius: 6,
  },
  radioButton: {
    width: 50,
  },
  label: {
    margin: 8,
    width: "80%",
    lineHeight: 50,
  },
  section: {
    margin: 20,
  },
});

export default function Main({ navigation }) {
  const [data, setdata] = useState({});
  const [isBusy, setBusy] = useState("");
  const [username, setusername] = useState("");
  const [birthday, setbirthday] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const [married, setmarried] = useState(false);

  let modelSendToServer = {
    username,
    birthday,
    married,
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthday;
    setShow(false);
    setbirthday(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const loadData = async () => {
    let fetchData;
    try {
      fetchData = await loadDeviceData("nativedata");
    } catch (e) {}
    return fetchData;
  };

  const saveData = async (data) => {
    try {
      await saveDeviceData("nativedata", data);
    } catch (e) {}
  };

  const clearForm = () => {
    setdata({});
    setusername("");
    setbirthday(new Date());
    setmarried(false);
  };

  const saveDocument = () => {
    saveData(modelSendToServer);
    clearForm();
    setBusy(true);
    navigation.navigate("Details");
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
        <View style={styles.section}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setusername}
            value={username}
            placeholder="Input your username"
          />
        </View>
        <View style={styles.section}>
          <Button
            style={{ width: "50%" }}
            onPress={showDatepicker}
            title="Select your date of birth !"
          />
          <Text style={styles.label}>
            Your birthday was {birthday.toDateString()}, you are{" "}
            {calculateAge(birthday)} years old.
          </Text>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={birthday}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
        <View style={styles.section}>
          <Text style={styles.label} onPress={()=>{ setmarried(true) }}>Married</Text>
          <RadioButton
            style={styles.radioButton}
            value="married"
            label="Married"
            status={married ? "checked" : "unchecked"}
            onPress={()=>{ setmarried(true) }}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.label} onPress={()=>{ setmarried(false) }}>Not Married</Text>
          <RadioButton
            style={styles.radioButton}
            value="not_married"
            label="Not Married"
            status={!married ? "checked" : "unchecked"}
            onPress={()=>{ setmarried(false) }}
          />
        </View>
      </View>
      <Button
        style={styles.submitButton}
        onPress={saveDocument}
        title="Save document !"
      />
    </>
  );
}
