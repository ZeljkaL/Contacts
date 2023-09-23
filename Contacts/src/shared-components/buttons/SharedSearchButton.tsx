import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import SharedButton from './SharedButton';
import SharedImage from '../images/SharedImage';
import SharedTextInput from '../text-input-fields/text-input/SharedTextInput';
import {assets} from '../../resources/Assets';
import {colors} from '../../resources/Colors';
import {ResponsivenessManager} from '../../resources/ResponsivenessManager';

interface SharedSearchButtonProps {
  value: string;

  onSearch: (value: string) => void;
}

const SharedSearchButton: React.FC<SharedSearchButtonProps> = props => {
  const {value, onSearch} = props;

  const [focus, setFocus] = useState<boolean>(false);

  const onClearText = useCallback(() => {
    setFocus(false);
    onSearch('');
  }, [onSearch]);

  const onSearchChange = useCallback(
    (searchValue: string) => {
      setFocus(true);
      onSearch(searchValue);
    },
    [onSearch],
  );

  return (
    <View style={[styles.main, focus && styles.focusStyle]}>
      <SharedImage
        path={assets.search}
        style={[styles.searchIcon, focus && styles.active]}
      />

      <SharedTextInput
        numeric={false}
        style={styles.inputStyle}
        value={value}
        placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
        placeholder="Search"
        onChange={onSearchChange}
        onFocus={setFocus}
      />

      <SharedButton
        title={'X'}
        style={[styles.button, focus && styles.active]}
        textStyle={styles.buttonText}
        onPress={onClearText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    borderRadius: ResponsivenessManager.calculateWidth('5%'),
    height: ResponsivenessManager.calculateHeight('5%'),
    paddingHorizontal: ResponsivenessManager.calculateWidth('3%'),
    backgroundColor: colors.sandBlue,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  focusStyle: {
    borderColor: colors.white,
    borderWidth: 2,
  },

  inputStyle: {
    width: ResponsivenessManager.calculateWidth('70%'),
    color: colors.white,
    fontSize: 18,
  },

  searchIcon: {
    width: ResponsivenessManager.calculateWidth('6%'),
    height: ResponsivenessManager.calculateHeight('6%'),
    tintColor: colors.white,
    opacity: 0.5,
  },

  button: {
    width: ResponsivenessManager.calculateWidth('6%'),
    height: ResponsivenessManager.calculateWidth('6%'),
    borderRadius: ResponsivenessManager.calculateWidth('3%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    opacity: 0.5,
  },

  active: {
    opacity: 1,
  },

  buttonText: {
    fontWeight: '900',
    fontSize: 13,
    color: colors.mediumBlue,
  },
});

export default SharedSearchButton;
