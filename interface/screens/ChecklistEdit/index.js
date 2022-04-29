import React, { useState, useContext } from "react";
import { View } from "react-native";
import { TextInput, Checkbox, Button, Colors } from "react-native-paper";

import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ChecklistContext from "../../../network/checklistContext";
import OfflineBoolContext from "../../../network/offlineBoolContext";

import styles from "./styles";

const ChecklistEdit = (props) => {
  const checklistId = props.navigation.getParam("id");
  let checklist = props.screenProps.checklists.find(
    (element) => element.id === checklistId
  );

  const [name, setName] = useState(checklist.from.name);
  const [to, setTo] = useState(checklist.to.name);
  const [type, setType] = useState(checklist.type);
  const [fName, setFName] = useState(checklist.farmer.name);
  const [fCity, setFCity] = useState(checklist.farmer.city);
  const [amount, setAmount] = useState(checklist.amount_of_milk_produced);
  const [cowsNumber, setCowsNumber] = useState(checklist.number_of_cows_head);
  const [checked, setChecked] = useState(checklist.had_supervision);

  const [checklistData, setChecklistData] = useContext(ChecklistContext);
  const [offlineRequestOpen, setOfflineRequestOpen] =
    useContext(OfflineBoolContext);

  console.log(name);
  const handleSubmit = () => {
    //Updating current checklist
    checklist.from.name = name;
    checklist.to.name = to;
    checklist.type = type;
    checklist.farmer.name = fName;
    checklist.farmer.city = fCity;
    checklist.amount_of_milk_produced = amount;
    checklist.number_of_cows_head = cowsNumber;
    checklist.had_supervision = checked;
    checklist.updated_at = new Date().toLocaleString();

    //Updating checklistData array
    let aux = checklistData;
    for (let i in aux) {
      if (aux[i].id === checklistId) {
        aux[i] = checklist;
        break;
      }
    }
    setChecklistData([...aux]);

    // Bad practice alert, that is supposed to be handled by the network layer. However I Hadn't have enough time
    const apiUri =
      "https://bovtest-842c0-default-rtdb.firebaseio.com/data/checklists.json";
    const CryptoJS = require("crypto-js");
    const cryptKey = "bovTest";
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        const encryptedData = CryptoJS.AES.encrypt(
          JSON.stringify(aux),
          cryptKey
        ).toString(); // encrypting aux, the updated checklistData
        // Request online APIRest
        fetch(apiUri, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: encryptedData }),
        });
      } else {
        // Set offline bool
        setOfflineRequestOpen(true);
        // Store local data
        async () => {
          try {
            const jsonValue = CryptoJS.AES.encrypt(
              JSON.stringify(aux),
              cryptKey
            ).toString(); // encrypting aux, the updated checklistData
            await AsyncStorage.setItem("@checklistData", jsonValue);
            await AsyncStorage.setItem("@offlineRequestOpen", true);
            setOfflineRequestOpen(true);
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

export default ChecklistEdit;
