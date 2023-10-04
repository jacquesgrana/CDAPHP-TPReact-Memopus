import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import SecurityService from "../services/SecurityService";

/**
 * Composant du header du site
 * S'inscrit à l'observable securityService pour afficher,
 * si un user est connecté, le nom de l'user connecté 
 * et le bouton de déconnexion
 * @param props 
 * @returns 
 */
const Header = () => {
  const navigate = useNavigate();
  const securityService = SecurityService.getInstance();
  const [isLogged, setIsLogged] = useState<boolean>(securityService.isLogged);

  useEffect(() => {
    const updateIsLogged = (newIsLogged: boolean) => {
      setIsLogged(newIsLogged);
    };
    securityService.addListener(updateIsLogged);
    
    return () => {
      securityService.removeListener(updateIsLogged);
    };
  }, [securityService]);

  /**
   * Fonction qui appelle la déconnexion et envoi une callback
   * qui redirige sur la route '/connect'
   */
  const handleLogout = () => {
    securityService.disconnect(() => {
      navigate('/connect');
    });
  };

  return (
    <header className="d-flex flex-column p-2">
      <h1 className="text-center mt-2"><span className="text-warning">Memo</span>Pus</h1>
      <div className="d-flex gap-3 justify-content-center">
      <p className="text-center">
        {isLogged ? (
          <>
            {"Utilisateur connecté : "}
            <span className="text-warning">{securityService.username}</span>
          </>
        ) : (
          "Utilisateur non connecté"
        )}
      </p>
      {isLogged ? (
        <button className="btn btn-warning btn-sm" id="btn-disconnect" onClick={handleLogout}>
          Déconnecter
        </button>
      ) : null}
      </div>
    </header>
  );
  
};

export default Header;
