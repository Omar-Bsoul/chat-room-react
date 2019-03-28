import React from 'react';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';

function ErrorSnackbarContent(props) {
  const { message } = props;

  return (
    <SnackbarContent
      style={{ backgroundColor: '#d22e2e' }}
      message={
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <ErrorIcon
            style={{
              fontSize: 20,
              opacity: 0.9,
              marginRight: 25
            }}
          />
          {message}
        </span>
      }
    />
  );
}

export default ErrorSnackbarContent;
