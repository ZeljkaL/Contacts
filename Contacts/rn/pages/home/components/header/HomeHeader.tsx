import React from 'react';
import {StyleSheet} from 'react-native';
import SharedButton from '../../../../shared-components/buttons/SharedButton';
import {colors} from '../../../../utils/Colors';
import SharedSearchButton from '../../../../shared-components/buttons/SharedSearchButton';
import {TextInputType} from '../../../../shared-components/text-input-fields/SharedTextInput';

interface HomeHeaderProps {
  nameFilter: string;

  onSearch: (value: TextInputType) => void;
  onAdd: () => void;
  onClear: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = props => {
  const {nameFilter, onSearch, onAdd, onClear} = props;

  return (
    <>
      <SharedSearchButton
        value={nameFilter}
        onSearch={onSearch}
        onClear={onClear}
      />
      <SharedButton
        title={'+'}
        style={styles.button}
        textStyle={styles.buttonText}
        onPress={onAdd}
      />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: colors.lightGreen,
  },
});

export default HomeHeader;
