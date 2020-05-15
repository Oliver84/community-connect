import React, { useState, useContext, useEffect, useRef } from "react";
import useError from '../../hooks/useError';
import { Alert } from 'reactstrap';
import NotificationAlert from "react-notification-alert";

const ErrorAlert = () => {
  const { error, removeError } = useError();
  const notify = useRef();
  const options = {
    place: 'tr',
    message: (
        <div>{error && error.message}</div>
    ),
    type: "danger",
    icon: "now-ui-icons ui-1_bell-53",
    autoDismiss: 7
}
  notify.current && notify.current.notificationAlert(options)
  return (
    <NotificationAlert ref={notify} />
  );
};

export default ErrorAlert;
