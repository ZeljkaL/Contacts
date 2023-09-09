import React from 'react';
import {Contact} from '../contact-list/ContactList';
import SharedModal from '../../../../shared-components/modals/SharedModal';
import CreateContactView from './components/CreateContactView';

interface CreateContactModalProps {
  visibility: boolean;

  onSave: (contact: Contact) => void;
  onCancel: () => void;
}

const CreateContactModal: React.FC<CreateContactModalProps> = props => {
  const {visibility} = props;

  return (
    <SharedModal
      visibility={visibility}
      jsxElement={
        <CreateContactView onSave={props.onSave} onCancel={props.onCancel} />
      }
    />
  );
};

export default CreateContactModal;
