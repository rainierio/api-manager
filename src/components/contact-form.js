import React, { useContext, useState } from "react";
import { Form, Grid, Button } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import classnames from "classnames";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { ContactContext } from "../context/contact-context";
import { flashErrorMessage } from "./flash-message";

export default function ContactForm({ contact }) {
  const [state, dispatch] = useContext(ContactContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: contact });
  const [redirect, setRedirect] = useState(false);


  const createContact = async (data) => {
    try {
      const response = await axios.post("http://localhost:3030/contacts", data);
      dispatch({
        type: "CREATE_CONTACT",
        payload: response.data,
      });
      setRedirect(true);
    } catch (error) {
      flashErrorMessage(dispatch, error);
    }
  };

  const updateContact = async (data) => {
    try {
      const response = await axios.patch(
        `http://localhost:3030/contacts/${contact._id}`,
        data
      );
      dispatch({
        type: "UPDATE_CONTACT",
        payload: response.data,
      });
      setRedirect(true);
    } catch (error) {
      flashErrorMessage(dispatch, error);
    }
  };

  const onSubmit = async (data) => {
    if (contact._id) {
      await updateContact(data);
    } else {
      await createContact(data);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <Grid centered columns={2}>
      <Grid.Column>
        <h1 style={{ marginTop: "1em" }}>
          {contact._id ? "Edit Contact" : "Add New Contact"}
        </h1>
        <Form onSubmit={handleSubmit(onSubmit)} loading={state.loading}>
          <Form.Group widths="equal">
            <Form.Field className={classnames({ error: errors.name })}>
              <label htmlFor="name.first">
                First Name
                <input
                  id="name.first"
                  name="name.first"
                  type="text"
                  placeholder="First Name"
                  {...register("name.first", { required: true, minLength: 2 })}
                />
              </label>
              <span className="error">
                {errors.name &&
                  errors.name.first.type === "required" &&
                  "You need to provide First Name"}
              </span>
              <span className="error">
                {errors.name &&
                  errors.name.first.type === "minLength" &&
                  "Must be 2 or more characters"}
              </span>
            </Form.Field>
            <Form.Field>
              <label htmlFor="name.last">
                Last Name
                <input
                  id="name.last"
                  name="name.last"
                  type="text"
                  placeholder="Last Name"
                  {...register("name.last")}
                />
              </label>
            </Form.Field>
          </Form.Group>
          <Form.Field className={classnames({ error: errors.phone })}>
            <label htmlFor="phone">
              Phone
              <input
                id="phone"
                name="phone"
                type="text"
                placeholder="Phone"
                {...register("phone", {
                  required: true,
                  pattern: /^\+(?:[0-9] ?){6,14}[0-9]$/,
                })}
              />
            </label>
            <span className="error">
              {errors.phone &&
                errors.phone.type === "required" &&
                "You need to provide a Phone number"}
            </span>
            <span className="error">
              {errors.phone &&
                errors.phone.type === "pattern" &&
                "Phone number must be in International format"}
            </span>
          </Form.Field>
          <Form.Field className={classnames({ error: errors.email })}>
            <label htmlFor="email">
              Email
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                })}
              />
            </label>
            <span className="error">
              {errors.email &&
                errors.email.type === "required" &&
                "You need to provide an Email address"}
            </span>
            <span className="error">
              {errors.email &&
                errors.email.type === "pattern" &&
                "Invalid email address"}
            </span>
          </Form.Field>
          <Button primary type="submit">
            Save
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
}
