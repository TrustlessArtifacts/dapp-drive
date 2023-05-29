import { commonTheme } from '@/theme/colors';
import px2rem from '@/utils/px2rem';
import styled from 'styled-components';

export const StyledAbout = styled.div`
  width: 100vw;
  height: 100vh;
  scroll-snap-type: y mandatory;
  scroll-snap-type: mandatory;
  -webkit-scroll-snap-type: y mandatory;

  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  .section-01,
  .section-02,
  .section-03 {
    position: relative;
    height: 100vh;
    /* width: 100vw; */
    display: flex;
    align-items: center;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    -webkit-scroll-snap-align: start;
    -webkit-scroll-snap-stop: always;
  }

  .background img {
    object-fit: cover;
  }

  .video {
    width: 100vw;
    height: 100vh;
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
  }

  .content {
    color: #fff;
    z-index: 1;
    position: relative;
    margin-left: ${px2rem(100)};
    max-width: 80ch;

    .subTitle {
      text-transform: uppercase;
      font-size: ${px2rem(16)};
      line-height: ${px2rem(22)};
      color: ${commonTheme.green.primary};
      margin-bottom: ${px2rem(16)};
      box-shadow: 0px 4px 4px 0px #00000040;
      width: fit-content;
    }

    .title {
      font-family: var(--rowdies-font);
      font-size: ${px2rem(56)};
      line-height: ${px2rem(61)};
      margin-bottom: ${px2rem(28)};
      font-weight: 300;
    }

    .desc {
      font-size: ${px2rem(20)};
      line-height: ${px2rem(28)};
      margin-bottom: ${px2rem(40)};
    }

    .cta-btn {
      width: fit-content;
      height: auto;
      display: grid;
      place-items: center;
      position: relative;

      &:hover {
        opacity: 0.8;
      }
    }

    .btn-bg {
      z-index: 1;
      position: relative;
    }

    .btn-content {
      position: absolute;
      padding: ${px2rem(15)} ${px2rem(30)};
      text-transform: uppercase;
      font-weight: 500;
      font-size: ${px2rem(16)};
      line-height: ${px2rem(26)};
      letter-spacing: ${px2rem(1.5)};
      color: #000;
      z-index: 2;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      white-space: nowrap;
    }

    &.right {
      margin-left: 50%;
      padding-right: ${px2rem(100)};
    }
  }

  a:hover {
    text-decoration: none;
  }

  @media screen and (max-width: 768.98px) {
    .section-01,
    .section-02,
    .section-03 {
      align-items: flex-start;
    }

    .content {
      margin: 0;
      padding: 0 ${px2rem(20)};
      width: 100vw;
      text-align: center;
      margin-top: ${px2rem(32)};
      margin-left: auto;
      margin-right: auto;

      .subTitle {
        /* font-size: ${px2rem(14)}; */
        /* line-height: 20px; */
        margin-bottom: ${px2rem(8)};
        margin-left: auto;
        margin-right: auto;
      }

      .title {
        font-size: ${px2rem(36)};
        line-height: 35px;
        margin-bottom: ${px2rem(18)};
      }

      .desc {
        margin-bottom: ${px2rem(24)};
      }
      .cta-btn {
        margin-left: auto;
        margin-right: auto;
      }

      &.right {
        margin-left: unset;
        padding-right: ${px2rem(20)};
      }
    }
  }
`;

export const SectionControllers = styled.div`
  position: fixed;
  top: 50%;
  right: ${px2rem(48)};
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${px2rem(12)};

  .dots {
    width: ${px2rem(46)};
    height: ${px2rem(46)};
    display: grid;
    place-items: center;
    border-radius: 50%;
    transition: all 0.3s ease-in-out;

    .circle {
      width: ${px2rem(22)};
      height: ${px2rem(22)};
      background: rgba(255, 255, 255, 0.08);
      padding: ${px2rem(5)};
      border-radius: 50%;
      transition: all 0.3s ease-in-out;
    }

    &.active {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.3s ease-in-out;

      .circle {
        background: ${commonTheme.green.bg};

        path {
          fill-opacity: 1;
        }
      }
    }
  }

  @media screen and (max-width: 767.98px) {
    display: none;
  }
`;
