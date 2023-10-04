import { useState } from "react";
import { useFetcher } from "react-router-dom";

/**
 * Composant Connect, appelé par le routeur, qui affiche 
 * le formulaire de connexion
 * @returns 
 */
const Connect = () => {
  const [isPwdVisible, setIsPwdVisible] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");

  const fetcher = useFetcher();

  const togglePwdVisibility = () => {
    setIsPwdVisible(!isPwdVisible);
  };

  return (
    <div className="div-container">
      <h3 className="mb-4">Page Connect</h3>
      <fetcher.Form className="form-connect" action="/login" method="POST">
        <div className="div-form-input form-group">
          <label className="div-form-input-label" htmlFor="username">
            Nom d'Utilisateur :
          </label>
          <input
            className="form-control div-form-input-input"
            type="text"
            name="username"
            id="username"
            placeholder="saisir votre nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="div-form-input form-group">
          <label className="div-form-input-label" htmlFor="pwd">
            Mot de Passe :
          </label>
          <input
            className="form-control div-form-input-input"
            type={!isPwdVisible ? "password" : "text"}
            name="pwd"
            id="pwd"
            placeholder="saisir votre mot de passe"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-success"
            onClick={togglePwdVisibility}
          >
            ◉
          </button>
        </div>
        <div className="d-flex justify-content-center w-100">
          <input
            className="btn btn-success"
            type="submit"
            value="se connecter"
            disabled={!username || !pwd}
          />
        </div>
      </fetcher.Form>
    </div>
  );
};

export default Connect;
