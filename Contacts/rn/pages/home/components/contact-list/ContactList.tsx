import React, {useCallback} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import ContactItem from './item/ContactItem';

export interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
}

interface ContactListProps {
  contacts: Contact[];

  onContactPress: (contact: Contact) => void;
}

const ContactList: React.FC<ContactListProps> = props => {
  const {contacts, onContactPress} = props;

  const keyExtractor = useCallback((contact: Contact): string => {
    return contact.id;
  }, []);

  const renderItem = useCallback(
    (contact: Contact): JSX.Element => {
      return <ContactItem contact={contact} onPress={onContactPress} />;
    },
    [onContactPress],
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
    paddingVertical: 20,
  },
});

export default ContactList;
