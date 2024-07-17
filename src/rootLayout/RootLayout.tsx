import React from 'react';
import Header from './Header';
import Body from './Body';
import { Container } from '@material-ui/core';

const RootLayout: React.FC = () => {
  return (
    <Container>
      <Header />
      <Body />
    </Container>
  );
};

export default RootLayout;
