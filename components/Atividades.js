import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Atividade from "./Atividade";

const Atividades = (props) => {
  // console.log(`[DEBUG]: Atividades -> props.atividades`, props.atividades);
  return (
    <FlatList
      data={props.atividades}
      renderItem={({ item }) => (
        <Atividade atividade={item} onChangePage={props.onSelectAtividade} />
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
