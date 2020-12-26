import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import {Icon} from 'react-native-elements';
import {styles} from 'components/Modals/styles';

const CustomModal = ({children, handleClose}) => {
  const [showModal, handleShowModal] = useState(false);

  useEffect(() => {
    handleShowModal(true);
  }, []);
  useEffect(() => () => handleShowModal(false), []);

  return (
    <>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={handleClose}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity style={styles.closeIcon} onPress={handleClose}>
                <Icon name="close" color="#FFF" />
              </TouchableOpacity>
              {children}
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default CustomModal;
