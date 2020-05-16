/*eslint-disable*/
import React from "react";
import { Container } from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";

class Footer extends React.Component {
  render() {
    return (
      <footer
        className={"footer" + (this.props.default ? " footer-default" : "")}
      >
        <Container fluid={this.props.fluid}>
          <nav>
            <ul>
              <li>
                <a
                  href="#"
                  className="mr-4-px"
                  target="_blank"
                >
                  Community Connect
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="mr-4-px"
                  target="_blank"
                >
                  About Us
                </a>
              </li>
            </ul>
          </nav>
          <div className="copyright">
            &copy; {1900 + new Date().getYear()}, Soteki, LLC{" "}
          </div>
        </Container>
      </footer>
    );
  }
}

Footer.defaultProps = {
  default: false,
  fluid: false
};

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool
};

export default Footer;
