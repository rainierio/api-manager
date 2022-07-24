// src/App.js

import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { Container } from "semantic-ui-react";
import ContactListPage from "./pages/contact-list-page";
import ContactFormPage from "./pages/contact-form-page";

const App = () => {
  return (
    <Container>
      <div className="ui two item menu">
        <NavLink className="item" activeclassname="active" exact="true" to="/">
          Contacts List
        </NavLink>
        <NavLink
          className="item"
          activeclassname="active"
          exact="true"
          to="/contacts/new"
        >
          Add Contact
        </NavLink>
      </div>
      <Routes>
        <Route exact="true" path="/" element={<ContactListPage/>} />
        <Route path="/contacts/new" element={<ContactFormPage/>} />
        <Route path="/contacts/edit/:_id" element={<ContactFormPage/>} />
      </Routes>
    </Container>
  );
};

export default App;
