import IconSVG from '@/components/IconSVG';
import { CDN_URL } from '@/configs';
import { useIsInViewport } from '@/hooks/useIsInViewport';
import useWindowSize from '@/hooks/useWindowSize';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { AboutHeader, SectionControllers, StyledAbout } from './About.styled';
import ArtifactButton from '@/components/ArtifactButton';

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
        <div className="logo">
          <img alt="logo" src={`${CDN_URL}/images/drive-logo.svg`} />
          <h1 className="logo-title">Artifacts</h1>
        </div>
        <div className="external-link">
          <Link href={'https://trustless.computer/'} target="_blank">
            Trustless
            <IconSVG
              maxWidth="28"
              src={`${CDN_URL}/artifact/icons/ic-link.svg`}
            ></IconSVG>
          </Link>
          <Link href={'https://tcgasstation.com/'} target="_blank">
            Get TC
            <IconSVG
              maxWidth="28"
              src={`${CDN_URL}/artifact/icons/ic-link.svg`}
            ></IconSVG>
          </Link>
        </div>
      </AboutHeader>
      <StyledAbout>
        <div className="section-01" id="section-1" ref={firstSectionRef}>
          <div className="background">
            {mobileScreen ? (
              <Image
                src={`${CDN_URL}/artifact/Landing_page/mobile-artifact-1.png`}
                alt={'background artifact 01'}
                fill
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
            <h3 className="title">Be the first to preserve anything on Bitcoin. </h3>
            <div className="desc">
              Define BRC-721 standard on Bitcoin powered by smart contract via
              Trustless Computer protocol. Affordable and fully on-chain with support
              for large file sizes.
            </div>

            <ArtifactButton
              variant="primary"
              width={300}
              height={79}
              objectFit={mobileScreen ? 'contain' : 'cover'}
            >
              <Link href="/" className="btn-content">
                Preserve Artifact
              </Link>
            </ArtifactButton>
          </div>
        </div>
        <div className="section-02" id="section-2" ref={secondSectionRef}>
          <div className="background">
            <Image
              src={`${CDN_URL}/artifact/Landing_page/${
                mobileScreen ? 'mobile-artifact-4' : 'artifact-2b'
              }.png`}
              alt={'background artifact 02'}
              fill
            />
          </div>
          <div className="content right">
            <h4 className="subTitle">smart contract</h4>
            <h3 className="title">Smarter</h3>
            <div className="desc">
              BRC-721 is the standard for Non-Fungible Tokens (NFT) on Bitcoin. It is
              compatible with smart contracts via the Trustless Computer protocol.
            </div>
            <ArtifactButton
              variant="primary"
              width={300}
              height={79}
              objectFit={mobileScreen ? 'contain' : 'cover'}
            >
              <Link href="/" className="btn-content">
                Preserve Artifact
              </Link>
            </ArtifactButton>
          </div>
        </div>
        <div className="section-03" id="section-3" ref={thirdSectionRef}>
          <div className="background">
            <Image
              src={`${CDN_URL}/artifact/Landing_page/${
                mobileScreen ? 'mobile-artifact-2' : 'artifact-3e'
              }.png`}
              alt={'background artifact 03'}
              fill
            />
          </div>
          <div className="content left">
            <h4 className="subTitle">network Fee</h4>
            <h3 className="title">Cheaper</h3>
            <div className="desc">Save up to 50% over the Ordinals protocol.</div>
            <ArtifactButton
              variant="primary"
              width={300}
              height={79}
              objectFit={mobileScreen ? 'contain' : 'cover'}
            >
              <Link href="/" className="btn-content">
                Preserve Artifact
              </Link>
            </ArtifactButton>
          </div>
        </div>
        <div className="section-04" id="section-4" ref={fourthSectionRef}>
          <div className="background">
            <Image
              src={`${CDN_URL}/artifact/Landing_page/${
                mobileScreen ? 'mobile-artifact-4a' : 'artifact-4a'
              }.png`}
              alt={'background artifact 04'}
              fill
            />
          </div>
          <div className="content right">
            <h4 className="subTitle">coming soon</h4>
            <h3 className="title">Larger</h3>
            <div className="desc">
              The Trustless Computer Protocol allows you to store an unlimited size
              file on Bitcoin, maintaining its authenticity and original state. 
            </div>
            <ArtifactButton
              variant="primary"
              width={300}
              height={79}
              objectFit={mobileScreen ? 'contain' : 'cover'}
            >
              <Link href="/" className="btn-content">
                Preserve Artifact
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
