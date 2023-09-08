// import { Link, Routes, Route } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import App from "./App";
import React, { useState, useEffect } from "react";

function Form(props) {
  const [form, setForm] = useState({
    name: "",
    size: "",
    topping1: false,
    topping2: false,
    topping3: false,
    topping4: false,
    special: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState({
    name: "",
    size: "",
    topping1: "",
    topping2: "",
    topping3: "",
    topping4: "",
    special: "",
  });

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("User is required")
      .min(2, "name must be at least 2 characters"),
    size: yup.string(),
    toppping1: yup.boolean(),
    toppping2: yup.boolean(),
    toppping3: yup.boolean(),
    toppping4: yup.boolean(),
    special: yup.string(),
  });

  // const Validation = (schema, name) => {
  //   yup.reach().validate().then().catch();
  // };

  // const url = "https://reqres.in/api/orders";

  const setFormErrors = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setErrors({ ...errors, [name]: "" }))
      .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }));
  };

  const change = (event) => {
    const { checked, value, name, type } = event.target;
    const valueToUse = type === "checkbox" ? checked : value;
    setFormErrors(name, valueToUse);
    setForm({ ...form, [name]: valueToUse });
  };

  const submit = (event) => {
    event.preventDefault();
    const newOrder = {
      name: form.name.trim(),
      size: form.size,
      topping1: form.topping1,
      topping2: form.topping2,
      topping3: form.topping3,
      topping4: form.topping4,
      special: form.special.trim(),
    };
    axios.post("https://reqres.in/api/orders", newOrder).then((res) => {
      setForm({
        name: "",
        size: "",
        topping1: false,
        topping2: false,
        topping3: false,
        topping4: false,
        special: "",
      }).catch((err) => {
        debugger;
      });
    });
  };

  useEffect(() => {
    schema.isValid(form).then((valid) => setDisabled(!valid));
  }, [form]);

  return (
    <div>
      <h2>Form</h2>
      <div>{errors.name}</div>
      <form id="pizza-form" onSubmit={submit}>
        <label>
          Name:
          <input
            onChange={change}
            id="name-input"
            value={form.name}
            type="text"
            name="name"
          />
        </label>
        &nbsp;
        <label>
          Size:
          <select
            onChange={change}
            id="size-dropdown"
            value={form.size}
            name="size"
          >
            <option value="1">Small</option>
            <option value="2">Medium</option>
            <option value="3">Large</option>
          </select>
        </label>
        &nbsp;
        <label>
          Toppings:
          <input
            onChange={change}
            type="checkbox"
            checked={form.toppping1}
            name="topping1"
          />
          Pepperoni
          <input
            onChange={change}
            type="checkbox"
            checked={form.toppping2}
            name="topping2"
          />
          Sausage
          <input
            onChange={change}
            type="checkbox"
            checked={form.toppping3}
            name="topping3"
          />
          Olives
          <input
            onChange={change}
            type="checkbox"
            checked={form.toppping4}
            name="topping4"
          />
          Peppers
        </label>
        &nbsp;
        <label>
          Special Instructions:
          <input
            onChange={change}
            id="special-text"
            value={form.special}
            type="text"
            name="special"
          />
        </label>
        &nbsp;
        <button id="order-button" disabled={disabled}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
