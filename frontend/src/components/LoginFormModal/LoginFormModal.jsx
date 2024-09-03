import { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(true);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  useEffect(() => {
    if (credential.length < 4 || password.length < 6) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [credential, password]);

  return (
    <div className="login">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          placeholder="Username or Email"
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          required
        />
        {errors.credential && <p className="error">{errors.credential}</p>}
        <button
          type="submit"
          disabled={disabled}
          onClick={(e) => e.stopPropagation()}
        >
          Log In
        </button>
        <button
          type="submit"
          onClick={() => {
            setCredential("Demo-lition");
            setPassword("password");
          }}
        >
          Log in as Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
