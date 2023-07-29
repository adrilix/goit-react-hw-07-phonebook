// import { useEffect } from 'react';

import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import { nanoid } from 'nanoid';
import { DivStyled } from './AppStyled';
import { useDispatch, useSelector } from 'react-redux';
import { addNewContact, delContact, findContacts } from 'redux/phonebookReducer';

function App() {
  const contacts = useSelector ((state) => state.phonebook.contacts);
  console.log(contacts);
  const filter = useSelector ((state) => state.phonebook.filter);
  const dispatch = useDispatch()

  // useEffect(() => {
  //    console.log(contacts);
  //    console.log(filter);
  // }, [contacts, filter]);

  const getFindedContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact => {
      return (
        contact.name.toLowerCase().includes(normalizedFilter)
        )
      })
    return filteredContacts
  };
  const handleSubmit = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    console.log('contact', contact);
    console.log(contacts);
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
