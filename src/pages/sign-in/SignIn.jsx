import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [username, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();

  const onSubmitLogin = (e) => {
    e.preventDefault();
    const user = { email: username, password };
    const local = JSON.stringify(user);
    localStorage.setItem('user', local);
    navigate('/dashboard', { replace: true });
    window.location.reload();
  };

  const handleUsername = (event) => {
    setUserName(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmitLogin}>
        <label htmlFor={username}>
          Username:
          <input
            type="text"
            name={username}
            id={username}
            onChange={handleUsername}
          />
        </label>

        <label htmlFor={password}>
          Password:
          <input
            type="password"
            name={password}
            id={password}
            onChange={handlePassword}
          />
        </label>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
export default SignIn;
