import ArtifactButton from '@/components/ArtifactButton';
import IconSVG from '@/components/IconSVG';
import { CDN_URL } from '@/configs';
import { useIsInViewport } from '@/hooks/useIsInViewport';
import useWindowSize from '@/hooks/useWindowSize';
import Link from 'next/link';
import { useRef } from 'react';
import { AboutHeader, SectionControllers, StyledAbout } from './About.styled';
import Header from '@/layouts/Header/Header';
import { HEADER_HEIGHT } from '@/layouts';

const About = () => {
  const { mobileScreen } = useWindowSize();

  const firstSectionRef = useRef<HTMLDivElement>(null);
  const secondSectionRef = useRef<HTMLDivElement>(null);
  const thirdSectionRef = useRef<HTMLDivElement>(null);
  const fourthSectionRef = useRef<HTMLDivElement>(null);
  const isInViewport1 = useIsInViewport(firstSectionRef);
  const isInViewport2 = useIsInViewport(secondSectionRef);
  const isInViewport3 = useIsInViewport(thirdSectionRef);
  const isInViewport4 = useIsInViewport(fourthSectionRef);

  return (
    <>
      <AboutHeader>
        <Header height={HEADER_HEIGHT} />
      </AboutHeader>
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
            <h4 className="subTitle">Trustless Artifacts</h4>
            <h3 className="title">
              Preserve anything as Smart BRC-721, eternally on Bitcoin 
            </h3>
            <div className="desc">
              Define the BRC-721 standard on Bitcoin powered by smart contracts via
              Trustless Computer protocol. Affordable and fully on-chain, with
              support for large file sizes.
            </div>

            <ArtifactButton
              variant="primary"
              width={300}
              height={79}
              objectFit={mobileScreen ? 'contain' : 'cover'}
            >
              <Link href="/" className="btn-content">
                Explore Artifact
              </Link>
            </ArtifactButton>
          </div>
        </div>
        <div className="section-02" id="section-2" ref={secondSectionRef}>
          <div className="background">
            <img
              src={`${CDN_URL}/artifact/Landing_page/${
                mobileScreen ? 'mobile-artifact-4' : 'artifact-2b'
              }.png`}
              alt={'background artifact 02'}
            />
          </div>
          <div className="content right">
            <h4 className="subTitle">smart contract</h4>
            <h3 className="title">Smarter</h3>
            <div className="desc">
              All files preserved on Trustless Artifacts are BRC-721 NFTs with smart
              contracts, enabling the addition of utilities to the NFTs
            </div>
            <ArtifactButton
              variant="primary"
              width={300}
              height={79}
              objectFit={mobileScreen ? 'contain' : 'cover'}
            >
              <Link href="/" className="btn-content">
                Explore Artifact
              </Link>
            </ArtifactButton>
          </div>
        </div>
        <div className="section-03" id="section-3" ref={thirdSectionRef}>
          <div className="background">
            <img
              src={`${CDN_URL}/artifact/Landing_page/${
                mobileScreen ? 'mobile-artifact-2' : 'artifact-3e'
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
              width={300}
              height={79}
              objectFit={mobileScreen ? 'contain' : 'cover'}
            >
              <Link href="/" className="btn-content">
                Explore Artifact
              </Link>
            </ArtifactButton>
          </div>
        </div>
        <div className="section-04" id="section-4" ref={fourthSectionRef}>
          <div className="background">
            <img
              src={`${CDN_URL}/artifact/Landing_page/${
                mobileScreen ? 'mobile-artifact-4a' : 'artifact-4a'
              }.png`}
              alt={'background artifact 04'}
            />
          </div>
          <div className="content right">
            <h4 className="subTitle">coming soon</h4>
            <h3 className="title">Larger</h3>
            <div className="desc">
              Unlike Ordinals inscriptions, which are strictly limited to a file size
              of 4MB, Trustless Artifacts offers unlimited file storage on Bitcoin.
              This enables the preservation of authenticity and the original state of
              the artifacts
            </div>
            <ArtifactButton
              variant="primary"
              width={300}
              height={79}
              objectFit={mobileScreen ? 'contain' : 'cover'}
            >
              <Link href="/" className="btn-content">
                Explore Artifact
              </Link>
            </ArtifactButton>
          </div>
        </div>
        <SectionControllers>
          <div className={`dots ${isInViewport1 ? 'active' : ''}`}>
            <div className="circle">
              <IconSVG src={`${CDN_URL}/artifact/icons/ic-slide-dot.svg`} />
            </div>
          </div>
          <div className={`dots ${isInViewport2 ? 'active' : ''}`}>
            <div className="circle">
              <IconSVG src={`${CDN_URL}/artifact/icons/ic-slide-dot.svg`} />
            </div>
          </div>
          <div className={`dots ${isInViewport3 ? 'active' : ''}`}>
            <div className="circle">
              <IconSVG src={`${CDN_URL}/artifact/icons/ic-slide-dot.svg`} />
            </div>
          </div>
          <div className={`dots ${isInViewport4 ? 'active' : ''}`}>
            <div className="circle">
              <IconSVG src={`${CDN_URL}/artifact/icons/ic-slide-dot.svg`} />
            </div>
          </div>
        </SectionControllers>
      </StyledAbout>
    </>
  );
};

export default About;
