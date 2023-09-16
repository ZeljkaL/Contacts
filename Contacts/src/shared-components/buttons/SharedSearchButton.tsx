import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import SharedButton from './SharedButton';
import SharedImage from '../images/SharedImage';
import SharedTextInput from '../text-input-fields/text-input/SharedTextInput';
import {assets} from '../../resources/Assets';
import {colors} from '../../resources/Colors';

interface SharedSearchButtonProps {
  value: string;
  resetSearch: boolean;

  onSearch: (value: string) => void;
}

const SharedSearchButton: React.FC<SharedSearchButtonProps> = props => {
  const {value, resetSearch, onSearch} = props;

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

  useEffect(() => {
    if (!resetSearch) {
      return;
    }

    onClearText();
  }, [resetSearch, onClearText]);

  return (
    <View style={[styles.main, focus && styles.focusStyle]}>
      <SharedImage path={assets.search} style={styles.searchIcon} />

      <SharedTextInput
        numeric={false}
        style={styles.inputStyle}
        value={value}
        placeholderTextColor={colors.lighterGreen}
        placeholder="Search"
        onChange={onSearchChange}
        onFocus={setFocus}
      />

      <SharedButton
        title={'X'}
        style={[styles.button, focus && styles.activeButton]}
        textStyle={styles.buttonText}
        onPress={onClearText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    borderRadius: 20,
    height: 40,
    backgroundColor: colors.mediumGray,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  focusStyle: {
    borderColor: colors.lightGreen,
    borderWidth: 2,
  },

  inputStyle: {
    width: '70%',
    color: colors.lightGreen,
  },

  searchIcon: {
    width: 25,
    height: 25,
    tintColor: colors.lighterGreen,
  },

  button: {
    width: 20,
    borderRadius: 10,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    opacity: 0.5,
  },

  activeButton: {
    opacity: 1,
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 11,
    color: colors.darkGray,
  },
});

export default SharedSearchButton;
