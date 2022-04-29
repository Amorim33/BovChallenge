import * as React from "react";
import { IconButton, Colors } from "react-native-paper";
import { TouchableOpacity } from "react-native";

import styles from "./styles";

const ChecklistAddButton = (props) => (
  <TouchableOpacity style={styles.container} onPress={props.onPress}>
    <IconButton icon="pencil" color={Colors.yellow800} size={50} />
  </TouchableOpacity>
);

export default ChecklistAddButton;
