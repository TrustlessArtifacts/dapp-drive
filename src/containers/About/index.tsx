import ArtifactButton from '@/components/ArtifactButton';
import { CDN_URL } from '@/configs';
import useWindowSize from '@/hooks/useWindowSize';
import Link from 'next/link';
import { useRef } from 'react';
import { StyledAbout } from './About.styled';
import { ROUTE_PATH } from '@/constants/route-path';
import IconSVG from '@/components/IconSVG';

const About = () => {
  const { mobileScreen } = useWindowSize();

  const firstSectionRef = useRef<HTMLDivElement>(null);
  // const secondSectionRef = useRef<HTMLDivElement>(null);
  // const thirdSectionRef = useRef<HTMLDivElement>(null);
  // const fourthSectionRef = useRef<HTMLDivElement>(null);
  // const isInViewport1 = useIsInViewport(firstSectionRef);
  // const isInViewport2 = useIsInViewport(secondSectionRef);
  // const isInViewport3 = useIsInViewport(thirdSectionRef);
  // const isInViewport4 = useIsInViewport(fourthSectionRef);

  const buttonWidth = (): number => {
    if (window.innerWidth > 1919) {
      return 400;
    } else {
      return 270;
    }
  };
  const buttonHeight = (): number => {
    if (window.innerWidth > 1919) {
      return 75;
    } else {
      return 51;
    }
  };

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

            <ArtifactButton
              variant="primary-lg"
              width={buttonWidth()}
              height={buttonHeight()}
              objectFit={mobileScreen ? 'contain' : 'cover'}
            >
              <Link href={ROUTE_PATH.EXPLORE} className="btn-content">
                Explore now
              </Link>
            </ArtifactButton>
          </div>
        </div>
        {/* <div className="section-02" id="section-2" ref={secondSectionRef}>
          <div className="background">
            <img
              src={`${CDN_URL}/artifact/Landing_page/${
                mobileScreen ? 'mobile-artifact-4' : 'artifact-2b'
              }.png`}
              alt={'background artifact 02'}
            />
          </div>
          <div className="content right">
            <h4 className="subTitle">Smart BRC-721 Token Standard</h4>
            <h3 className="title">Smarter</h3>
            <div className="desc">
              All files preserved on Smart Inscriptions are smart BRC-721 NFTs. Smart
              BRC-721 is the standard for Non-Fungible tokens (NFTs) with smart
              contracts on Bitcoin, enabling the addition of utilities to Bitcoin’s
              NFTs.
            </div>
            <ArtifactButton
              variant="primary"
              width={buttonWidth()}
              height={buttonHeight()}
              objectFit={mobileScreen ? 'contain' : 'cover'}
            >
              <Link href="/" className="btn-content">
                Explore Smart inscription
              </Link>
            </ArtifactButton>
          </div>
        </div>
        <div className="section-03" id="section-3" ref={thirdSectionRef}>
          <div className="background">
            <img
              src={`${CDN_URL}/artifact/Landing_page/${
                mobileScreen ? 'mobile-artifact-2' : 'artifact-3f'
              }.png`}
              alt={'background artifact 03'}
            />
          </div>
          <div className="content left">
            <h4 className="subTitle">network Fee</h4>
            <h3 className="title">Cheaper</h3>
            <div className="desc">
              Significantly reduce preservation costs compared to Ordinals
              inscription, saving up to 50% with file sizes larger than 100kb.
            </div>
            <ArtifactButton
              variant="primary"
              width={buttonWidth()}
              height={buttonHeight()}
              objectFit={mobileScreen ? 'contain' : 'cover'}
            >
              <Link href="/" className="btn-content">
                Explore Smart inscription
              </Link>
            </ArtifactButton>
          </div>
        </div>
        <div className="section-04" id="section-4" ref={fourthSectionRef}>
          <div className="background">
            <img
              src={`${CDN_URL}/artifact/Landing_page/${
                mobileScreen ? 'mobile-artifact-4a' : 'artifact-4b'
              }.png`}
              alt={'background artifact 04'}
            />
          </div>
          <div className="content right">
            <h3 className="title">Larger</h3>
            <div className="desc">
              Unlike Ordinals inscriptions, which are strictly limited to a file size
              of 4MB. Smart Inscriptions offers unlimited file storage on Bitcoin
              independently and enables the preservation of authenticity and the
              original state of the inscriptions.
            </div>
            <ArtifactButton
              variant="primary"
              width={buttonWidth()}
              height={buttonHeight()}
              objectFit={mobileScreen ? 'contain' : 'cover'}
            >
              <Link href="/" className="btn-content">
                Explore Smart inscription
              </Link>
            </ArtifactButton>
          </div>
        </div> */}
        {/* <SectionControllers>
          <div className={`dots ${isInViewport1 ? 'active' : ''}`}>
            <div className="circle">
              <IconSVG src={`${CDN_URL}/pages/artifacts/icons/ic-slide-dot.svg`} />
            </div>
          </div>
          <div className={`dots ${isInViewport2 ? 'active' : ''}`}>
            <div className="circle">
              <IconSVG src={`${CDN_URL}/pages/artifacts/icons/ic-slide-dot.svg`} />
            </div>
          </div>
          <div className={`dots ${isInViewport3 ? 'active' : ''}`}>
            <div className="circle">
              <IconSVG src={`${CDN_URL}/pages/artifacts/icons/ic-slide-dot.svg`} />
            </div>
          </div>
          <div className={`dots ${isInViewport4 ? 'active' : ''}`}>
            <div className="circle">
              <IconSVG src={`${CDN_URL}/pages/artifacts/icons/ic-slide-dot.svg`} />
            </div>
          </div>
        </SectionControllers> */}

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
                Smart Inscription supports unlimited file size. A 6.9MB Azuki
                wallpaper (
                <Link href="/420" target="_blank">
                  Smart Inscription #420
                  <IconSVG
                    src={`${CDN_URL}/icons/ic-arrow-outward.svg`}
                    maxWidth="10"
                    maxHeight="10"
                    className="ic-outward"
                  />
                </Link>
                ) has successfully launched on Smart Inscription, and larger files
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
