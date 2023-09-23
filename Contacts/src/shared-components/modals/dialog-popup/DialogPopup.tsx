import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../resources/Colors';
import SharedButton from '../../buttons/SharedButton';
import {ResponsivenessManager} from '../../../resources/ResponsivenessManager';

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
          textStyle={[styles.buttonText, styles.saveTitle]}
          onPress={onConfirm}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: ResponsivenessManager.calculateWidth('95%'),
    borderRadius: ResponsivenessManager.calculateWidth('3%'),
    paddingHorizontal: ResponsivenessManager.calculateWidth('3%'),
    paddingVertical: ResponsivenessManager.calculateWidth('6%'),
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.lightBlue,
  },

  title: {
    color: colors.sandBlue,
    fontSize: 24,
    textAlign: 'center',
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: ResponsivenessManager.calculateWidth('80%'),
    height: ResponsivenessManager.calculateHeight('7%'),
    marginTop: ResponsivenessManager.calculateWidth('6%'),
  },

  button: {
    width: '45%',
    height: '100%',
    borderRadius: ResponsivenessManager.calculateHeight('1%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  saveButton: {
    backgroundColor: colors.sandBlue,
  },

  saveTitle: {
    color: colors.white,
  },

  cancelButton: {
    borderColor: colors.sandBlue,
    borderWidth: 2,
  },

  buttonText: {
    color: colors.sandBlue,
    fontWeight: '500',
  },
});

export default DialogPopup;
