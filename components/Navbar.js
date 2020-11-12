import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

// Componente que representa a barra de navegação
// que inclui o nome da aplicação e quantas atividades o usuário tem registradas
const Navbar = ({ estado }) => {
  // Colore o número de atividades dependendo de quantas
  const getColor = (estado) => {
    if (estado > 4) {
      return "red";
    }
    if (estado > 2) {
      return "yellow";
    }
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
