import { useState } from 'react';
import {
  useFetchContactsQuery,
  useCreateContactMutation,
} from '../../Redux/contactSlice';
import shortId from 'shortid';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import './Form.scss';

const Form = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const [createContact, { isLoading }] = useCreateContactMutation();
  const { data: contacts } = useFetchContactsQuery();

  const nameImputId = shortId.generate();
  const numberImputId = shortId.generate();

  const handleInputName = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newContact = name.toLowerCase();
    const savedContacts = contacts.find(
      contact => contact.name.toLowerCase() === newContact,
    );

    if (savedContacts) {
      alert(name + ' is already in contacts.');
      reset();
      return;
    }

    console.log(name);
    console.log(number);
    createContact({ name, number });
    toast.success('Contact added!', { autoClose: 2000 });

    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <ToastContainer />
      <form autoComplete="off" className="form" onSubmit={handleSubmit}>
        <label htmlFor={nameImputId} className="name">
          Name :
        </label>
        <input
          id={nameImputId}
          className="name_input"
          type="text"
          name="name"
          value={name}
          placeholder="Enter a made up name..."
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="You need to click on the letters"
          onChange={handleInputName}
          required
        />
        <label htmlFor={numberImputId} className="name">
          Phone number :
        </label>
        <input
          id={numberImputId}
          className="name_input"
          type="tel"
          autoComplete="off"
          name="number"
          value={number}
          placeholder="Enter number 666-666-6666..."
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          title="Do you know what a dash is?"
          onChange={handleInputName}
          required
        />

        <button className="btn-form" type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader type="Circles" color="#00BFFF" height={15} width={15} />
          ) : (
            'Add contact'
          )}
        </button>
      </form>
    </>
  );
};

export default Form;
