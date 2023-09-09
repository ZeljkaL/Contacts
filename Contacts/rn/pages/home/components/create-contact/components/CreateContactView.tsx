import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SharedButton from '../../../../../shared-components/buttons/SharedButton';
import {TextInputType} from '../../../../../shared-components/text-input-fields/SharedTextInput';
import {colors} from '../../../../../utils/Colors';
import {Contact} from '../../contact-list/ContactList';
import TextField from './TextField';
import uuid from 'react-native-uuid';

const imageIcon = '../../../../../assets/imIcon.png';

const Constants = {
  TITLE: 'Create New Contact',
  NAME_LABEL: 'Name',
  NAME_PLACEHOLDER: 'Enter name',

  NUMBER_LABEL: 'Number',
  NUMBER_PLACEHOLDER: 'Enter number',
};

interface CreateContactViewProps {
  onSave: (contact: Contact) => void;
  onCancel: () => void;
}

const CreateContactView: React.FC<CreateContactViewProps> = props => {
  const {onSave, onCancel} = props;

  const [name, setName] = useState<TextInputType>(null);
  const [number, setNumber] = useState<TextInputType>(null);

  const onSaveContact = useCallback(() => {
    if (name === null || number === null) {
      return;
    }

    const newContact: Contact = {
      id: uuid.v4().toString(),
      name: name as string,
      phoneNumber: number.toString(),
    };

    onSave(newContact);
    onCancel();
  }, [name, number, onSave, onCancel]);

  return (
    <View style={styles.main}>
      <Text style={styles.title}>{Constants.TITLE}</Text>
      <SharedButton
        imageSource={require(imageIcon)}
        imageStyle={styles.icon}
        style={styles.iconButton}
        onPress={() => {
          return;
        }}
      />
      <TextField
        value={name}
        numeric={false}
        label={Constants.NAME_LABEL}
        placeholder={Constants.NAME_PLACEHOLDER}
        onChange={setName}
      />
      <TextField
        value={number}
        numeric={true}
        label={Constants.NUMBER_LABEL}
        placeholder={Constants.NUMBER_PLACEHOLDER}
        onChange={setNumber}
      />
      <View style={styles.buttons}>
        <SharedButton
          title={'Cancel'}
          style={[styles.button, styles.cancelButton]}
          textStyle={styles.buttonText}
          onPress={onCancel}
        />

        <SharedButton
          title={'Save'}
          style={[styles.button, styles.saveButton]}
          textStyle={styles.buttonText}
          onPress={onSaveContact}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    alignSelf: 'center',
    backgroundColor: colors.mediumGray,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    width: '100%',
    height: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    color: 'white',
    fontSize: 24,
  },

  iconButton: {
    alignSelf: 'center',
    borderColor: colors.lighterGreen,
    borderRadius: 10,
    borderWidth: 2,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    width: '50%',
    height: '50%',
    tintColor: colors.white,
    opacity: 0.3,
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    height: 50,
  },

  button: {
    width: 140,
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  saveButton: {
    backgroundColor: colors.green,
  },

  cancelButton: {
    borderColor: colors.lightGray,
    borderWidth: 2,
    height: 54,
  },

  buttonText: {
    color: 'white',
    fontWeight: '600',
  },

  inputContainer: {
    borderWidth: 2,
    borderColor: colors.black,
    borderRadius: 10,
    width: '90%',
    height: 50,
    marginVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreateContactView;
