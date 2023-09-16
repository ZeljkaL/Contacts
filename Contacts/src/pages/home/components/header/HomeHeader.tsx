import React, {useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import {colors} from '../../../../resources/Colors';
import SharedButton from '../../../../shared-components/buttons/SharedButton';
import SharedSearchButton from '../../../../shared-components/buttons/SharedSearchButton';

interface HomeHeaderProps {
  resetSearch: boolean;

  onAdd: () => void;
  onSearch: (value?: string) => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = props => {
  const {onAdd, onSearch} = props;

  const [searchValue, setSearchValue] = useState('');

  const onSearchInput = useCallback(
    (value: string) => {
      setSearchValue(value);
      onSearch(value);
    },
    [onSearch],
  );

  return (
    <>
      <SharedButton
        title={'+'}
        style={styles.button}
        textStyle={styles.buttonText}
        onPress={onAdd}
      />
      <SharedSearchButton
        resetSearch={props.resetSearch}
        value={searchValue}
        onSearch={onSearchInput}
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
    marginBottom: 10,
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: colors.lightGreen,
  },
});

export default HomeHeader;
