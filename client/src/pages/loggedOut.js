import React from 'react';
import { Container } from 'react-bootstrap';

import Auth from '../utils/auth';

const loggedOut = () => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    return (
      <>
        <Container>
          <h2>
            Log in to continue
          </h2>
        </Container>
      </>
    )
  } else

  return (
    <>
      <Container>
        <h2>
        </h2>
      </Container>
    </>
  );
};

export default loggedOut;
