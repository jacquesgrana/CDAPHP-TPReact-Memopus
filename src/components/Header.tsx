/*

import { useEffect, useState } from "react";
import SecurityService from "../services/SecurityService";

const Header = (props: any) => {
    const securityService = SecurityService.getInstance();
    const [isLogged, setIsLogged] = useState<boolean
    >(props.isLogged);

    useEffect(() => {
        setIsLogged(props.isLogged);
        console.log('isLogged', isLogged);
    }, [props.isLogged]);

    return (
    <header>
      <h1 className="text-center">Header</h1>
      <p>{(props.isLogged ? "Utilisateur connecté" : "Non connecté")}</p>
    </header>
  );
};

export default Header;
*/
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import SecurityService from "../services/SecurityService";

const Header = (props: any) => {
  const navigate = useNavigate();
  const securityService = SecurityService.getInstance();
  const [isLogged, setIsLogged] = useState<boolean>(securityService.isLogged);

  useEffect(() => {
    const updateIsLogged = (newIsLogged: boolean) => {
      setIsLogged(newIsLogged);
    };

    securityService.addListener(updateIsLogged);
    //console.log('apres ajout listener');
    
    return () => {
      securityService.removeListener(updateIsLogged);
    };
  }, []);

  const handleLogout = () => {
    securityService.disconnect(() => {
      navigate('/connect');
    });
  };

  return (
    <header className="d-flex flex-column p-2">
      <h1 className="text-center mt-2">Header</h1>
      <div className="d-flex gap-3 justify-content-center">
      <p className="text-center">{isLogged ? "Utilisateur connecté : " + securityService.username : "Utilisateur non connecté"}</p>
      {isLogged ? <button className="btn btn-warning btn-sm" id="btn-disconnect" onClick={handleLogout}>Déconnecter</button> : ""}
      </div>
    </header>
  );
};

export default Header;
