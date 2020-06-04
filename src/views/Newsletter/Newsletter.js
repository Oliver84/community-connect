/*eslint-disable*/
import React from 'react';
// react component used to create alerts
import SweetAlert from 'react-bootstrap-sweetalert';

import { events } from 'variables/general.jsx';
import CKEditor from '@ckeditor/ckeditor5-react';
import CustomEditor from 'ckeditor5-custom-build/build/ckeditor';
import PanelHeader from 'components/PanelHeader/PanelHeader.jsx';
import { Button, Container } from "reactstrap";
import sampleData from './sampleData';


import './Newsletter.css';

class Newsletter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: events,
      alert: null,
      readOnly: true,
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
          style={{ display: 'block', marginTop: '-100px' }}
          title="Input something"
          onConfirm={(e) => this.addNewEvent(e, slotInfo)}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="info"
          cancelBtnBsStyle="danger"
        />
      ),
    });
  }
  addNewEvent(e, slotInfo) {
    var newEvents = this.state.events;
    newEvents.push({
      title: e,
      start: slotInfo.start,
      end: slotInfo.end,
    });
    this.setState({
      alert: null,
      events: newEvents,
    });
  }
  hideAlert() {
    this.setState({
      alert: null,
    });
  }
  eventColors(event, start, end, isSelected) {
    var backgroundColor = 'event-';
    event.color
      ? (backgroundColor = backgroundColor + event.color)
      : (backgroundColor = backgroundColor + 'default');
    return {
      className: backgroundColor,
    };
  }
  toggleEdit = () => {
    this.setState({
      readOnly: !this.state.readOnly
    })
  }

  render() {
    const options = {};
    return (
      <>
        <PanelHeader
          content={
            <div className="header text-center">
              <h2 className="title">Newsletter</h2>
              <p className="category">Community news</p>
            </div>
          }
        />
        <Container>
        {/* <Button color="primary" onClick={this.toggleEdit}>{this.readOnly ? 'Save' : 'Edit'}</Button> */}
        <CKEditor
          editor={CustomEditor}
          data={sampleData}
          onInit={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          }}
          config={{
            toolbar: {
              items: [
                'undo',
                'redo',
                'heading',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                '|',
                'indent',
                'alignment',
                'outdent',
                '|',
                'imageUpload',
                'blockQuote',
                'insertTable',
                'mediaEmbed',
              ],
            },
            language: 'en',
            image: {
              toolbar: [
                'imageTextAlternative',
                'imageStyle:full',
                'imageStyle:side',
              ],
            },
            table: {
              contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
            },
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          // onBlur={ ( event, editor ) => {
          //     console.log( 'Blur.', editor );
          // } }
          // onFocus={ ( event, editor ) => {
          //     console.log( 'Focus.', editor );
          // } }
          disabled={false}
        />
        </Container>
      </>
    );
  }
}

export default Newsletter;
