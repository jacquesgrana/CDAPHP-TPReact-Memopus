import { useState } from "react";
import { useFetcher } from "react-router-dom";

const Connect = () => {
  const [isPwdVisible, setIsPwdVisible] = useState<boolean>(false);

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
            placeholder="Saisir votre nom d'utilisateur"
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
            placeholder="Saisir votre mot de passe"
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
            value="Se Connecter"
          />
        </div>
      </fetcher.Form>
    </div>
  );
};

export default Connect;
