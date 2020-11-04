import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Tarefa from "./Materia";

const Materias = ({ listaMaterias }) => {
  return (
    <FlatList
      data={listaMaterias}
      renderItem={({ item }) => <Tarefa id={item.id} nome={item.nome} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={styles.sep} />}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  sep: {
    height: 1,
    backgroundColor: "#303841",
  },
});

export default Materias;
