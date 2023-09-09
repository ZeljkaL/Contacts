import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Contact} from '../../../home/components/contact-list/ContactList';
import DetailInfoItem from './item/DetailInfoItem';

interface DetailInfoPanelProps {
  contact: Contact;
}

const DetailInfoPanel: React.FC<DetailInfoPanelProps> = props => {
  const {contact} = props;

  return (
    <View style={styles.main}>
      <DetailInfoItem label="Name" value={contact.name} />
      <DetailInfoItem label="Phone Number" value={contact.phoneNumber} />
      <DetailInfoItem label="Address" value="23 Street LA" />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
  },
});

export default DetailInfoPanel;
