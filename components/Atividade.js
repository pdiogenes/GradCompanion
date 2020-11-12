import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";

// Componente que cria o item "Atividade" na lista de Atividades, com funcionalidades de selecionar (onPress) e deletar (onLongPress)
const Tarefa = (props) => {
  return (
    <View style={styles.itemBox}>
      <TouchableOpacity
        onPress={() => {
          props.onChangePage(props.atividade.id);
        }}
        onLongPress={() => {
          props.onDelete(props.atividade.id);
        }}
      >
        <Text style={styles.itemText}>
          {props.atividade.nome} valor: {props.atividade.valor}
        </Text>
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

export default Tarefa;
