// import { Link, Routes, Route } from "react-router-dom";
import * as yup from "yup";
import App from "./App";
import React, { useState, useEffect } from "react";

function Form(props) {
  const [form, setForm] = useState({
    name: "",
    size: "",
    toppping1: false,
    toppping2: false,
    toppping3: false,
    toppping4: false,
    special: "",
  });

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("User is required")
      .min(2, "name must be at least 2 characters"),
    size: yup.string().required("Size is required"),
    toppping1: yup.boolean(),
    toppping2: yup.boolean(),
    toppping3: yup.boolean(),
    toppping4: yup.boolean(),
    special: yup.string(),
  });

  const Validation = (schema, name) => {
    yup.reach().validate().then().catch();
  };

  const url = "https://reqres.in/api/orders";

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    schema.isValid(form).then((valid) => setDisabled(!valid));
  }, [form]);

  const change = (event) => {
    const { checked, value, name, type } = event.target;
    const valueToUse = type === "checkbox" ? checked : value;
    setForm({ ...form, [name]: valueToUse });
  };

  return (
    <div>
      <h2>Form</h2>
      <form id="pizza-form">
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
        <label>
          <input type="submit" value="Submit" />
        </label>
      </form>
    </div>
  );
}

export default Form;
