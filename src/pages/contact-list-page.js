import React, { useContext, useEffect } from "react";
import axios from "axios";
import ContactList from "../components/contact-list";
import { ContactContext } from "../context/contact-context";
import FlashMessage, { flashErrorMessage } from "../components/flash-message";

export default function ContactListPage() {
  const [state, dispatch] = useContext(ContactContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3030/contacts");
        dispatch({
          type: "FETCH_CONTACTS",
          payload: response.data.data || response.data, // in case pagination is disabled
        });
      } catch (error) {
        flashErrorMessage(dispatch, error);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div>
      <h1>List of Contacts</h1>
      {state.message.content && <FlashMessage message={state.message} />}
      <ContactList contacts={state.contacts} />
    </div>
  );
}
