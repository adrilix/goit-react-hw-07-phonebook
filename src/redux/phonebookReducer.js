import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  contacts: [],
  filter: ''
}

const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState,
  reducers: {
    addNewContact : (state, action) => {
        state.contacts = [...state.contacts, action.payload];
    },
    delContact : (state, action) => {
        state.contacts = (state.contacts.filter(({id}) => id !== action.payload));
    },
    findContacts : (state, action) => {
        state.filter = action.payload;
    }
  }
});

export const {addNewContact, delContact, findContacts} = phonebookSlice.actions;

export const phonebookReducer = phonebookSlice.reducer;

// export const phonebookReducer = ( state = initialState, action ) => {

//   switch(action.type) {

//     case "phonebook/addNewContact": return {
//         ...state,
//         contacts: [...state.contacts, action.payload]
//         // contacts: state.contacts.push(action.payload)
//     }
//     case "phonebook/delContact": return {
//         ...state,
//         contacts: (state.contacts.filter(({id}) => id !== action.payload))
//     } 

//     case 'phonebook/findContacts':return {
//         ...state,
//         filter: action.payload
//     }
//      default: return state;
//   }
// }

// export const addNewContact = payload => {
//   return {
//     type: 'phonebook/addNewContact',
//     payload,
//   }
// }

// export const delContact = payload => {
//   return {
//     type: 'phonebook/delContact',
//     payload,
//   }
// }

// export const findContacts = payload => {
//   return {
//     type: 'phonebook/findContacts',
//     payload
//   }
// }

////////action -> {type: "phonebook/addNewContact", payload: contact}
////////action -> {type: "phonebook/delContact", payload: contact}
