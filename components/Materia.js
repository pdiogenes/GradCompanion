import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";

// Componente que cria o item "Matéria" na lista de Materias, com funcionalidades de selecionar (onPress) e deletar (onLongPress)
const Materia = (props) => {
  return (
    <View style={styles.itemBox}>
      <TouchableOpacity
        onPress={() => {
          props.onSelect(props.id);
        }}
        onLongPress={() => {
          props.onDelete(props.id);
        }}
      >
        <Text style={styles.itemText}>{props.nome}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemBox: {
    padding: 15,
  },
  itemText: {
    fontSize: 20,
  },
});

export default Materia;
