import React, {useCallback} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import uuid from 'react-native-uuid';
import ContactItem from './item/ContactItem';
import {Contact} from '../../../../local-database/entities/Contact';
import {ResponsivenessManager} from '../../../../resources/ResponsivenessManager';

interface ContactListProps {
  contacts: Contact[];

  onContactPress: (contact: Contact) => void;
  onDeleteContact: (contact: Contact) => void;
}

const ContactList: React.FC<ContactListProps> = props => {
  const {contacts, onContactPress, onDeleteContact} = props;

  const keyExtractor = useCallback((_: Contact): string => {
    return uuid.v4().toString();
  }, []);

  const renderItem = useCallback(
    (contact: Contact): JSX.Element => {
      return (
        <ContactItem
          contact={contact}
          onPress={onContactPress}
          onDelete={onDeleteContact}
        />
      );
    },
    [onContactPress, onDeleteContact],
  );

  return (
    <View style={styles.main}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={contacts}
        renderItem={item => renderItem(item.item)}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: ResponsivenessManager.calculateHeight('4%'),
  },
});

export default ContactList;
