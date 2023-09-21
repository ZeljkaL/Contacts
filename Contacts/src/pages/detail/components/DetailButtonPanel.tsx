import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../../resources/Colors';
import {assets} from '../../../resources/Assets';
import SharedButton from '../../../shared-components/buttons/SharedButton';
import SharedDropdown, {
  IDropdownItem,
} from '../../../shared-components/dropdowns/SharedDropdown';

interface DetailButtonPanelProps {
  data: IDropdownItem[];

  onCall: () => void;
  onMessage: () => void;
  onSelectApp: (item: IDropdownItem) => void;
}

const DetailButtonPanel: React.FC<DetailButtonPanelProps> = props => {
  return (
    <View style={styles.main}>
      <SharedButton
        style={[styles.button, styles.callButton]}
        iconPath={assets.call}
        iconStyle={styles.buttonIcon}
        onPress={props.onCall}
      />

      <SharedButton
        style={[styles.button, styles.messageButton]}
        iconPath={assets.inbox}
        iconStyle={styles.buttonIcon}
        onPress={props.onMessage}
      />

      <SharedDropdown
        data={props.data}
        customButtonIconPath={assets.videoCall}
        customButtonIconStyle={[styles.buttonIcon, styles.videoIcon]}
        onSelect={props.onSelectApp}
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
    tintColor: colors.beige,
  },

  callButton: {
    backgroundColor: colors.sandBlue,
  },

  messageButton: {
    backgroundColor: colors.green,
  },

  videoIcon: {
    marginLeft: 5,
    tintColor: colors.sandBlue,
  },
});

export default DetailButtonPanel;
