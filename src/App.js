import React, { useState, useEffect } from "react";
// import * as yup from "yup";
import Home from "./Home.js";
import Form from "./Form.js";
import { Route, Routes, Link } from "react-router-dom";

// const schema = yup.object().shape({
//   name: yup
//     .string()
//     .required("User is required")
//     .min(2, "name must be at least 2 characters"),
//   size: yup.string().required("Size is required"),
//   toppping1: yup.boolean(),
//   toppping2: yup.boolean(),
//   toppping3: yup.boolean(),
//   toppping4: yup.boolean(),
//   special: yup.string(),
// });

// const Validation = (schema, name) => {
//   yup.reach().validate().then().catch();
// };

// const url = "https://reqres.in/api/orders";

const App = () => {
  // const [disabled, setDisabled] = useState(true);

  // useEffect(() => {
  //   schema.isValid(form).then((valid) => setDisabled(!valid));
  // }, [form]);

  return (
    <div>
      <h1>Lambda Eats</h1>
      <nav>
        <Link to="/">Home</Link>
        &nbsp;
        <Link id="order-pizza" to="pizza">
          Form
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route id="order-pizza" path="pizza/*" element={<Form />}></Route>
      </Routes>
    </div>
  );
};
export default App;
