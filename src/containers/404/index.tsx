import { CDN_URL } from '@/configs';
import { Container } from './404.styled';

const Page404 = () => {
  return (
    <Container>
      <img className='image' src={`${CDN_URL}/pages/artifacts/404-background_1.png`} alt="404 background" />
      <h1 className="page-title">404 - Page not found</h1>
    </Container>
  );
};

export default Page404;
