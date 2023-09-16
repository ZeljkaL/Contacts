import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../../../resources/Colors';
import {assets} from '../../../../../resources/Assets';
import {Contact} from '../../../../../local-database/entities/Contact';
import GradientText from '../../../../../shared-components/text/GradientText';
import SharedImage from '../../../../../shared-components/images/SharedImage';
import SharedButton from '../../../../../shared-components/buttons/SharedButton';

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
          colors={[colors.green, colors.lighterGreen]}
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
    width: 330,
    height: 80,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomColor: colors.lighterGreen,
    borderBottomWidth: 2,
    flexDirection: 'row',
    paddingLeft: 20,
  },

  textContainer: {
    width: 190,
  },

  buttonText: {
    color: colors.white,
    fontWeight: '800',
    opacity: 0.65,
  },

  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: colors.darkerGray,
  },

  deleteButton: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  deleteIcon: {
    width: 40,
    height: 40,
    tintColor: colors.darkerGray,
  },
});

export default ContactItem;
