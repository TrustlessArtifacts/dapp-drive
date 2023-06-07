import { commonTheme } from '@/theme/colors';
import px2rem from '@/utils/px2rem';
import styled from 'styled-components';

export const StyledAbout = styled.div`
  width: 100vw;
  height: 100vh;
  scroll-snap-type: y mandatory;
  scroll-snap-type: mandatory;
  -webkit-scroll-snap-type: y mandatory;
  background-color: #000;

  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100vw;
  }

  .section-01
  /* .section-02,
  .section-03,
  .section-04  */ {
    position: relative;
    height: 100vh;
    /* width: 100vw; */
    display: flex;
    align-items: flex-start;
    /* scroll-snap-align: start;
    scroll-snap-stop: always;
    -webkit-scroll-snap-align: start;
    -webkit-scroll-snap-stop: always; */
  }

  .background img {
    object-fit: cover;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
  }

  .video {
    width: 100vw;
    height: 100vh;
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    z-index: 0;
  }

  .content {
    margin-top: 10%;
    color: #fff;
    z-index: 2;
    position: relative;
    margin-left: ${px2rem(100)};
    max-width: 80ch;

    .subTitle {
      text-transform: uppercase;
      font-size: ${px2rem(16)};
      line-height: ${px2rem(22)};
      color: ${commonTheme.green.primary};
      margin-bottom: ${px2rem(16)};
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
      padding: ${px2rem(15)} ${px2rem(30)};
      text-transform: uppercase;
      font-weight: 500;
      font-size: ${px2rem(16)};
      line-height: ${px2rem(26)};
      letter-spacing: ${px2rem(1.5)};
      color: #000;
      white-space: nowrap;
    }

    &.right {
      margin-left: 55%;
      padding-right: ${px2rem(100)};
    }
  }

  a:hover {
    text-decoration: none;
  }

  .block {
    position: absolute;
    left: ${px2rem(100)};
    bottom: 15%;
    display: flex;
    align-items: center;
    gap: ${px2rem(80)};
    flex-wrap: wrap;

    p {
      color: white;
    }

    .block-item-wrapper {
      /* filter: drop-shadow(4px 4px 10px rgba(99, 255, 124, 0.75)); */
      border-radius: 0 20px 0 20px;
      box-shadow: 4px 4px 10px rgba(99, 255, 124, 0.75);
      overflow: hidden;
    }

    .block-item {
      padding: ${px2rem(20)};
      background: rgba(49, 91, 48, 0.8);
      position: relative;
      clip-path: polygon(
        20% 0%,
        97% 0,
        100% 4%,
        100% 100%,
        80% 100%,
        3% 100%,
        0 97%,
        0 0
      );

      .block-item-info {
        max-width: 30ch;
      }
    }

    .block-middle {
      background: rgba(73, 128, 71, 0.8);
    }

    .block-item-title {
      font-size: ${px2rem(24)};
      line-height: ${px2rem(36)};
      font-weight: 600;
      margin-bottom: ${px2rem(12)};
    }

    .block-item-info {
      font-size: ${px2rem(14)};
      line-height: ${px2rem(21)};
      font-weight: 300;
    }

    .block-item-wrapper:nth-of-type(3) {
      align-self: stretch;
      height: auto;

      .block-item {
        height: 100%;
      }
    }

    .block-item-wrapper:nth-of-type(2) {
      align-self: stretch;
      height: auto;
      .block-item {
        height: 100%;
      }
    }
  }

  @media screen and (max-width: 1279.98px) {
    .block {
      gap: ${px2rem(40)};
      bottom: 5%;
    }
  }

  @media screen and (max-width: 768.98px) {
    .section-01
    /* .section-02,
    .section-03,
    .section-04  */ {
      align-items: flex-start;
      height: auto;
    }

    .content {
      margin: 0;
      padding: 0 ${px2rem(20)};
      width: 100vw;
      text-align: center;
      margin-top: ${px2rem(40)};
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
        font-size: ${px2rem(32)};
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
        margin-left: auto;
        padding-right: ${px2rem(20)};
      }
    }

    .block {
      margin-top: ${px2rem(48)};
      flex-direction: column;
      position: relative;
      bottom: unset;
      left: unset;
      padding: 0 ${px2rem(32)};
      gap: ${px2rem(24)};
      padding-bottom: ${px2rem(24)};

      .block-item-wrapper:nth-of-type(2) {
        order: -1;
      }

      .block-item-wrapper {
        width: 100%;

        .block-item {
          clip-path: polygon(
            20% 0%,
            98% 0,
            100% 8%,
            100% 100%,
            80% 100%,
            2% 100%,
            0 92%,
            0 0
          );

          .block-item-info {
            max-width: 100%;
          }
        }
      }
    }
  }
`;

// export const SectionControllers = styled.div`
//   position: fixed;
//   top: 50%;
//   right: ${px2rem(48)};
//   transform: translateY(-50%);
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: ${px2rem(12)};

//   .dots {
//     width: ${px2rem(46)};
//     height: ${px2rem(46)};
//     display: grid;
//     place-items: center;
//     border-radius: 50%;
//     transition: all 0.3s ease-in-out;

//     .circle {
//       width: ${px2rem(22)};
//       height: ${px2rem(22)};
//       background: rgba(255, 255, 255, 0.08);
//       padding: ${px2rem(5)};
//       border-radius: 50%;
//       transition: all 0.3s ease-in-out;
//     }

//     &.active {
//       background: rgba(255, 255, 255, 0.05);
//       border: 1px solid rgba(255, 255, 255, 0.2);
//       transition: all 0.3s ease-in-out;

//       .circle {
//         background: ${commonTheme.green.bg};

//         path {
//           fill-opacity: 1;
//         }
//       }
//     }
//   }

//   @media screen and (max-width: 768.98px) {
//     display: none;
//   }
// `;

export const AboutHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  min-height: auto;
  width: 100vw;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  flex-direction: row;

  header {
    width: 100%;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: ${px2rem(12)};
    width: fit-content;
    transform: scale(0.9);
  }

  .logo-title {
    font-family: var(--rowdies-font);
    font-weight: 400;
    font-size: ${px2rem(22)};
    line-height: ${px2rem(27)};
    letter-spacing: -1px;
    text-decoration: none;

    &:hover {
      text-decoration: none;
    }
  }

  .external-link {
    display: flex;
    gap: ${px2rem(24)};
    justify-content: flex-end;

    a {
      display: flex;
      gap: ${px2rem(6)};
      align-items: center;

      &:hover {
        text-decoration: none;
        rect {
          stroke-opacity: 1;
        }
      }
    }
  }

  @media screen and (max-width: 768.98px) {
    padding: ${px2rem(23)} ${px2rem(20)};
  }
`;
