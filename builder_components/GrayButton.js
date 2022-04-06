import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";

function GrayButton(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]}>
      <View style={styles.rect7}>
        <View style={styles.icon5Row}>
          <Icon name="list" style={styles.icon5}></Icon>
          <Text style={styles.whatIsAqi1}>View Measurement Data</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
  rect7: {
    width: 278,
    height: 45,
    backgroundColor: "rgba(230,230,230,0.64)",
    borderRadius: 21,
    flexDirection: "row"
  },
  icon5: {
    color: "rgba(128,128,128,1)",
    fontSize: 30,
    height: 30,
    width: 30
  },
  whatIsAqi1: {
    fontFamily: "roboto-regular",
    color: "rgba(128,128,128,1)",
    fontSize: 16,
    marginLeft: 14,
    marginTop: 5
  },
  icon5Row: {
    height: 30,
    flexDirection: "row",
    flex: 1,
    marginRight: 39,
    marginLeft: 11,
    marginTop: 8
  }
});

export default GrayButton;
