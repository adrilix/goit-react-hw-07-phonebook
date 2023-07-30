import { createSlice } from "@reduxjs/toolkit"
import {createAsyncThunk} from "@reduxjs/toolkit"
import { getContacts, postContact, removeContact } from "services/api"

export const fetchContactsThunk = createAsyncThunk ("contacts/fetchAll",
async (_, {rejectWithValue}) => {
  try {
    const data = await getContacts();
    return data;
  } catch ( error ) {
    return rejectWithValue(error.message);
  }
});
export const addContactThunk = createAsyncThunk ("contacts/addContact",
async (contact, {rejectWithValue}) => {
  try {
    const data = await postContact(contact);
    return data;
  } catch ( error ) {
    return rejectWithValue(error.message);
  }
});
export const deleteContactThunk = createAsyncThunk ("contacts/deleteContact",
async (contactId, {rejectWithValue}) => {
  try {
    const data = await removeContact(contactId);
    return data;
  } catch ( error ) {
    return rejectWithValue(error.message);
  }
});

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null
  },
  filter: '',
}

const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState,
  reducers: {
    findContacts: (state, action) => {
      state.filter = action.payload;
    }
  },
  extraReducers: (builder) => builder
      .addCase(fetchContactsThunk.pending, (state) => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
    })
    .addCase(fetchContactsThunk.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = action.payload;
    })
    .addCase(fetchContactsThunk.rejected, (state, {error}) => { 
      state.contacts.isLoading = false;
        state.contacts.error = error.message;
    })

    .addCase(addContactThunk.pending, (state) => {
      state.contacts.isLoading = true;
      state.contacts.error = null;
  })
    .addCase(addContactThunk.fulfilled, (state, action) => {
      state.contacts.isLoading = false;
      state.contacts.items.push(action.payload);
  })
  .addCase(addContactThunk.rejected, (state, {error}) => { 
    state.contacts.isLoading = false;
      state.contacts.error = error.message;
  })

  .addCase(deleteContactThunk.pending, (state) => {
    state.contacts.isLoading = true;
    state.contacts.error = null;
})
  .addCase(deleteContactThunk.fulfilled, (state, action) => {
    state.contacts.isLoading = false;
     state.contacts.items = state.contacts.items.filter(
      contact => contact.id !== action.payload.id
    );
})
.addCase(deleteContactThunk.rejected, (state, {error}) => { 
  state.contacts.isLoading = false;
    state.contacts.error = error.message;
})
  })

export const { findContacts } = phonebookSlice.actions;

export const selectAllContacts = (state) => state.phonebook.contacts.items;
export const selectIsLoadingStatus = (state) => state.phonebook.contacts.isLoading;
export const selectErrorStatus = (state) => state.phonebook.contacts.error;
export const selectFilter = (state) => state.phonebook.filter;

export const phonebookReducer = phonebookSlice.reducer;
