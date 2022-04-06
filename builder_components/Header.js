import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import MaterialHeader1 from "./MaterialHeader1";

function Header(props) {
  return (
    <View style={[styles.container, props.style]}>
      <MaterialHeader1 style={styles.materialHeader1}></MaterialHeader1>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E6E6E6"
  },
  materialHeader1: {
    height: 56,
    width: 375,
    marginTop: -85,
    marginLeft: -15
  }
});

export default Header;
