import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Componente que representa o menu abaixo da navbar que permite navegação entre as funções
// de matérias e a lista de atividades
const Menu = (props) => {
  // determina a coloração dos botões no menu
  const ativa = {
    backgroundColor: "#eee",
  };
  const inativa = {
    backgroundColor: "#bbbfca",
  };
  const [corMateria, setCorMateria] = useState(ativa);
  const [corAtividade, setCorAtividade] = useState(inativa);

  return (
    <View style={styles.menu}>
      <TouchableOpacity
        style={[styles.menuItem, corMateria]}
        onPress={() => {
          setCorMateria(ativa);
          setCorAtividade(inativa);
          props.switchTela("materias");
        }}
      >
        <Text style={styles.menuText}>Matérias</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.menuItem, corAtividade]}
        onPress={() => {
          setCorAtividade(ativa);
          setCorMateria(inativa);
          props.switchTela("atividades");
        }}
      >
        <Text style={styles.menuText}>Atividades</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // backgroundColor: "#bbbfca",
  },
  menuItem: {
    flex: 1,
  },
  menuText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    padding: 15,
    textAlign: "center",
  },
});

export default Menu;
