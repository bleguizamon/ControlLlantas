import "./home.scss";

import React from "react";
import { Link } from "react-router-dom";

import { Row, Col, Alert } from "reactstrap";

import { useAppSelector } from "app/config/store";

export const Home = () => {
  const account = useAppSelector((state) => state.authentication.account);

  return (
    <Row>
      <Col md="9">
        <h2>Bienvenido! esta es la prueba para ingreso a la agencia nacional digital</h2>
       
        {account?.login ? (
          <div>
            <Alert color="success">
              Tu estas logeado como {account.login}.
            </Alert>
          </div>
        ) : (
          <div>
            <Alert color="warning">
              Para ingresar
              <span>&nbsp;</span>
              <Link to="/login" className="alert-link">
                {" "}
                sign in
              </Link>
              , utilizar:
              <br />- Administrador (login=&quot;admin&quot; and
              password=&quot;admin&quot;)
              <br />- User (login=&quot;user&quot; and
              password=&quot;user&quot;).
            </Alert>

            
          </div>
        )}
    

        

      </Col>
    </Row>
  );
};

export default Home;
