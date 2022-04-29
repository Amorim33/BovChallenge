import React from "react";
import { View } from "react-native";

import ChecklistFeed from "../../components/ChecklistFeed/index";
import ChecklistAddbutton from "../../components/ChecklistAddButton/index";

import styles from "./styles";

const Home = (props) => {
  const checklists = props.screenProps.checklists;

  return (
    <View style={styles.container}>
      <ChecklistAddbutton
        onPress={() => {
          props.navigation.navigate("ChecklistAdd");
        }}
      />
      <ChecklistFeed navigation={props.navigation} checklists={checklists} />
    </View>
  );
};

export default Home;
