import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Materia from "./Materia";

// Componente que representa a lista de matérias.
const Materias = (props) => {
  return (
    <FlatList
      data={props.listaMaterias}
      renderItem={({ item }) => (
        <Materia
          onSelect={props.onSelect}
          id={item.id}
          nome={item.nome}
          onDelete={props.onDelete}
        />
      )}
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
