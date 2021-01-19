import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const Home: React.FC = () => {
  const [tempWeight, setTempWeight] = useState<string>('0');
  const [weight, setWeight] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

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
      <TouchableOpacity
        onPress={() => {
          setModalOpen(!modalOpen);
        }}>
        <Text>Open</Text>
        <View>
          <Text>Meu peso: {weight}</Text>
          <Text> Quantidade de água: {weight * 35}ml</Text>
        </View>
      </TouchableOpacity>
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
  modal: {
    margin: 50,
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
});

export default Home;
