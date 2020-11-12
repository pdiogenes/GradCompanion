import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Atividade from "./Atividade";

// Componente que representa a lista de atividades da Matéria selecionada.
const Atividades = (props) => {
  return (
    <FlatList
      data={props.atividades}
      renderItem={({ item }) => (
        <Atividade
          atividade={item}
          onChangePage={props.onSelectAtividade}
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

export default Atividades;
