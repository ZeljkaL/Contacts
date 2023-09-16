import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import HomeHeader from './components/header/HomeHeader';
import ContactList from './components/contact-list/ContactList';
import {Page, PageProps} from '../../stack/StackConfig';
import SharedHeader from '../../shared-components/header/SharedHeader';
import SharedModal from '../../shared-components/modals/SharedModal';
import {Contact} from '../../local-database/entities/Contact';
import ContactEntryView from '../../shared-components/modals/contact-entry/ContactEntryView';

const HomePage: React.FC<PageProps<Page.Home>> = props => {
  const {navigation} = props;

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [resetSearch, setResetSearch] = useState<boolean>(false);
  const [createContactVisible, setCreateContactVisible] =
    useState<boolean>(false);

  const findContacts = useCallback(async (value?: string) => {
    setContacts(await Contact.find(value));
  }, []);

  useFocusEffect(
    useCallback(() => {
      findContacts();
    }, [findContacts]),
  );

  const onContactPress = useCallback(
    (contact: Contact) => {
      setResetSearch(true);
      navigation.navigate(Page.Details, {
        contact: contact,
      });
    },
    [navigation],
  );

  const onSaveContact = useCallback(
    async (contact: Contact) => {
      await Contact.save(contact);

      findContacts();
    },
    [findContacts],
  );

  return (
    <View style={styles.main}>
      <SharedHeader
        element={
          <HomeHeader
            resetSearch={resetSearch || createContactVisible}
            onSearch={findContacts}
            onAdd={() => setCreateContactVisible(true)}
          />
        }
      />
      <ContactList contacts={contacts} onContactPress={onContactPress} />

      {createContactVisible && (
        <SharedModal
          element={
            <ContactEntryView
              onSave={onSaveContact}
              onCancel={() => setCreateContactVisible(false)}
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

export default HomePage;
