import React from 'react';
import {StyleSheet, View} from 'react-native';
import DetailInfoItem from './item/DetailInfoItem';
import {Contact} from '../../../../local-database/entities/Contact';

interface DetailInfoPanelProps {
  contact: Contact;
}

const DetailInfoPanel: React.FC<DetailInfoPanelProps> = props => {
  const {contact} = props;

  return (
    <View style={styles.main}>
      <DetailInfoItem label="Name" value={contact.name} />
      <DetailInfoItem label="Number" value={contact.phoneNumber} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
  },
});

export default DetailInfoPanel;
