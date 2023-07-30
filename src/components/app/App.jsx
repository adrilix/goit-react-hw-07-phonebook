// import { useEffect } from 'react';

import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import { nanoid } from 'nanoid';
import { DivStyled } from './AppStyled';
import { useDispatch, useSelector } from 'react-redux';
import {
  addContactThunk,
  deleteContactThunk,
  findContacts,
  fetchContactsThunk,
  selectAllContacts,
  selectIsLoadingStatus,
  selectErrorStatus,
  selectFilter,
} from 'redux/phonebookReducer';
import { useEffect } from 'react';
import { LoaderSpinner } from 'components/Loader/Loader';

function App() {
  const contacts = useSelector(selectAllContacts);
  const isLoading = useSelector(selectIsLoadingStatus);
  const error = useSelector(selectErrorStatus);
  const filter = useSelector(selectFilter);

  console.log(`актуальний масив:`, contacts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (!error) return;
    alert(error);
  }, [error]);

  const getFindedContacts = () => {
    if (!contacts || contacts.length === 0) return;
    if (!filter || filter.length === 0) return contacts;
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return filteredContacts;
  };

  const handleSubmit = ({ name, phone }) => {
    const contact = {
      name,
      phone,
      id: nanoid(),
    };
    console.log('Новий контакт : ', contact);
    const findName = contacts.some(
      el => el.name.toLowerCase() === contact.name.toLowerCase()
    );
    console.log('чи є такий контакт ? ', findName);
    findName
      ? alert(`Contact ${contact.name} is already in the contacts list`)
      : dispatch(addContactThunk(contact));
    console.log('array of object', contacts);
  };

  const changeFilter = event => dispatch(findContacts(event.target.value));

  const removeContact = contactId => {
    dispatch(deleteContactThunk(contactId));
  };

  return (
    <DivStyled>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit}></ContactForm>
      <Filter
        value={filter}
        contacts={getFindedContacts()}
        onChange={changeFilter}
        onDeleteContact={removeContact}
      ></Filter>
      {isLoading && !error && (
        <>
          <LoaderSpinner></LoaderSpinner>
          <b>робота з базою...</b>
        </>
      )}
      {error && (
        <div>
          <p>
            Щось відбулося не так із запитом до серверу. подробиці помилки тут
            :' {error}
          </p>
        </div>
      )}
    </DivStyled>
  );
}

export default App;
