import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../resources/Colors';
import SharedButton from '../../buttons/SharedButton';

interface DialogPopupProps {
  title: string;

  onConfirm: () => void;
  onCancel: () => void;
}

const DialogPopup: React.FC<DialogPopupProps> = props => {
  const {title, onConfirm, onCancel} = props;

  return (
    <View style={styles.main}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.buttons}>
        <SharedButton
          title={'Cancel'}
          style={[styles.button, styles.cancelButton]}
          textStyle={styles.buttonText}
          onPress={onCancel}
        />
        <SharedButton
          title={'Confirm'}
          style={[styles.button, styles.saveButton]}
          textStyle={styles.buttonText}
          onPress={onConfirm}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    backgroundColor: colors.mediumGray,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },

  title: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    height: 50,
    marginTop: 20,
  },

  button: {
    width: 140,
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  saveButton: {
    backgroundColor: 'red',
  },

  cancelButton: {
    borderColor: colors.lightGray,
    borderWidth: 2,
    height: 54,
  },

  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default DialogPopup;
