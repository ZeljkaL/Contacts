import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import SharedTextInput from '../text-input-fields/SharedTextInput';
import {colors} from '../../utils/Colors';
import SharedButton from './SharedButton';
import SharedImage from '../images/SharedImage';

const searchIconPath = '../../assets/search.png';

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

  return (
    <View style={[styles.main, focus && styles.focusStyle]}>
      <SharedImage path={require(searchIconPath)} style={styles.searchIcon} />

      <SharedTextInput
        numeric={false}
        style={styles.inputStyle}
        value={value}
        placeholderTextColor={colors.lighterGreen}
        placeholder="Search"
        onChange={onSearch}
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
    width: '70%',
    borderRadius: 20,
    height: 40,
    backgroundColor: colors.mediumGray,
    marginTop: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
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
    fontSize: 16,
    color: colors.darkGray,
  },
});

export default SharedSearchButton;
