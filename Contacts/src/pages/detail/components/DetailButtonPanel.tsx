import React from 'react';
import {StyleSheet, View} from 'react-native';
import SharedButton from '../../../shared-components/buttons/SharedButton';
import {colors} from '../../../utils/Colors';

const callPath = '../../../assets/call.png';
const msgPath = '../../../assets/mess.png';

interface DetailButtonPanelProps {
  onCall: () => void;
  onMessage: () => void;
  onShare: () => void;
}

const DetailButtonPanel: React.FC<DetailButtonPanelProps> = props => {
  return (
    <View style={styles.main}>
      <SharedButton
        style={[styles.button, styles.callButton]}
        iconPath={require(callPath)}
        iconStyle={styles.buttonIcon}
        onPress={props.onCall}
      />

      <SharedButton
        style={[styles.button, styles.messageButton]}
        iconPath={require(msgPath)}
        iconStyle={styles.buttonIcon}
        onPress={props.onMessage}
      />

      <SharedButton
        style={styles.button}
        iconPath={require(callPath)}
        iconStyle={styles.buttonIcon}
        onPress={props.onShare}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: 80,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    width: 60,
    backgroundColor: colors.black,
    borderRadius: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },

  buttonIcon: {
    width: 30,
    height: 30,
    tintColor: 'white',
  },

  callButton: {
    backgroundColor: colors.green,
  },

  messageButton: {
    backgroundColor: colors.blue,
  },
});

export default DetailButtonPanel;
