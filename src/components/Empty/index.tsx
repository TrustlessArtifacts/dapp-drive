import { StyledEmpty } from './Empty.styled';
import { CDN_URL } from '@/configs';

export type TEmpty = {
  infoText?: string;
};

const Empty = ({ infoText = '' }: TEmpty) => {
  return (
    <StyledEmpty>
      <img
        width={95}
        height={95}
        src={`${CDN_URL}/icons/empty-white.svg`}
        alt="Not found item"
        className={'image'}
      />
      <p className="content">{infoText}</p>
    </StyledEmpty>
  );
};

export default Empty;
