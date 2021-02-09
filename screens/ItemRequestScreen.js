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
  ToastAndroid,
  Alert,
  FlatList,
  Modal,
  ScrollView,
} from "react-native";
import db from "../config";
import firebase from "firebase";

export default class ItemRequestScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userID: firebase.auth().currentUser.email,
      itemName: "",
      description: "",
    };
  }

  createUniqueID() {
      return Math.random().toString(36).substring(7)
  }

  addItem = (itemName, description) => {
    var userID = this.state.userID;
    db.collection("exchange_requests").add({
        userID: userID,
        itemName: itemName,
        description: description,
    })
    this.setState({
        userID: firebase.auth().currentUser.email,
        itemName: "",
        description: "",
    })
    return Alert.alert("Item ready to exchange", "", [{text: "OK", onPress: () => {this.props.navigation.navigate("DonateItem")}}])
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title={"Request Item"} />
        <KeyboardAvoidingView style={styles.keyBoardStyle}>
          <TextInput
            style={styles.formTextInput}
            placeholder={"Enter Item Name"}
            onChangeText={(text) => {
              this.setState({ itemName: text });
            }}
            value={this.state.itemName}
          />
          <TextInput
            style={[styles.formTextInput, { height: 300, textAlignVertical: "top" }]}
            placeholder={"Enter your Description"}
            onChangeText={(text) => {
              this.setState({ description: text });
            }}
            value={this.state.description}
            multiline
            numberOfLines={8}
            maxLength={594}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              {this.state.itemName == "" && this.state.description == "" ? Alert.alert("The Input Boxes are Empty"):this.addItem(this.state.itemName, this.state.description)}
            }}
>
            <Text style = {styles.buttonText}>Add Item</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  keyBoardStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#00A1F5",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  button: {
    width: "75%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#00A2F5",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 20,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 17,
  },
});
