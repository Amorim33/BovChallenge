import React, { useEffect, useState } from "react";
import { View } from "react-native";

import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ChecklistContext from "./network/checklistContext";
import AppContainer from "./navigation/routes";

export default function App() {
  // Basic configuration
  const [checklistData, setChecklistData] = useState(null);
  const apiUri =
    "https://bovchallenge-default-rtdb.firebaseio.com/data/checklists.json";

  // Retrieving Data
  useEffect(() => {
    if (!checklistData) {
      // Checking network connection
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          // Check if there are staged changes
          async () => {
            try {
              const requestOpen = await AsyncStorage.getItem(
                "@offlineRequestOpen"
              );
              const jsonValue = await AsyncStorage.getItem("@checklistData");
              if (requestOpen) {
                fetch(apiUri, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(jsonValue),
                }).then((response) => {
                  async () => {
                    try {
                      await AsyncStorage.setItem(
                        "@offlineRequestOpen",
                        !requestOpen
                      );
                    } catch (e) {
                      // saving error
                    }
                  };
                });
              }
            } catch (e) {
              console.log(e);
            }
          };
          // Request online APIRest
          fetch(apiUri)
            .then((response) => response.json())
            .then((responseJson) => {
              let aux = [];
              for (let i in responseJson) {
                aux.push(responseJson[i]);
              }

              setChecklistData(aux);
            });
        } else {
          // Request local data
          async () => {
            try {
              const jsonValue = await AsyncStorage.getItem("@checklistData");
              setChecklistData(
                jsonValue != null ? JSON.parse(jsonValue) : null
              );
            } catch (e) {
              console.log(e);
            }
          };
        }
      });
    }
  });

  // Idea of loading
  if (!checklistData) return <View></View>;

  return (
    <ChecklistContext.Provider value={[checklistData, setChecklistData]}>
      <AppContainer screenProps={{ checklists: checklistData }} />
    </ChecklistContext.Provider>
  );
}
