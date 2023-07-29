// import { useEffect } from 'react';

import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import { nanoid } from 'nanoid';
import { DivStyled } from './AppStyled';
import { useDispatch, useSelector } from 'react-redux';
import { addNewContact, delContact, findContacts } from 'redux/phonebookReducer';

function App() {
  const contacts = useSelector ((state) => state.phonebook.contacts.items);
  const isLoading = useSelector ((state) => state.phonebook.contacts.isLoading);
  const error = useSelector ((state) => state.phonebook.contacts.error);

  console.log(contacts);
  console.log(isLoading);
  console.log(error);

  const filter = useSelector ((state) => state.phonebook.filter);
  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(requestPhonebookThunk())
  // }, [dispatch]);

  const getFindedContacts = () => {
    if (!contacts || contacts.length === 0) {return}
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact => (
        contact.name.toLowerCase().includes(normalizedFilter)))
    return filteredContacts;
  };
  const handleSubmit = ({ name, phone }) => {
    const contact = {
      id: nanoid(),
      name,
      phone,
    };
    console.log('contact', contact);
    const findName = contacts.some(
      el => el.name.toLowerCase() === contact.name.toLowerCase()
    );
     console.log('чи є такий контакт ? ',findName);
    findName
      ? alert(`Contact ${contact.name} is already in the contacts list`)
      : dispatch(addNewContact(contact));
      console.log("array of object", contacts);
  };

  const changeFilter = event => dispatch(findContacts(event.target.value));

  const deleteContact = contactId => {
    dispatch(delContact(contactId));
  };

  return (
    <DivStyled>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit}></ContactForm>
      <Filter
        value={filter}
        contacts={getFindedContacts()}
        onChange={changeFilter}
        onDeleteContact={deleteContact}
      ></Filter>
    </DivStyled>
  );
}

export default App;
