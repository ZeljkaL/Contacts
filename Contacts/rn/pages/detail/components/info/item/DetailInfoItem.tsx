import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {colors} from '../../../../../utils/Colors';

interface DetailInfoItemProps {
  label: string;
  value: string;
}

const DetailInfoItem: React.FC<DetailInfoItemProps> = props => {
  const {label, value} = props;

  return (
    <View style={styles.main}>
      <Text style={styles.label}>
        {label}: <Text style={styles.value}>{value}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 70,
    textAlignVertical: 'center',
    borderBottomColor: colors.lighterGreen,
    borderBottomWidth: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  label: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 16,
    fontWeight: '500',
    width: '100%',
    textAlign: 'justify',
  },

  value: {
    color: colors.white,
  },
});

export default DetailInfoItem;
