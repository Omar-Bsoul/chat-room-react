import React from 'react';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import OkIcon from '@material-ui/icons/Check';

function ModifiedSnackbarContent(props) {
  const { message, variant } = props;
  console.log(props);

  if (variant === 'error') {
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
  } else if (variant === 'success') {
    return (
      <SnackbarContent
        style={{ backgroundColor: '#46C646' }}
        message={
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <OkIcon
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
  } else {
    return <h4>NO CONTENT</h4>;
  }
}

export default ModifiedSnackbarContent;
