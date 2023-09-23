import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ResponsivenessManager} from '../../resources/ResponsivenessManager';
import {colors} from '../../resources/Colors';

export enum SnackbarType {
  Progress = 0,
  Success = 1,
  Failure = 2,
}

const SnackbarResponse = {
  [SnackbarType.Progress]: 'Please wait while we process request...',
  [SnackbarType.Success]: 'Your request was successful.',
  [SnackbarType.Failure]:
    'Sorry, something went wrong. Please try again later.',
};

const SnackbarColor = {
  [SnackbarType.Progress]: colors.sandBlue,
  [SnackbarType.Success]: colors.success,
  [SnackbarType.Failure]: colors.error,
};

interface SnackbarProps {
  snackbarType: SnackbarType;
}

const Snackbar: React.FC<SnackbarProps> = props => {
  const {snackbarType} = props;

  return (
    <View style={styles.main}>
      <View
        style={[
          styles.snackbar,
          {backgroundColor: SnackbarColor[snackbarType]},
        ]}>
        <Text style={styles.text}>{SnackbarResponse[snackbarType]}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    width: ResponsivenessManager.calculateWidth('100%'),
    height: ResponsivenessManager.calculateHeight('100%'),
    backgroundColor: colors.blackHalfShade,
    paddingVertical: ResponsivenessManager.calculateHeight('2%'),
    alignItems: 'flex-end',
  },

  snackbar: {
    width: ResponsivenessManager.calculateWidth('65%'),
    height: ResponsivenessManager.calculateWidth('13%'),
    borderTopLeftRadius: ResponsivenessManager.calculateWidth('2%'),
    borderBottomLeftRadius: ResponsivenessManager.calculateWidth('2%'),
    padding: ResponsivenessManager.calculateWidth('2%'),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'red',
  },

  text: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 15,
    opacity: 0.8,
  },
});

export default Snackbar;
