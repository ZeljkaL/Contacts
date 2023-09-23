import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../../resources/Colors';
import {assets} from '../../../resources/Assets';
import SharedButton from '../../../shared-components/buttons/SharedButton';
import SharedDropdown, {
  IDropdownItem,
} from '../../../shared-components/dropdowns/SharedDropdown';
import {ResponsivenessManager} from '../../../resources/ResponsivenessManager';

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
    height: ResponsivenessManager.calculateHeight('7%'),
    paddingHorizontal: ResponsivenessManager.calculateWidth('15%'),
    marginBottom: ResponsivenessManager.calculateHeight('2%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  button: {
    width: ResponsivenessManager.calculateWidth('16%'),
    height: '100%',
    borderRadius: ResponsivenessManager.calculateHeight('1%'),
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonIcon: {
    width: '50%',
    height: '50%',
    tintColor: colors.beige,
  },

  callButton: {
    backgroundColor: colors.sandBlue,
  },

  messageButton: {
    backgroundColor: colors.green,
  },

  videoIcon: {
    marginLeft: ResponsivenessManager.calculateWidth('3%'),
    tintColor: colors.sandBlue,
  },
});

export default DetailButtonPanel;
