import * as React from "react";
import { IconButton, Colors } from "react-native-paper";
import { Text, TouchableOpacity } from "react-native";

import styles from "./styles";

const ChecklistAddButton = (props) => (
  <TouchableOpacity style={styles.container} onPress={props.onPress}>
    <IconButton icon="plus-box" color={Colors.yellow800} size={50} />
    <Text style={styles.text}>Add Checklist</Text>
  </TouchableOpacity>
);

export default ChecklistAddButton;
