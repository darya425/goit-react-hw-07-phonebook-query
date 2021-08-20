import { useFetchContactsQuery } from '../../Redux/contactSlice';
import { useState, useEffect } from 'react';
import Filter from '../Filter';
import Contact from '../Contact';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import './ContactsList.scss';

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const { data, isFetching } = useFetchContactsQuery();

  useEffect(() => {
    if (data) {
      setContacts(data);
    }
  }, [data]);

  const onFilterContacts = filter => {
    if (filter) {
      const normalizeFilter = filter.toLowerCase();
      const filterValue = contacts.filter(({ name }) =>
        name.toLowerCase().includes(normalizeFilter),
      );

      setContacts(filterValue);
    } else {
      setContacts(data);
    }
  };

  return (
    <>
      <Filter filter={onFilterContacts} />
      {isFetching && (
        <Loader type="Circles" color="#00BFFF" height={30} width={30} />
      )}
      {contacts && (
        <ul className="list">
          {contacts.map(contact => (
            <Contact key={contact.id} {...contact} />
          ))}
        </ul>
      )}
    </>
  );
};

export default ContactsList;
