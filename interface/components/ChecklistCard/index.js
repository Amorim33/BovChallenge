import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

import styles from "./styles";

const ChecklistCard = (props) => {
  const currentChecklist = props.checklist;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => {
          props.navigation.navigate({
            routeName: "ChecklistDetails",
            params: {
              id: currentChecklist.id,
            },
          });
        }}
      >
        <Text style={styles.text}>
          from {currentChecklist.from.name} to {currentChecklist.to.name}
        </Text>
        <Text style={styles.footer}>See more</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChecklistCard;
