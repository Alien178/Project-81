import * as React from "react";
import MyHeader from "../components/MyHeader";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  FlatList,
} from "react-native";
import { ListItem } from "react-native-elements";
import db from "../config";
import firebase from "firebase";

export default class ItemDonateScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      requestedItemsList: [],
    };
    this.requestRef = null;
  }

  getRequestedItemsList = () => {
    this.requestRef = db.collection("exchange_requests").onSnapshot((Snapshot) => {
      var requestedItemsList = Snapshot.docs.map((document) => document.data());
      this.setState({
        requestedItemsList: requestedItemsList,
      });
    });
  };

  componentDidMount() {
    this.getRequestedItemsList();
  }

  componentWillUnmount() {
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => {
    return (
      <ListItem key={index} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{item.itemName}</ListItem.Title>
          <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
          <TouchableOpacity style={styles.button}>
            <Text style={{ color: "#FFFFFF", fontWeight: "bold", }}>View</Text>
          </TouchableOpacity>
        </ListItem.Content>
      </ListItem>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title={"Donate Item"} />
        <View style={{ flex: 1 }}>
          {this.state.requestedItemsList.length == 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20 }}>List Of All Requested Items</Text>
            </View>
          ) : (
            <FlatList
              data={this.state.requestedItemsList}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
            ></FlatList>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#24A0F2",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
});
