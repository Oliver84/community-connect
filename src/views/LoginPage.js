import React, { useState, useContext, useEffect } from 'react';

// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Form,
  Container,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
} from 'reactstrap';

import { Redirect } from 'react-router-dom';
import { auth } from '../firebase';
import { UserContext } from '../providers/UserProvider';
import useError from '../hooks/useError';

// core components
import nowLogo from 'assets/img/now-logo.png';

import bgImage from 'assets/img/bg14.jpg';

const LoginPage = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailState, setEmailState] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const { addError } = useError();
  useEffect(() => {
    document.body.classList.add('login-page');
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);
  const loginEmail = (e) => {
    setEmail(e.target.value);
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setEmailState(emailRex.test(e.target.value) ? 'has-success' : 'has-danger');
  };
  const loginPassword = (e) => {
    setPassword(e.target.value);
    setPasswordState(e.target.value.length > 0 ? 'has-success' : 'has-danger');
  };
  const handleLogin = (credentials) => {
    auth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .catch((err) => {
        addError(err.code);
      });
  };
  const user = useContext(UserContext);
  if (user) {
    return <Redirect to="/admin/dashboard" />;
  }
  return (
    <>
      <div className="content">
        <div className="login-page">
          <Container>
            <Col xs={12} md={8} lg={4} className="ml-auto mr-auto">
              <Form onSubmit={(e) => e.preventDefault()}>
                <Card className="card-login card-plain">
                  <CardHeader>
                    <div className="logo-container">
                      <img src={nowLogo} alt="now-logo" />
                    </div>
                  </CardHeader>
                  <CardBody>
                    <InputGroup
                      className={
                        'no-border form-control-lg ' +
                        (emailFocus ? 'input-group-focus' : '')
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="emaiil"
                        placeholder="Email..."
                        onFocus={(e) => setEmailFocus(true)}
                        onBlur={(e) => setEmailFocus(false)}
                        onChange={(e) => loginEmail(e)}
                      />
                    </InputGroup>
                    <InputGroup
                      className={
                        'no-border form-control-lg ' +
                        (passwordFocus ? 'input-group-focus' : '')
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Password..."
                        onFocus={(e) => setPasswordFocus(true)}
                        onBlur={(e) => setPasswordFocus(false)}
                        onChange={(e) => loginPassword(e)}
                      />
                    </InputGroup>
                  </CardBody>
                  <CardFooter>
                    <Button
                      type="submit"
                      block
                      color="primary"
                      size="lg"
                      className="mb-3 btn-round"
                      onClick={() => handleLogin({ email, password })}
                    >
                      Login
                    </Button>
                    <div className="pull-left">
                      <h6>
                        <a href="#pablo" className="link footer-link">
                          Create Account
                        </a>
                      </h6>
                    </div>
                    <div className="pull-right">
                      <h6>
                        <a href="#pablo" className="link footer-link">
                          Need Help?
                        </a>
                      </h6>
                    </div>
                  </CardFooter>
                </Card>
              </Form>
            </Col>
          </Container>
        </div>
      </div>
      <div
        className="full-page-background"
        style={{ backgroundImage: 'url(' + bgImage + ')' }}
      />
    </>
  );
};

export default LoginPage;
