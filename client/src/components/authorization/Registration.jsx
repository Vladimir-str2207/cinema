import React, { useState } from "react";
import "./authorization.css";

import { registration } from "../../actions/user";
import Input from "../ui/input/Input";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg">
      <div className="authorization">
        <div className="authorization__header">Регистрация</div>
        <Input
          value={email}
          setValue={setEmail}
          type="text"
          placeholder="Введите email..."
        />
        <Input
          value={username}
          setValue={setUsername}
          type="text"
          placeholder="Введите имя..."
        />
        <Input
          value={password}
          setValue={setPassword}
          type="password"
          placeholder="Введите пароль..."
        />
        <button
          className="authorization__btn"
          onClick={() => registration(email, username, password)}
        >
          Зарегистрироваться
        </button>
      </div>
    </div>
  );
};

export default Registration;
