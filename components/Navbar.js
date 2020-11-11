import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
const Navbar = ({ estado }) => {
  const getColor = (estado) => {
    if (estado > 4) {
      return "red";
    }
    if (estado > 2) {
      return "yellow";
    }
    // LOGGERS //
    // SHARK... POG... (musica) //
    return "#fff";
  };
  return (
    <View style={styles.navbar}>
      <Text style={styles.navTitle}>Graduation Companion</Text>
      <Text
        style={{
          color: getColor(estado),
        }}
      >
        {estado}
      </Text>
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
