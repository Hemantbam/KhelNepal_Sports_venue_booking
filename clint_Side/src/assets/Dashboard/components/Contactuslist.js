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

  const handleEditContact = (id) => {
    // Handle edit action
    console.log('Edit contact:', id);
  };

  const handleDeleteContact = (id) => {
    // Handle delete action
    console.log('Delete contact:', id);
  };

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
              {contacts.map((contact, index) => (
                <tr key={contact._id} className={contact.reached ? "bg-white" : "bg-red-100"}>
                  <td className="border py-2 px-4">{index + 1}.</td>
                  <td className="border py-2 px-4">{contact.email}</td>
                  <td className="border py-2 px-4">{contact.subject}</td>
                  <td className="border py-2 px-4">{contact.message}</td>
                  <td className="border py-2 px-4">
                    <div className="flex flex-col sm:flex-row justify-center">
                      <button
                        className="bg-orange-600 text-white px-3 py-1 rounded mb-2 sm:mr-2 sm:mb-0 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-600"
                        onClick={() => handleEditContact(contact._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                        onClick={() => handleDeleteContact(contact._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <div className="mr-4 flex items-center">
              <div className="w-4 h-4 bg-red-100 mr-2"></div>
              <span>Not Reached</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-white mr-2"></div>
              <span>Reached</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
