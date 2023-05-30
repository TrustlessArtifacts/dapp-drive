import IconSVG from '@/components/IconSVG';
import { CDN_URL } from '@/configs';
import { useIsInViewport } from '@/hooks/useIsInViewport';
import useWindowSize from '@/hooks/useWindowSize';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { AboutHeader, SectionControllers, StyledAbout } from './About.styled';

const About = () => {
  const { mobileScreen } = useWindowSize();

  const firstSectionRef = useRef<HTMLDivElement>(null);
  const secondSectionRef = useRef<HTMLDivElement>(null);
  const thirdSectionRef = useRef<HTMLDivElement>(null);
  const isInViewport1 = useIsInViewport(firstSectionRef);
  const isInViewport2 = useIsInViewport(secondSectionRef);
  const isInViewport3 = useIsInViewport(thirdSectionRef);

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
              Immutable and on-chain with dynamic file size acceptance.
            </div>
            <div className="cta-btn">
              <IconSVG
                src={`${CDN_URL}/artifact/Landing_page/${
                  mobileScreen ? 'button-bg' : 'button'
                }.svg`}
                className="btn-bg"
              />
              <Link href="/" className="btn-content">
                Preserve Artifact
              </Link>
            </div>
          </div>
        </div>
        <div className="section-02" id="section-2" ref={secondSectionRef}>
          <div className="background">
            <Image
              src={`${CDN_URL}/artifact/Landing_page/${
                mobileScreen ? 'mobile-artifact-2' : 'artifact-2a'
              }.png`}
              alt={'background artifact 02'}
              fill
            />
          </div>
          <div className="content right">
            <h4 className="subTitle">Fully on-chain</h4>
            <h3 className="title">Immutable</h3>
            <div className="desc">
              Your images are permanently stored on the most secure
              blockchain—Bitcoin.
            </div>
            <div className="cta-btn">
              <IconSVG
                src={`${CDN_URL}/artifact/Landing_page/${
                  mobileScreen ? 'button-bg' : 'button'
                }.svg`}
                className="btn-bg"
              />
              <Link href={`/`} className="btn-content">
                Preserve Artifact
              </Link>
            </div>
          </div>
        </div>
        <div className="section-03" id="section-3" ref={thirdSectionRef}>
          <div className="background">
            <Image
              src={`${CDN_URL}/artifact/Landing_page/${
                mobileScreen ? 'mobile-artifact-3' : 'artifact-3b'
              }.png`}
              alt={'background artifact 03'}
              fill
            />
          </div>
          <div className="content left">
            <h4 className="subTitle">file size</h4>
            <h3 className="title">Large file size acceptance</h3>
            <div className="desc">
              The Trustless Computer Protocol allows you to store an unlimited size
              file on Bitcoin, maintaining its authenticity and original state. 
            </div>
            <div className="cta-btn">
              <IconSVG
                src={`${CDN_URL}/artifact/Landing_page/${
                  mobileScreen ? 'button-bg' : 'button'
                }.svg`}
                className="btn-bg"
              />
              <Link href="/" className="btn-content">
                Preserve Artifact
              </Link>
            </div>
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
        </SectionControllers>
      </StyledAbout>
    </>
  );
};

export default About;
