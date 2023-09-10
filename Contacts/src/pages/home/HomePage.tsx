import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Page, PageProps} from '../../stack/StackConfig';
import ContactList from './components/contact-list/ContactList';
import SharedHeader from '../../shared-components/header/SharedHeader';
import HomeHeader from './components/header/HomeHeader';
import SharedModal from '../../shared-components/modals/SharedModal';
import CreateContactView from './components/create-contact/CreateContactView';
import {Contact} from '../../local-database/entities/Contact';

const HomePage: React.FC<PageProps<Page.Home>> = props => {
  const {navigation} = props;

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [createContactVisible, setCreateContactVisible] =
    useState<boolean>(false);

  const updateContacts = useCallback(async () => {
    const localContacts = await Contact.find();
    setContacts([...localContacts]);
  }, []);

  useEffect(() => {
    updateContacts();
  }, [updateContacts]);

  const onContactPress = useCallback(
    (contact: Contact) => {
      navigation.navigate(Page.Details, {
        contact: contact,
      });
    },
    [navigation],
  );

  const onSaveContact = useCallback(
    async (contact: Contact) => {
      await Contact.save(contact);

      updateContacts();
    },
    [updateContacts],
  );

  const onSearch = useCallback(async (value: string) => {
    const localContacts = await Contact.find();

    // TODO: Implement typeORM filter
    const filteredContacts = localContacts.filter(contact =>
      contact.name.includes(value),
    );
    setContacts(filteredContacts);
  }, []);

  return (
    <View style={styles.main}>
      <SharedHeader
        element={
          <HomeHeader
            onSearch={onSearch}
            onAdd={() => setCreateContactVisible(true)}
          />
        }
      />
      <ContactList contacts={contacts} onContactPress={onContactPress} />
      <SharedModal
        visibility={createContactVisible}
        element={
          <CreateContactView
            onSave={onSaveContact}
            onCancel={() => setCreateContactVisible(false)}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

export default HomePage;
