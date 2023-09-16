import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../resources/Colors';

interface SharedModalProps {
  element: JSX.Element;
}

const SharedModal: React.FC<SharedModalProps> = props => {
  const {element} = props;

  return (
    <View style={styles.modal}>
      <View style={styles.overlay} />
      {element}
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'flex-end',
  },

  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: colors.black,
    opacity: 0.6,
  },
});

export default SharedModal;
