import React from 'react';
import {StyleSheet} from 'react-native';
import {colors} from '../../../../resources/Colors';
import SharedButton from '../../../../shared-components/buttons/SharedButton';
import SharedSearchButton from '../../../../shared-components/buttons/SharedSearchButton';
import {ResponsivenessManager} from '../../../../resources/ResponsivenessManager';

interface HomeHeaderProps {
  searchValue: string;

  onAdd: () => void;
  onSearch: (value?: string) => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = props => {
  return (
    <>
      <SharedButton
        title={'+'}
        style={styles.button}
        textStyle={styles.buttonText}
        onPress={props.onAdd}
      />
      <SharedSearchButton value={props.searchValue} onSearch={props.onSearch} />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    width: ResponsivenessManager.calculateWidth('10%'),
    height: ResponsivenessManager.calculateHeight('4%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: colors.darkBlue,
  },
});

export default HomeHeader;
