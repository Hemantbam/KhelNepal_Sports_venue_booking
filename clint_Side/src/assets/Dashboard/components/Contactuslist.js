import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../Data/baseIndex';

export default function ContactList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${API}api/contact`);
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  const handleEditContact = async (id) => {
    try {
      const updatedContacts = contacts.map(contact => {
        if (contact._id === id) {
          // Toggle the reached property
          const updatedContact = { ...contact, reached: !contact.reached };
          // Send updated contact to the backend
          axios.put(`${API}api/contact`, updatedContact);
          return updatedContact;
        }
        return contact;
      });
      setContacts(updatedContacts);
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  // Split contacts into reached and unreached arrays
  const reachedContacts = contacts.filter(contact => contact.reached);
  const unreachedContacts = contacts.filter(contact => !contact.reached);

  return (
    <div className="container mx-auto py-8 px-4 text-center">
      <h1 className="text-3xl font-semibold mb-4 text-orange-600 mx-auto">Contacts</h1>
      {contacts.length === 0 ? (
        <p>Nothing added yet</p>
      ) : (
        <div>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border py-2 px-4">S.N</th>
                <th className="border py-2 px-4">Email</th>
                <th className="border py-2 px-4">Subject</th>
                <th className="border py-2 px-4">Message</th>
                <th className="border py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Render unreached contacts */}
              {unreachedContacts.map((contact, index) => (
                <tr key={contact._id} className="bg-red-100">
                  <td className="border py-2 px-4">{index + 1}.</td>
                  <td className="border py-2 px-4">{contact.email}</td>
                  <td className="border py-2 px-4">{contact.subject}</td>
                  <td className="border py-2 px-4">{contact.message}</td>
                  <td className="border py-2 px-4">
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                      onClick={() => handleEditContact(contact._id)}
                    >
                      Mark Reached
                    </button>
                  </td>
                </tr>
              ))}
              {/* Render reached contacts */}
              {reachedContacts.map((contact, index) => (
                <tr key={contact._id} className="bg-white">
                  <td className="border py-2 px-4">{index + 1 + unreachedContacts.length}.</td>
                  <td className="border py-2 px-4">{contact.email}</td>
                  <td className="border py-2 px-4">{contact.subject}</td>
                  <td className="border py-2 px-4">{contact.message}</td>
                  <td className="border py-2 px-4">
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
                      onClick={() => handleEditContact(contact._id)}
                    >
                      Mark Unreached
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
