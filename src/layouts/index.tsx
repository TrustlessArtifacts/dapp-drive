import React, { PropsWithChildren } from 'react';
import Footer from './Footer';
import Header from './Header';
import styled from 'styled-components';
import px2rem from '@/utils/px2rem';
import { CDN_URL } from "@/configs";

const HEADER_HEIGHT = 80;
const FO0TER_HEIGHT = 80;

export const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bg1};
  background-image: url(${CDN_URL}/pages/artifacts/history-bg.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const ContentWrapper = styled.div`
  min-height: calc(100vh - 8px);
  max-width: 1920px;
  padding: 0 ${px2rem(32)};
  width: 100%;
  
  > div {
    width: 100%;
  }
`;

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container>
      <Header height={HEADER_HEIGHT} />
      <ContentWrapper>{children}</ContentWrapper>
      <Footer height={FO0TER_HEIGHT} />
    </Container>
  );
};

export default Layout;
