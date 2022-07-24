import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ContactForm from "../components/contact-form";
import { flashErrorMessage } from "../components/flash-message";
import { ContactContext } from "../context/contact-context";
import { useParams } from 'react-router-dom';

export default function ContactFormPage() {
  const [state, dispatch] = useContext(ContactContext);
  const [loading, setLoading] = useState(true);
  const { _id } = useParams();

  useEffect(() => {
    if (_id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3030/contacts/${_id}`
          );
          dispatch({
            type: "FETCH_CONTACT",
            payload: response.data,
          });
          setLoading(false);
        } catch (error) {
          flashErrorMessage(dispatch, error);
        }
      };
      fetchData();
    } else {
      setLoading(false);
    }
  }, [_id, dispatch]);

  if (loading) {
    return <p>Please wait...</p>;
  }

  return (
    <div>
      <ContactForm contact={state.contact} />
    </div>
  );
}
