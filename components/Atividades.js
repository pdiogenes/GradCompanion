import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Atividade from "./Atividade";

const Atividades = (props) => {
  return (
    <FlatList
      data={props.atividades}
      renderItem={({ item }) => <Atividade atividade={item} />}
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
