import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../../../resources/Colors';
import {assets} from '../../../../../resources/Assets';
import {Contact} from '../../../../../local-database/entities/Contact';
import GradientText from '../../../../../shared-components/text/GradientText';
import SharedImage from '../../../../../shared-components/images/SharedImage';
import SharedButton from '../../../../../shared-components/buttons/SharedButton';
import {ResponsivenessManager} from '../../../../../resources/ResponsivenessManager';

interface ContactItemProps {
  contact: Contact;

  onPress: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
}

const ContactItem: React.FC<ContactItemProps> = props => {
  const {contact, onPress, onDelete} = props;

  const onContactPress = () => {
    onPress(contact);
  };

  const onDeleteContactPress = () => {
    onDelete(contact);
  };

  return (
    <TouchableOpacity style={styles.main} onPress={onContactPress}>
      <SharedImage
        path={contact.imagePath ?? assets.contact}
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        <GradientText
          value={contact.name}
          colors={[colors.gray, colors.gray]}
        />
        <Text style={styles.buttonText}>{contact.phoneNumber}</Text>
      </View>
      <SharedButton
        iconPath={assets.delete}
        style={styles.deleteButton}
        iconStyle={styles.deleteIcon}
        onPress={onDeleteContactPress}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    width: ResponsivenessManager.calculateWidth('90%'),
    height: ResponsivenessManager.calculateHeight('8%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: colors.sandBlue,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },

  textContainer: {
    width: ResponsivenessManager.calculateWidth('60%'),
  },

  buttonText: {
    color: colors.gray,
    fontWeight: '600',
    opacity: 0.6,
  },

  icon: {
    width: ResponsivenessManager.calculateWidth('12%'),
    height: ResponsivenessManager.calculateWidth('12%'),
    borderRadius: ResponsivenessManager.calculateWidth('6%'),
    borderWidth: 3,
    borderColor: colors.sandBlue,
    opacity: 0.7,
    backgroundColor: colors.lightBlue,
  },

  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  deleteIcon: {
    width: ResponsivenessManager.calculateWidth('12%'),
    height: ResponsivenessManager.calculateWidth('12%'),
    tintColor: colors.gray,
    opacity: 0.3,
  },
});

export default ContactItem;
