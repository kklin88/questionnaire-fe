import React, { FC } from "react";
import { useNavigate, Link } from "react-router-dom";
const Login: FC = () => {
  const nav = useNavigate();

  return (
    <>
      <div>
        <p>login</p>
        <button onClick={() => nav(-1)}>back to home</button>
        <Link to="/register?a=10"> register</Link>
      </div>
    </>
  );
};

export default Login;
