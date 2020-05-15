/*eslint-disable*/
import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from '../../providers/UserProvider';

// used for making the prop types of this component
import PropTypes from "prop-types";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Nav, Collapse, Button } from "reactstrap";

// core components
import avatar from "assets/img/ryan.jpg";
import logo from "logo-white.svg";

var ps;

const Sidebar = props => {
  // this creates the intial state of this component based on the collapse routes
  // that it gets through this.props.routes
  const getCollapseStates = routes => {
    let initialState = {};
    routes.map((prop, key) => {
      if (prop.collapse) {
        initialState = {
          ...getCollapseStates(prop.views),
          ...initialState
        };
      }
      return null;
    });
    return initialState;
  };
  const [isOpenAvatar, setIsOpenAvatar] = useState(false);
  const [collapsedStates, setCollapsedStates] = useState(getCollapseStates(props.routes))
  const sidebar = React.createRef();

  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
    return () => {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      // to stop the warning of calling setState of unmounted component
      var id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    }
  }, []);
  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.jsx - route /admin/regular-forms
  const getCollapseInitialState = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (window.location.href.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  }
  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        var st = {};
        st[prop["state"]] = !collapsedStates[prop.state];
        return (
          <li
          className={getCollapseInitialState(prop.views) ? "active" : ""}
          // className={false ? "active" : ""}
          key={key}
          >
            <a
              href="#pablo"
              data-toggle="collapse"
              aria-expanded={[prop.state]}
              onClick={e => {
                e.preventDefault();
                setCollapsedStates(st);
              }}
            >
              {prop.icon !== undefined ? (
                <>
                  <i className={prop.icon} />
                  <p>
                    {prop.name}
                    <b className="caret" />
                  </p>
                </>
              ) : (
                <>
                  <span className="sidebar-mini-icon">{prop.mini}</span>
                  <span className="sidebar-normal">
                    {prop.name}
                    <b className="caret" />
                  </span>
                </>
              )}
            </a>
            <Collapse isOpen={collapsedStates[prop.state]}>
              <ul className="nav">{createLinks(prop.views)}</ul>
            </Collapse>
          </li>
        );
      }
      return (
        <li className={activeRoute(prop.layout + prop.path)} key={key}>
          <NavLink to={prop.layout + prop.path} activeClassName="">
            {prop.icon !== undefined ? (
              <>
                <i className={prop.icon} />
                <p>{prop.name}</p>
              </>
            ) : (
              <>
                <span className="sidebar-mini-icon">{prop.mini}</span>
                <span className="sidebar-normal">{prop.name}</span>
              </>
            )}
          </NavLink>
        </li>
      );
    });
  };
  // verifies if routeName is the one active (in browser input)
  const activeRoute = routeName => {
    return window.location.href.indexOf(routeName) > -1 ? "active" : "";
  };
  const user = useContext(UserContext);
    return (
      <>
        <div className="sidebar" data-color={props.backgroundColor}>
          <div className="logo">
            <a
              href="https://www.creative-tim.com?ref=nudr-sidebar"
              className="simple-text logo-mini"
              target="_blank"
            >
              <div className="logo-img">
                <img src={logo} alt="react-logo" />
              </div>
            </a>
            <a
              href="https://www.creative-tim.com?ref=nudr-sidebar"
              className="simple-text logo-normal"
              target="_blank"
            >
              Community Connect
            </a>
            <div className="navbar-minimize">
              <Button
                outline
                className="btn-round btn-icon"
                color="neutral"
                id="minimizeSidebar"
                onClick={() => props.minimizeSidebar()}
              >
                <i className="now-ui-icons text_align-center visible-on-sidebar-regular" />
                <i className="now-ui-icons design_bullet-list-67 visible-on-sidebar-mini" />
              </Button>
            </div>
          </div>

          <div className="sidebar-wrapper" ref={sidebar}>
            <div className="user">
              <div className="photo">
                <img src={avatar} alt="Avatar" />
              </div>
              <div className="info">
                <a
                  href="#pablo"
                  data-toggle="collapse"
                  aria-expanded={isOpenAvatar}
                  onClick={() =>
                    setIsOpenAvatar(!isOpenAvatar)
                  }
                >
                  <span>
                    {user && user.displayName}
                    <b className="caret" />
                  </span>
                </a>
                <Collapse isOpen={isOpenAvatar}>
                  <ul className="nav">
                    <li>
                      <a href="#pablo" onClick={e => e.preventDefault}>
                        <span className="sidebar-mini-icon">MP</span>
                        <span className="sidebar-normal">My Profile</span>
                      </a>
                    </li>
                    <li>
                      <a href="#pablo" onClick={e => e.preventDefault}>
                        <span className="sidebar-mini-icon">EP</span>
                        <span className="sidebar-normal">Edit Profile</span>
                      </a>
                    </li>
                    <li>
                      <a href="#pablo" onClick={e => e.preventDefault}>
                        <span className="sidebar-mini-icon">S</span>
                        <span className="sidebar-normal">Settings</span>
                      </a>
                    </li>
                  </ul>
                </Collapse>
              </div>
            </div>
            <Nav>{createLinks(props.routes)}</Nav>
          </div>
        </div>
      </>
    );
}

Sidebar.defaultProps = {
  routes: [],
  showNotification: false,
  backgroundColor: "blue",
  minimizeSidebar: () => {}
};

Sidebar.propTypes = {
  // links that are rendered
  routes: PropTypes.arrayOf(PropTypes.object),
  // if you want to show a notification when switching between mini sidebar and normal
  showNotification: PropTypes.bool,
  // background color for the component
  backgroundColor: PropTypes.oneOf([
    "blue",
    "yellow",
    "green",
    "orange",
    "red"
  ]),
  // function that is called upon pressing the button near the logo
  minimizeSidebar: PropTypes.func
};

export default Sidebar;
