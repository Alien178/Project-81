import * as React from "react";
import { Image } from "react-native";
import ItemDonateScreen from "../screens/ItemDonateScreen";
import ItemRequestScreen from "../screens/ItemRequestScreen";
import { createBottomTabNavigator } from "react-navigation-tabs";

export const AppTabNavigator = createBottomTabNavigator({
  DonateItem: {
    screen: ItemDonateScreen,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require("../assets/donate.png")}
          style={{ width: 25, height: 30 }}
        ></Image>
      ),
      tabBarLabel: "Donate Items",
    },
  },
  RequestItem: {
    screen: ItemRequestScreen,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require("../assets/request.png")}
          style={{ width: 30, height: 25 }}
        ></Image>
      ),
      tabBarLabel: "Request Items",
    },
  },
});
