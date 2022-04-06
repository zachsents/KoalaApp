import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";

function BlackButton(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]}>
      <View style={styles.rect8}>
        <View style={styles.icon6Row}>
          <Icon name="chevrons-right" style={styles.icon6}></Icon>
          <Text style={styles.shareData}>Share Data</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
  rect8: {
    width: 278,
    height: 45,
    backgroundColor: "rgba(0,0,0,0.64)",
    borderRadius: 21,
    flexDirection: "row"
  },
  icon6: {
    color: "rgba(255,255,255,1)",
    fontSize: 30,
    height: 30,
    width: 30
  },
  shareData: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 16,
    marginLeft: 14,
    marginTop: 5
  },
  icon6Row: {
    height: 30,
    flexDirection: "row",
    flex: 1,
    marginRight: 18,
    marginLeft: 11,
    marginTop: 8
  }
});

export default BlackButton;
