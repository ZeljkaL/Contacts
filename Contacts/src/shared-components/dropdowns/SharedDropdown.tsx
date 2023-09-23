import React, {useCallback} from 'react';
import {
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {colors} from '../../resources/Colors';
import SharedImage, {IconPath} from '../images/SharedImage';
import {ResponsivenessManager} from '../../resources/ResponsivenessManager';

export interface IDropdownItem {
  name: string;
  icon: ImageSourcePropType;
  link: string;
  disabled: boolean;
}

interface SharedDrodpwnProps {
  data: IDropdownItem[];

  customButtonIconPath?: IconPath;
  customButtonIconStyle?: StyleProp<ImageStyle>;

  onSelect: (item: IDropdownItem) => void;
}

const SharedDropdown: React.FC<SharedDrodpwnProps> = props => {
  const {customButtonIconPath, customButtonIconStyle, onSelect} = props;

  const renderCustomizedButtonIcon = (): React.ReactNode => {
    return (
      <SharedImage path={customButtonIconPath} style={customButtonIconStyle} />
    );
  };

  const renderCustomizedRowChild = useCallback(
    (selectedItem: IDropdownItem, _: number, __: boolean): React.ReactNode => {
      return (
        <View
          style={[
            styles.customizedRow,
            selectedItem.disabled && styles.customizedRowDisabled,
          ]}>
          <SharedImage
            path={selectedItem.icon}
            style={styles.customizedRowIcon}
          />
          <Text style={styles.customizedRowText}>{selectedItem.name}</Text>
        </View>
      );
    },
    [],
  );

  const onSelectItem = useCallback(
    (item: IDropdownItem) => {
      if (item.disabled) {
        return;
      }

      onSelect(item);
    },
    [onSelect],
  );

  return (
    <SelectDropdown
      data={props.data}
      dropdownStyle={styles.dropdownListStyle}
      buttonStyle={styles.customizedButtonStyle}
      renderCustomizedButtonChild={
        customButtonIconPath && renderCustomizedButtonIcon
      }
      renderCustomizedRowChild={renderCustomizedRowChild}
      onSelect={onSelectItem}
    />
  );
};

const styles = StyleSheet.create({
  dropdownListStyle: {
    width: ResponsivenessManager.calculateWidth('35%'),
    marginTop: ResponsivenessManager.calculateHeight('1%'),
    borderRadius: ResponsivenessManager.calculateWidth('1%'),
  },

  customizedButtonStyle: {
    width: ResponsivenessManager.calculateWidth('16%'),
    height: '100%',
    borderRadius: ResponsivenessManager.calculateHeight('1%'),
    backgroundColor: colors.beige,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.6,
  },

  customizedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: ResponsivenessManager.calculateWidth('3%'),
  },

  customizedRowIcon: {
    width: ResponsivenessManager.calculateWidth('8%'),
    height: ResponsivenessManager.calculateHeight('8%'),
  },

  customizedRowDisabled: {
    opacity: 0.5,
  },

  customizedRowText: {
    fontSize: 16,
    width: '70%',
  },
});

export default SharedDropdown;
