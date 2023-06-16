import ButtonWrapper from '@/components/ButtonWrapper';
import { CDN_URL } from '@/configs';
import { ROUTE_PATH } from '@/constants/route-path';
import useWindowSize from '@/hooks/useWindowSize';
import Link from 'next/link';
import { useRef } from 'react';
import { StyledAbout } from './About.styled';

const About = () => {
  const { mobileScreen } = useWindowSize();
  const firstSectionRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <StyledAbout>
        <div className="section-01" id="section-1" ref={firstSectionRef}>
          <div className="background">
            {mobileScreen ? (
              <img
                src={`${CDN_URL}/artifact/Landing_page/mobile-artifact-1.png`}
                alt={'background artifact 01'}
                className="position-absolute"
              />
            ) : (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="video"
                poster={`${CDN_URL}/artifact/Landing_page/artifact-1a.png`}
              >
                <source
                  src={`${CDN_URL}/artifact/Landing_page/intro.mp4`}
                  type="video/mp4"
                />
              </video>
            )}
          </div>
          <div className="content">
            <h4 className="subTitle">Smart Inscriptions</h4>
            <h3 className="title">
              {mobileScreen ? (
                <>Take the lead in inscribing larger, smarter inscriptions.</>
              ) : (
                <>Take the lead in inscribing larger, smarter inscriptions.</>
              )}
            </h3>
            <ButtonWrapper variant="primary">
              <Link href={ROUTE_PATH.EXPLORE} className="btn-content">
                Explore now
              </Link>
            </ButtonWrapper>
          </div>
        </div>
        <div className="block">
          <div className="block-item-wrapper">
            <div className="block-item">
              <p className="block-item-title">Smarter</p>
              <p className="block-item-info">
                BRC-721 but with smart contracts—enabling NFTs utilities of
                memberships, collectible items, in-game items, and more to explore.
              </p>
            </div>
          </div>
          <div className="block-item-wrapper">
            <div className="block-item">
              <p className="block-item-title">Larger</p>
              <p className="block-item-info">
                Smart Inscription supports unlimited file size. A {''}
                <Link href="/420" target="_blank">
                  6.9MB Azuki wallpaper
                </Link>{' '}
                has successfully launched on Smart Inscription, and larger files
                await.
              </p>
            </div>
          </div>
          <div className="block-item-wrapper">
            <div className="block-item">
              <p className="block-item-title">Cheaper</p>
              <p className="block-item-info">
                No-loss compression reduces gas fees up to 50% compared to Ordinals
                inscriptions.
                <br />
                <br />* <i>depends on the file type</i>
              </p>
            </div>
          </div>
        </div>
      </StyledAbout>
    </>
  );
};

export default About;
