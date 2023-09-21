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
    width: 140,
    marginTop: 5,
    borderRadius: 10,
  },

  customizedButtonStyle: {
    width: 60,
    backgroundColor: colors.beige,
    borderRadius: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    opacity: 0.6,
  },

  customizedRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  customizedRowDisabled: {
    opacity: 0.5,
  },

  customizedRowIcon: {
    width: 30,
    height: 30,
    marginRight: 5,
  },

  customizedRowText: {
    fontSize: 16,
  },
});

export default SharedDropdown;
