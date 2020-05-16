import Dashboard from "views/Dashboard/Dashboard.js";
import Buttons from "views/Components/Buttons.jsx";
import GridSystem from "views/Components/GridSystem.jsx";
import Panels from "views/Components/Panels.jsx";
import SweetAlert from "views/Components/SweetAlertPage.jsx";
import Notifications from "views/Components/Notifications.jsx";
import Icons from "views/Components/Icons.jsx";
import Typography from "views/Components/Typography.jsx";
import RegularForms from "views/Forms/RegularForms.jsx";
import ExtendedForms from "views/Forms/ExtendedForms.jsx";
import ValidationForms from "views/Forms/ValidationForms.jsx";
import Wizard from "views/Forms/Wizard/Wizard.jsx";
import RegularTables from "views/Tables/RegularTables.jsx";
import ExtendedTables from "views/Tables/ExtendedTables.jsx";
import ReactTable from "views/Tables/ReactTable.jsx";
import GoogleMaps from "views/Maps/GoogleMaps.jsx";
import FullScreenMap from "views/Maps/FullScreenMap.jsx";
import VectorMap from "views/Maps/VectorMap.jsx";
import Charts from "views/Charts/Charts.jsx";
import Calendar from "views/Calendar/Calendar.jsx";
import Newsletter from 'views/Newsletter/Newsletter';
import Documents from 'views/Documents/Documents';
import Widgets from "views/Widgets/Widgets.jsx";
import UserPage from "views/Pages/UserPage.jsx";
import TimelinePage from "views/Pages/TimelinePage.jsx";
import PricingPage from "views/Pages/PricingPage.jsx";
import LoginPage from "views/LoginPage";
import RegisterPage from "views/RegisterPage.js";
import LockScreenPage from "views/Pages/LockScreenPage.jsx";

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
