// console.log(import.meta.env.VITE_API_URL);

import { useState } from "react";

const App = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [token, setToken] = useState();
  const [products, setProducts] = useState();

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setToken(data.token);
  };

  const handleGetData = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setProducts(data);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmitLogin}>
        <input
          type="email"
          placeholder="Ingrese email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Ingrese password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      <div>
        <h2>Token: {token || "No Token"}</h2>
        <button onClick={handleGetData}>Obtener data</button>
        <pre>
          <code>{JSON.stringify(products, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
};
export default App;
