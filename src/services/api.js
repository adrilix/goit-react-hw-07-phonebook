import axios from "axios";

const instance = axios.create({
    baseURL: `https://64c50509c853c26efada6457.mockapi.io/contacts`
})

export const getContacts = async () => {
    try {
        const {data} = await instance.get('/contacts');
        return data;
    } catch (error) {
        console.error('Щось відбулося не так із запитом до серверу. подробиці помилки тут :', error);
    }  
};

export const postContact = async ( contact ) => {
    try {
        const {data} = await instance.post('/contacts', contact);
        return data;
    } catch (error) {
        console.error('Щось відбулося не так із запитом до серверу. подробиці помилки тут :', error);
    }
};

export const removeContact = async (id) => {
    try {
        const {data} = await instance.delete(`/contacts/${id}`);
        return data;
    } catch (error) {
    console.error('Щось відбулося не так із запитом до серверу. подробиці помилки тут :', error);
}
};