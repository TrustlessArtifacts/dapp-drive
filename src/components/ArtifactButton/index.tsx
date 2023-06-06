import { CDN_URL } from '@/configs';
import useWindowSize from '@/hooks/useWindowSize';
import { PropsWithChildren, useEffect, useState } from 'react';
import { StyledArtifactButton } from './ArtifactButton.styled';

type Props = {
  variant:
    | 'primary'
    | 'white'
    | 'transparent'
    | 'primary-transparent'
    | 'green-transparent';
  width?: number;
  height?: number;
  objectFit?: 'contain' | 'cover';
  className?: string;
};

const ArtifactButton = ({
  variant = 'primary',
  children,
  width,
  height,
  objectFit = 'contain',
  className,
}: PropsWithChildren<Props>) => {
  const { mobileScreen } = useWindowSize();
  const [button, setButton] = useState('');

  useEffect(() => {
    switch (variant) {
      case 'primary':
        setButton(mobileScreen ? 'button-bg.svg' : 'button.svg');
        break;

      case 'white':
        setButton('button-white.svg');
        break;

      case 'transparent':
        setButton('button-transparent.svg');
        break;

      case 'primary-transparent':
        setButton('button-primary-transparent.svg');
        break;

      case 'green-transparent':
        setButton('button-primary-transparent.svg');
        break;

      default:
        break;
    }
  }, [mobileScreen, variant]);

  return (
    <StyledArtifactButton className={`cta-btn ${className}`} objectFit={objectFit}>
      <img
        src={`${CDN_URL}/pages/artifacts/${button}`}
        className="btn-bg"
        alt="button bg"
        width={width}
        height={height}
      />
      <div className="btn-content">{children}</div>
    </StyledArtifactButton>
  );
};

export default ArtifactButton;
