import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {DetailProps, Page, PageProps} from '../../stack/StackConfig';
import ContactList, {Contact} from './components/contact-list/ContactList';
import {CONTACTS_DATA} from './components/MockedData';
import SharedHeader from '../../shared-components/header/SharedHeader';
import HomeHeader from './components/header/HomeHeader';
import SharedModal from '../../shared-components/modals/SharedModal';
import CreateContactView from './components/create-contact/CreateContactView';

const HomePage: React.FC<PageProps<Page.Home>> = props => {
  const {navigation} = props;

  const [contacts, setContacts] = useState<Contact[]>(CONTACTS_DATA);
  const [createContactVisible, setCreateContactVisible] =
    useState<boolean>(false);

  const onContactPress = useCallback(
    (contact: Contact) => {
      const detailProps: DetailProps = {
        contact: contact,
      };

      navigation.navigate(Page.Details, detailProps);
    },
    [navigation],
  );

  const onSaveContact = useCallback((contact: Contact) => {
    setContacts(prev => [...prev, contact]);
  }, []);

  const onSearch = useCallback((value: string) => {
    const filteredContacts = CONTACTS_DATA.filter(contact =>
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
