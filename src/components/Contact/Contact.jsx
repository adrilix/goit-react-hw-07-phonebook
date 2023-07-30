import React from 'react';
import PropTypes from 'prop-types';
import {
    ContactStyled,
    ContactDataStyled,
    ButtonDeleteStyled
} from './ContactStyled'

const Contact = ({ id, name, phone, onDeleteContact }) => (
    <ContactStyled>
        <ContactDataStyled>{name}</ContactDataStyled>
        <ContactDataStyled>{phone}</ContactDataStyled>
        <ButtonDeleteStyled onClick={()=>onDeleteContact(id)} type="button">
            delete
        </ButtonDeleteStyled>
    </ContactStyled>
);

Contact.propTypes = {
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
};

export default Contact;
