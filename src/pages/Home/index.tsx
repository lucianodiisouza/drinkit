import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Dimensions,
  Image,
} from 'react-native';
const configIcon = require('../../assets/config.png');

const {width, height} = Dimensions.get('window');

const Home: React.FC = () => {
  const [tempWeight, setTempWeight] = useState<string>('0');
  const [weight, setWeight] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [history, setHistory] = useState([]);

  const defineWeight = () => {
    setModalOpen(!modalOpen);
    setWeight(Number(tempWeight));
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpen}
        onRequestClose={() => console.warn('Fechar modal')}
        style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text>Qual é o seu peso?</Text>
          <TextInput
            style={styles.modalInput}
            keyboardType="number-pad"
            value={tempWeight}
            onChangeText={(e) => setTempWeight(e)}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => setModalOpen(!modalOpen)}
              style={[styles.button]}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => defineWeight()}>
              <Text>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setModalOpen(!modalOpen)}>
          <Image source={configIcon} style={styles.configIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.weightContainer}>
          <Text style={styles.weightLabel}>Meu peso</Text>
          <View style={styles.weightValueContainer}>
            <Text style={styles.weightValue}>{weight}</Text>
            <Text>Kg</Text>
          </View>
        </View>
        <View>
          <Text> Quantidade de água: {(weight * 35) / 1000} Litros</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1ca3ec',
  },
  modalContainer: {
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff3a',
  },
  weightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  weightValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  modal: {
    marginTop: 180,
    marginHorizontal: 50,
    height: 200,
    borderRadius: 5,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  modalInput: {
    width: '90%',
    height: 35,
    borderWidth: 0.5,
    borderColor: '#dedede',
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  header: {
    width: '100%',
    height: '10%',
    paddingTop: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  configIcon: {
    width: 48,
    height: 48,
  },
  body: {
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weightLabel: {},
  weightValue: {
    fontSize: 128,
    fontWeight: 'bold',
  },
  weightUnit: {
    top: 50,
  },
});

export default Home;
