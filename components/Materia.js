import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
const Tarefa = ({ id, nome }) => {
  return (
    <View style={styles.itemBox}>
      <Text style={styles.itemText}>{nome}</Text>
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
