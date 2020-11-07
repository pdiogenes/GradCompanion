import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Menu = () => {
  return (
    <View style={styles.menu}>
      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>Menu 1</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>Menu 2</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#bbbfca",
  },
  menuItem: {
    padding: 15,
    flex: 1,
  },
  menuText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
  },
});

export default Menu;
