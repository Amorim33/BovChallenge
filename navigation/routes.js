import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Colors } from "react-native-paper";

import Home from "../interface/screens/Home/index";
import ChecklistAdd from "../interface/screens/ChecklistAdd/index";
import ChecklistDetails from "../interface/screens/ChecklistDetails/index";
import ChecklistEdit from "../interface/screens/ChecklistEdit/index";

const appDefaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Colors.yellow800,
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

const StackNavigator = createStackNavigator(
  {
    Home: Home,
    ChecklistAdd: ChecklistAdd,
    ChecklistDetails: ChecklistDetails,
    ChecklistEdit: ChecklistEdit,
  },
  {
    defaultNavigationOptions: appDefaultNavigationOptions,
  }
);

const AppContainer = createAppContainer(StackNavigator);

export default AppContainer;
