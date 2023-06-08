import { Container } from '@/components/Spinner/styled';

interface IProps {
  className?: string;
}

const Spinner = ({ className }: IProps) => (
  <Container className={className}>
    <div className="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </Container>
);

export default Spinner;
