import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Switch,
  SectionList,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";

const MainAtividades = (props) => {
  const ativs = props.atividades;
  ativs.sort((a, b) => {
    let c = new Date(a.data);
    let d = new Date(b.data);
    return c - d;
  });
  const [displayPorMateria, setDisplayPorMateria] = useState(false);
  const [vetor, setVetor] = useState(ativs);

  // const ordernarAtividades = () => {
  //   let ordered;
  //   if (ordenacao) {
  //     ordered = vetor.sort((a, b) => {
  //       // let c = new Date(a.data);
  //       // let d = new Date(b.data);
  //       let c = a.nome;
  //       let d = b.nome;
  //       return c > d;
  //     });
  //   } else {
  //     ordered = vetor.sort((a, b) => {
  //       let c = a.valor;
  //       let d = b.valor;
  //       return c - d;
  //     });
  //   }
  //   setVetor(ordered);
  // };

  const filterVector = () => {
    const aa = props.materias.map((m) => {
      return {
        data: vetor.filter((a) => a.idMateria === m.id),
        title: m.nome,
      };
    });
    return aa;
  };
  const [sections, setSections] = useState(filterVector());

  return (
    <React.Fragment>
      {vetor.length > 0 ? (
        <React.Fragment>
          {displayPorMateria ? (
            <SectionList
              renderItem={(obj) => {
                return (
                  <View style={styles.itemBox}>
                    <Text style={[styles.itemText, { marginLeft: 20 }]}>
                      {obj.item.nome} valor: {obj.item.valor}
                    </Text>
                  </View>
                );
              }}
              renderSectionHeader={({ section }) => (
                <Text
                  style={{
                    fontSize: 30,
                    padding: 15,
                    paddingTop: 30,
                    backgroundColor: "#ddd",
                  }}
                >
                  {section.title}
                </Text>
              )}
              sections={sections}
              SectionSeparatorComponent={() => <View style={styles.sep} />}
            />
          ) : (
            <FlatList
              data={vetor}
              renderItem={(obj) => {
                return (
                  <View style={styles.itemBox}>
                    <TouchableOpacity
                      onPress={() => {
                        const d = new Date(obj.item.data);
                        Alert.alert(
                          `Data de entrega: ${d.getDate() + 1}/${
                            d.getMonth() + 1
                          }/${d.getFullYear()}`
                        );
                      }}
                    >
                      <Text style={styles.itemText}>
                        {obj.item.nome} valor: {obj.item.valor}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View style={styles.sep} />}
            />
          )}

          <View style={styles.switch}>
            <Text>Ordernar por data</Text>
            <Switch
              onChange={() => {
                setDisplayPorMateria(!displayPorMateria);
                // ordernarAtividades();
              }}
              value={displayPorMateria}
            />
            <Text>Agrupar por Matéria</Text>
          </View>
        </React.Fragment>
      ) : (
        <View style={styles.imageBox}>
          <Image
            style={styles.image}
            source={require("./../assets/wink.png")}
          />
          <Text>Não há nenhuma atividade registrada! ;)</Text>
        </View>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  headerNome: {
    flex: 2,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  btn: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#bbbfca",
  },
  switch: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
  sep: {
    height: 1,
    backgroundColor: "#303841",
  },
  itemBox: {
    padding: 15,
  },
  itemText: {
    fontSize: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
  imageBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.2,
    marginVertical: 10,
  },
});

export default MainAtividades;
