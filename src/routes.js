import Dashboard from "views/Dashboard/Dashboard.js";
import Calendar from "views/Calendar/Calendar.jsx";
import Newsletter from 'views/Newsletter/Newsletter';
import Documents from 'views/Documents/Documents';
import LoginPage from "views/LoginPage";
import RegisterPage from "views/RegisterPage.js";

let routes = [

  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "now-ui-icons design_app",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/newsletter",
    name: "Newsletter",
    icon: "now-ui-icons files_paper",
    component: Newsletter,
    layout: "/admin"
  },
  {
    path: "/calendar",
    name: "Calendar",
    icon: "now-ui-icons media-1_album",
    component: Calendar,
    layout: "/admin"
  },
  {
    path: "/documents",
    name: "Documents",
    icon: "now-ui-icons files_single-copy-04",
    component: Documents,
    layout: "/admin"
  },
  {
    path: "/register-page",
    name: "Register Page",
    short: "Register",
    mini: "RP",
    component: RegisterPage,
    layout: "/auth"
  },
  {
    path: "/login-page",
    name: "Login Page",
    short: "Login",
    mini: "LP",
    component: LoginPage,
    layout: "/auth"
  },
];

export default routes;
