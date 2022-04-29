import React from "react";
import { Text, View } from "react-native";

import styles from "./styles";
import ChecklistEditButton from "../../components/ChecklistEditButton/index";

// ChecklistCard component navigates to ChecklistDetails
const ChecklistDetails = (props) => {
  const checklistId = props.navigation.getParam("id");
  const checklist = props.screenProps.checklists.find(
    (element) => element.id === checklistId
  );
  console.log(checklist);
  // Tine treatment
  let createdTime = "";
  let updatedTime = "";

  for (let i = 0; i < checklist.created_at.length; i++) {
    if (checklist.created_at[i] == "-") createdTime += "/";
    else if (checklist.created_at[i] == "T") createdTime += " at ";
    else if (checklist.created_at[i] == ".") break;
    else createdTime += checklist.created_at[i];
  }

  for (let i = 0; i < checklist.updated_at.length; i++) {
    if (checklist.updated_at[i] == "-") updatedTime += "/";
    else if (checklist.updated_at[i] == "T") updatedTime += " at ";
    else if (checklist.updated_at[i] == ".") break;
    else updatedTime += checklist.updated_at[i];
  }
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Type: {checklist.type}</Text>
        <Text style={styles.label}>
          Amount of milk produced: {checklist.amount_of_milk_produced}
        </Text>
        <Text style={styles.label}>
          Number of cows head: {checklist.number_of_cows_head}
        </Text>
        <Text style={styles.label}>
          Had supervision: {checklist.had_supervision ? "Yes" : "No"}
        </Text>
        <Text style={styles.label}>
          Farmer Data:{"\n"}Name is {checklist.farmer.name} and city is{" "}
          {checklist.farmer.city}
        </Text>
        <Text style={styles.label}>
          From {checklist.from.name} to {checklist.to.name}
        </Text>
        <Text style={styles.label}>Created at {createdTime}</Text>
        <Text style={styles.label}>Updated at {updatedTime}</Text>
      </View>
      <ChecklistEditButton
        onPress={() => {
          props.navigation.navigate({
            routeName: "ChecklistEdit",
            params: {
              id: checklistId,
            },
          });
        }}
      />
    </View>
  );
};

export default ChecklistDetails;
