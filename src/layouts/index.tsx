import { CDN_URL } from '@/configs';
import px2rem from '@/utils/px2rem';
import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';

export const HEADER_HEIGHT = 80;
export const FO0TER_HEIGHT = 80;

export const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  background-color: #000;

  .background-image {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
`;

export const ContentWrapper = styled.div`
  min-height: calc(100vh - ${HEADER_HEIGHT}px);
  max-width: 1920px;
  padding: 0 ${px2rem(32)};
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  > div {
    width: 100%;
  }
`;

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container>
      <img
        src={`${CDN_URL}/pages/artifacts/background.jpg`}
        alt={'background'}
        className="background-image"
      />
      <Header height={HEADER_HEIGHT} />
      <ContentWrapper>{children}</ContentWrapper>
      <Footer height={FO0TER_HEIGHT} />
    </Container>
  );
};

export default Layout;
