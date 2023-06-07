import { CDN_URL } from '@/configs';
import useWindowSize from '@/hooks/useWindowSize';
import { PropsWithChildren, useEffect, useState } from 'react';
import { StyledArtifactButton } from './ArtifactButton.styled';
import { ButtonProps } from 'react-bootstrap';

interface IProps extends ButtonProps {
  variant:
    | 'primary'
    | 'primary-lg'
    | 'white'
    | 'transparent'
    | 'transparent-wide'
    | 'primary-transparent'
    | 'green-transparent'
    | 'primary-md'
    | 'transparent-sm';
  width?: number;
  height?: number;
  objectFit?: 'contain' | 'cover';
  className?: string;
}

const ArtifactButton = ({
  variant = 'primary',
  children,
  width,
  height,
  objectFit = 'contain',
  className,
  ...rest
}: PropsWithChildren<IProps>) => {
  const { mobileScreen } = useWindowSize();
  const [button, setButton] = useState('');

  useEffect(() => {
    switch (variant) {
      case 'primary':
        setButton(mobileScreen ? 'button-bg.svg' : 'button.svg');
        break;
      case 'primary-lg':
        setButton(mobileScreen ? 'button-bg.svg' : 'button-primary-lg.svg');
        break;
      case 'primary-md':
        setButton(mobileScreen ? 'button-bg.svg' : 'button-primary-mid.svg');
        break;

      case 'white':
        setButton('button-white.svg');
        break;

      case 'transparent':
        setButton('button-transparent.svg');
        break;

      case 'transparent-wide':
        setButton('button-transparent-wide.svg');
        return;

      case 'transparent-sm':
        setButton('button-transparent-sm.svg');
        return;

      case 'primary-transparent':
        setButton('button-primary-transparent.svg');
        break;

      case 'green-transparent':
        setButton('button-green-transparent.svg');
        break;

      default:
        break;
    }
  }, [mobileScreen, variant]);

  return (
    <StyledArtifactButton
      className={`cta-btn ${className}`}
      objectFit={objectFit}
      {...rest}
    >
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
