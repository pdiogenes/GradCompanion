import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
const Navbar = ({ estado }) => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.navTitle}>Graduation Companion</Text>
      <Text style={styles.navText}>{estado}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#303841",
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  navTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  navText: {
    color: "white",
  },
});

export default Navbar;
