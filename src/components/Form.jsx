import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Form = () => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submittedContact, setSubmittedContact] = useState([]);

  const [tableContact, setTableContact] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/contacts", contact);
      setSubmittedContact([...submittedContact, contact]);
      setContact({ name: "", email: "", message: "" });
      const response = await axios.get("http://localhost:5000/api/contacts");
      setTableContact(response.data); 
    } catch (e) {
      console.log(e);
    }
  };

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/contacts");
      setTableContact(response.data);
    } catch (error) {
      console.error(error);
    }}
    fetchData();
  }, [])



  return (
    <div className="form-container">
      <h1>Formulaire de contact</h1>
      <div className="formulaire">
        <form onSubmit={handleSubmit}>
          <div className="saisi">
            <div>
              <input
                type="text"
                name="names"
                placeholder="Nom et Prénom"
                value={contact.name}
                onChange={(e) =>
                  setContact({ ...contact, name: e.target.value })
                }
              />
            </div>
            <div>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={contact.email}
                onChange={(e) =>
                  setContact({ ...contact, email: e.target.value })
                }
              />
            </div>
            <div className="message">
              <input
                type="text"
                name="Message"
                placeholder="Message"
                value={contact.message}
                onChange={(e) =>
                  setContact({ ...contact, message: e.target.value })
                }
              />
            </div>
            <div>
              <button>Envoyer</button>
            </div>
          </div>
        </form>
       
          <div className="submitted-contact">
            <table>
              <thead>
                <tr>
                  <th colspan="1">Nom et Prénom</th>
                  <th colspan="1">Adresse email</th>
                  <th colspan="1">Message</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
              </tbody>
              {tableContact.map((info, index) => (
                <tbody key={index}>
                  <tr>
                    <td>{info.name}</td>
                    <td>{info.email}</td>
                    <td>{info.message}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
      </div>
    </div>
  );
};

export default Form;
