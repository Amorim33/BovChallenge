import React, { useState, useContext } from "react";
import { View } from "react-native";
import { TextInput, Checkbox, Button, Colors } from "react-native-paper";

import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ChecklistContext from "../../../network/checklistContext";
import OfflineBoolContext from "../../../network/offlineBoolContext";
import ChecklistAddModel from "../../../models/ChecklistAdd";

import styles from "./styles";

const ChecklistAdd = (props) => {
  const [name, setName] = useState("");
  const [to, setTo] = useState("");
  const [type, setType] = useState("");
  const [fName, setFName] = useState("");
  const [fCity, setFCity] = useState("");
  const [amount, setAmount] = useState("");
  const [cowsNumber, setCowsNumber] = useState("");
  const [checked, setChecked] = useState(false);

  const [checklistData, setChecklistData] = useContext(ChecklistContext);
  const [offlineRequestOpen, setOfflineRequestOpen] =
    useContext(OfflineBoolContext);

  const handleSubmit = () => {
    // Generating unique id
    let id = Math.random().toString();
    while (props.screenProps.checklists.find((c) => c.id === id) != undefined)
      id = Math.random().toString();

    const date = new Date().toLocaleString();

    const submitModel = new ChecklistAddModel(
      id,
      type,
      amount,
      cowsNumber,
      checked,
      fName,
      fCity,
      name,
      to,
      date,
      date
    );

    setChecklistData([...checklistData, submitModel]);

    // Bad practice alert, that is supposed to be handled by the network layer. However I Hadn't have enough time
    const apiUri =
      "https://bovtest-842c0-default-rtdb.firebaseio.com/data/checklists.json";
    const CryptoJS = require("crypto-js");
    const cryptKey = "bovTest";

    NetInfo.fetch().then((state) => {
      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify([...checklistData, submitModel]),
        cryptKey
      ).toString(); // encrypting data

      if (state.isConnected) {
        // Request online APIRest
        fetch(apiUri, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: encryptedData }),
        }).then((response) => {
          console.log(response.json());
        });
      } else {
        // Set offline bool
        setOfflineRequestOpen(true);
        // Store local data
        async () => {
          try {
            const jsonValue = JSON.stringify([...checklistData, submitModel]);
            const encryptedData = CryptoJS.AES.encrypt(
              JSON.stringify(jsonValue),
              cryptKey
            ).toString(); // encrypting data
            await AsyncStorage.setItem("@checklistData", encryptedData);
            await AsyncStorage.setItem("@offlineRequestOpen", true);
          } catch (e) {
            // saving error
          }
        };
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <TextInput
          label="Name"
          value={name}
          onChangeText={(value) => setName(value)}
        />
        <TextInput
          label="To"
          value={to}
          onChangeText={(value) => setTo(value)}
        />
        <TextInput
          label="Type"
          value={type}
          onChangeText={(value) => setType(value)}
        />
        <TextInput
          label="Farmer name"
          value={fName}
          onChangeText={(value) => setFName(value)}
        />
        <TextInput
          label="Farmer city"
          value={fCity}
          onChangeText={(value) => setFCity(value)}
        />
        <TextInput
          label="Amount of milk"
          value={amount}
          onChangeText={(value) => setAmount(value)}
          keyboardType="numeric"
        />
        <TextInput
          label="Number of Cows"
          value={cowsNumber}
          onChangeText={(value) => setCowsNumber(value)}
          keyboardType="numeric"
        />
        <Checkbox.Item
          label="Had Supervision"
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
        />
      </View>

      <Button
        style={styles.button}
        icon="arrow-up"
        mode="contained"
        onPress={handleSubmit}
        color={Colors.yellow600}
      >
        Submit
      </Button>
    </View>
  );
};

export default ChecklistAdd;
