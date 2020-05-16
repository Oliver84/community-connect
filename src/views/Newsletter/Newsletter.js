/*eslint-disable*/
import React from "react";
// react component used to create a calendar with events on it
import BigCalendar from "react-big-calendar";
// dependency plugin for react-big-calendar
import moment from "moment";
// react component used to create alerts
import SweetAlert from "react-bootstrap-sweetalert";

// reactstrap components
import { Card, CardBody, Row, Col } from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";
import Iframe from 'react-iframe';

import { events } from "variables/general.jsx";
import './Newsletter.css';

const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: events,
      alert: null
    };
    this.hideAlert = this.hideAlert.bind(this);
  }
  selectedEvent(event) {
    alert(event.title);
  }
  addNewEventAlert(slotInfo) {
    this.setState({
      alert: (
        <SweetAlert
          input
          showCancel
          style={{ display: "block", marginTop: "-100px" }}
          title="Input something"
          onConfirm={e => this.addNewEvent(e, slotInfo)}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="info"
          cancelBtnBsStyle="danger"
        />
      )
    });
  }
  addNewEvent(e, slotInfo) {
    var newEvents = this.state.events;
    newEvents.push({
      title: e,
      start: slotInfo.start,
      end: slotInfo.end
    });
    this.setState({
      alert: null,
      events: newEvents
    });
  }
  hideAlert() {
    this.setState({
      alert: null
    });
  }
  eventColors(event, start, end, isSelected) {
    var backgroundColor = "event-";
    event.color
      ? (backgroundColor = backgroundColor + event.color)
      : (backgroundColor = backgroundColor + "default");
    return {
      className: backgroundColor
    };
  }
  render() {
    return (
      <>
        {/* <PanelHeader
          content={
            <div className="header text-center">
              <h2 className="title">React Big Calendar</h2>
              <p className="category">
                A beautiful react component made by{" "}
                <a href="https://github.com/intljusticemission" target="_blank">
                  International Justice Mission
                </a>
                . Please checkout their{" "}
                <a
                  href="https://github.com/intljusticemission/react-big-calendar"
                  target="_blank"
                >
                  full documentation.
                </a>
              </p>
            </div>
          }
        /> */}
        <div className="content">
          <Iframe url="http://192.168.254.18:8080" className="newsletter" />
        </div>
      </>
    );
  }
}

export default Calendar;
