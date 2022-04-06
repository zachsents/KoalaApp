import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FeatherIcon from "react-native-vector-icons/Feather";

function Button(props) {
  return (
    <View style={[styles.container, props.style]}>
      <EntypoIcon name="menu" style={styles.iconMenu}></EntypoIcon>
      <FeatherIcon name="settings" style={styles.iconSettings}></FeatherIcon>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  iconMenu: {
    color: "rgba(128,128,128,1)",
    fontSize: 40
  },
  iconSettings: {
    color: "rgba(128,128,128,1)",
    fontSize: 40
  }
});

export default Button;
