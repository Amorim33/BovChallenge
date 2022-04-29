import React from "react";
import { View, FlatList } from "react-native";

import ChecklistCard from "../ChecklistCard/index";

const ChecklistFeed = (props) => {
  const ChecklistArray = props.checklists;

  const RenderChecklist = (data) => {
    return (
      <ChecklistCard navigation={props.navigation} checklist={data.item} />
    );
  };
  return (
    <View>
      <FlatList data={ChecklistArray} renderItem={RenderChecklist}></FlatList>
    </View>
  );
};

export default ChecklistFeed;
