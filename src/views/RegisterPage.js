import React from 'react';

// reactstrap components
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Label,
  Button,
} from 'reactstrap';

// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { auth, generateUserDocument } from "../firebase";
import {
  VpnKeyOutlined,
  MailOutline,
  TextFields,
  PermIdentity,
} from '@material-ui/icons';
import { compose, keys, map, propEq, all, equals, filter } from 'ramda';
// core components
import bgImage from 'assets/img/bg16.jpg';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      register: {
        firstNameState: '',
        lastNameState: '',
        emailState: '',
        passwordState: '',
        confirmState: '',
      },
      disableSubmit: true,
    };
  }
  componentDidMount() {
    document.body.classList.add('register-page');
  }
  componentWillUnmount() {
    document.body.classList.remove('register-page');
  }
  registerEmail(e) {
    var register = this.state.register;
    register['email'] = e.target.value;
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(e.target.value)) {
      register['emailState'] = 'has-success';
    } else {
      register['emailState'] = 'has-danger';
    }
    this.setState({ register });
  }
  registerPassword(e) {
    var register = this.state.register;
    register['password'] = e.target.value;
    if (e.target.value.length > 0) {
      register['passwordState'] = 'has-success';
    } else {
      register['passwordState'] = 'has-danger';
    }
    if (register['password'] === register['confirm']) {
      register['confirmState'] = 'has-success';
    } else {
      register['confirmState'] = 'has-danger';
    }
    this.setState({ register });
  }
  registerConfirm(e) {
    var register = this.state.register;
    register['confirm'] = e.target.value;
    if (register['password'] === register['confirm']) {
      register['confirmState'] = 'has-success';
    } else {
      register['confirmState'] = 'has-danger';
    }
    this.setState({ register });
  }
  registerFirstName(e) {
    var register = this.state.register;
    register['firstName'] = e.target.value;
    if (e.target.value.length > 0) {
      register['firstNameState'] = 'has-success';
    } else {
      register['firstNameState'] = 'has-danger';
    }
    this.setState({ register });
  }
  registerLastName(e) {
    var register = this.state.register;
    register['lastName'] = e.target.value;
    if (e.target.value.length > 0) {
      register['lastNameState'] = 'has-success';
    } else {
      register['lastNameState'] = 'has-danger';
    }
    this.setState({ register });
  }
  shouldEnableSubmit = () => {
    const { register } = this.state;

    return compose(
      all(equals(true)),
      map((type) => propEq(type, 'has-success', register)),
      filter((type) => type.slice(-5) === 'State'),
      keys
    )(register);
  };
  register = () => {
    const { register } = this.state;
    if (this.shouldEnableSubmit()) {
      this.createUserWithEmailAndPasswordHandler(register.firstName, register.lastName, register.email, register.password);
      this.props.history.push('/admin/dashboard');
    }
  };

  createUserWithEmailAndPasswordHandler = async (firstName, lastName, email, password) => {
    try{
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      generateUserDocument({...user, displayName: `${firstName} ${lastName}`}, {firstName, lastName});
    }
    catch(error){
      console.log('Error Signing up with email and password');
    }
  };
  render() {
    return (
      <>
        <div className="content">
          <div className="register-page">
            <Container>
              <Row className="justify-content-center">
                <Col lg={5} md={8} xs={12}>
                  <div className="info-area info-horizontal mt-5">
                    <div className="icon icon-primary">
                      <i className="now-ui-icons media-2_sound-wave" />
                    </div>
                    <div className="description">
                      <h5 className="info-title">Marketing</h5>
                      <p className="description">
                        We've created the marketing campaign of the website. It
                        was a very interesting collaboration.
                      </p>
                    </div>
                  </div>
                  <div className="info-area info-horizontal">
                    <div className="icon icon-primary">
                      <i className="now-ui-icons media-1_button-pause" />
                    </div>
                    <div className="description">
                      <h5 className="info-title">Fully Coded in React 16</h5>
                      <p className="description">
                        We've developed the website with React 16, HTML5 and
                        CSS3. The client has access to the code using GitHub.
                      </p>
                    </div>
                  </div>
                  <div className="info-area info-horizontal">
                    <div className="icon icon-info">
                      <i className="now-ui-icons users_single-02" />
                    </div>
                    <div className="description">
                      <h5 className="info-title">Built Audience</h5>
                      <p className="description">
                        There is also a Fully Customizable CMS Admin Dashboard
                        for this product.
                      </p>
                    </div>
                  </div>
                </Col>
                <Col lg={4} md={8} xs={12}>
                  <Card className="card-signup">
                    <CardHeader className="text-center">
                      <CardTitle tag="h4">Register</CardTitle>
                      <div className="social btns-mr-5">
                        <Button className="btn-icon btn-round" color="twitter">
                          <i className="fab fa-twitter" />
                        </Button>
                        <Button className="btn-icon btn-round" color="dribbble">
                          <i className="fab fa-dribbble" />
                        </Button>
                        <Button className="btn-icon btn-round" color="facebook">
                          <i className="fab fa-facebook-f" />
                        </Button>
                        <h5 className="card-description">or be classical</h5>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <Form>
                        <InputGroup
                          className={`${this.state.register.firstnameState} ${
                            this.state.firstnameFocus && 'input-group-focus'
                          }`}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <PermIdentity
                                color={
                                  this.state.register.firstNameState ===
                                  'has-error'
                                    ? 'error'
                                    : 'inherit'
                                }
                              />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            placeholder="First Name..."
                            onFocus={(e) =>
                              this.setState({ firstnameFocus: true })
                            }
                            onBlur={(e) =>
                              this.setState({ firstnameFocus: false })
                            }
                            onChange={(e) => this.registerFirstName(e)}
                          />
                        </InputGroup>
                        <InputGroup
                          className={`${this.state.register.lastnameState} ${
                            this.state.lastNameFocus && 'input-group-focus'
                          }`}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <TextFields
                                color={
                                  this.state.register.lastnameState ===
                                  'has-error'
                                    ? 'error'
                                    : 'inherit'
                                }
                                fontSize="small"
                              />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            placeholder="Last Name..."
                            onFocus={(e) =>
                              this.setState({ lastnameFocus: true })
                            }
                            onBlur={(e) =>
                              this.setState({ lastnameFocus: false })
                            }
                            onChange={(e) => this.registerLastName(e)}
                          />
                        </InputGroup>
                        <InputGroup
                          className={`${this.state.register.emailState} ${
                            this.state.emailFocus && 'input-group-focus'
                          }`}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <MailOutline
                                color={
                                  this.state.register.emailState === 'has-error'
                                    ? 'error'
                                    : 'inherit'
                                }
                                fontSize="small"
                              />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="email"
                            placeholder="Email..."
                            onFocus={(e) => this.setState({ emailFocus: true })}
                            onBlur={(e) => this.setState({ emailFocus: false })}
                            onChange={(e) => this.registerEmail(e)}
                          />
                        </InputGroup>
                        <InputGroup
                          className={`${this.state.register.passwordState} ${
                            this.state.passwordFocus && 'input-group-focus'
                          }`}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <VpnKeyOutlined
                                color={
                                  this.state.register.passwordState ===
                                  'has-error'
                                    ? 'error'
                                    : 'inherit'
                                }
                                fontSize="small"
                              />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="password"
                            placeholder="Password..."
                            onFocus={(e) =>
                              this.setState({ passwordFocus: true })
                            }
                            onBlur={(e) =>
                              this.setState({ passwordFocus: false })
                            }
                            onChange={(e) => this.registerPassword(e)}
                          />
                        </InputGroup>
                        <InputGroup
                          className={`${this.state.register.confirmState} ${
                            this.state.confirmFocus && 'input-group-focus'
                          }`}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <VpnKeyOutlined
                                color={
                                  this.state.register.confirmState ===
                                  'has-error'
                                    ? 'error'
                                    : 'inherit'
                                }
                                fontSize="small"
                              />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="password"
                            placeholder="Confirm Password..."
                            onFocus={(e) =>
                              this.setState({ confirmFocus: true })
                            }
                            onBlur={(e) =>
                              this.setState({ confirmFocus: false })
                            }
                            onChange={(e) => this.registerConfirm(e)}
                          />
                        </InputGroup>
                        <FormGroup check>
                          <Label check>
                            <Input type="checkbox" />
                            <span className="form-check-sign" />
                            <div>
                              I agree to the{' '}
                              <a href="#something">terms and conditions</a>.
                            </div>
                          </Label>
                        </FormGroup>
                      </Form>
                    </CardBody>
                    <CardFooter className="text-center">
                      {/* <Link to="/admin/dashboard"> */}
                        <Button
                          color="primary"
                          size="lg"
                          className="btn-round"
                          onClick={() => this.register()}
                          disabled={!this.shouldEnableSubmit()}
                        >
                          Register
                        </Button>
                      {/* </Link> */}
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        <div
          className="full-page-background"
          style={{ backgroundImage: 'url(' + bgImage + ')' }}
        />
      </>
    );
  }
}

export default RegisterPage;
