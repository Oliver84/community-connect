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

import { events } from "variables/general.jsx";
import Document from '../../assets/img/document.png'
import './Documents.css';

const localizer = BigCalendar.momentLocalizer(moment);

class Documents extends React.Component {
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
        <PanelHeader
          content={
            <div className="header text-center">
              <h2 className="title">Document Portal</h2>
              <p className="category">
                Community guidelines and By-Laws
              </p>
            </div>
          }
        />
        <div className="content">
          {this.state.alert}
          <Row>
            <Col xs={12} md={10} className="ml-auto mr-auto">
              <Card className="card-documents-panel">
                <CardBody>
                <Card className="card-document">
                  <CardBody>
                    <img src={Document} />
                    Document 1
                  </CardBody>
                </Card>
                <Card className="card-document">
                  <CardBody>
                    <img src={Document} />
                    Document 2
                  </CardBody>
                </Card>
                <Card className="card-document">
                  <CardBody>
                    <img src={Document} />
                    Document 3
                  </CardBody>
                </Card>
                <Card className="card-document">
                  <CardBody>
                    <img src={Document} />
                    Document 4
                  </CardBody>
                </Card>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Documents;
