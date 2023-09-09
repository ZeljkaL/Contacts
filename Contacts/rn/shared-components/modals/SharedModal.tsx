import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../utils/Colors';

interface SharedModalProps {
  visibility: boolean;
  jsxElement: JSX.Element;
}

const SharedModal: React.FC<SharedModalProps> = props => {
  const {visibility, jsxElement} = props;

  return (
    <View style={[styles.modal, !visibility && styles.hidden]}>
      <View style={styles.overlay} />
      {jsxElement}
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

  hidden: {
    display: 'none',
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
