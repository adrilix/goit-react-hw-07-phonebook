import { createSlice } from "@reduxjs/toolkit"
import { addContactThunk, deleteContactThunk, fetchContactsThunk } from "./phonebookReducer";


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
        .addCase(fetchContactsThunk.rejected, (state, { error }) => {
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
        .addCase(addContactThunk.rejected, (state, { error }) => {
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
        .addCase(deleteContactThunk.rejected, (state, { error }) => {
            state.contacts.isLoading = false;
            state.contacts.error = error.message;
        })
})

export const { findContacts } = phonebookSlice.actions;
export const phonebookReducer = phonebookSlice.reducer;