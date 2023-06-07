import px2rem from '@/utils/px2rem';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;

  .content {
    display: flex;
    flex-direction: column;
    gap: ${px2rem(32)};
    margin-top: ${px2rem(60)};
    width: 70%;

    @media screen and (max-width: 1024.98px) {
      width: 100%;
    }
  }

  .left-container {
    background: rgba(0, 46, 29, 0.6);
    border-radius: 12px;
    position: relative;
    height: auto;
    min-height: ${px2rem(250)};
    max-height: ${px2rem(400)};

    .thumbnail {
      width: 100%;
      border-radius: 10px;
      background: transparent;
    }

    @media screen and (max-width: 1024.98px) {
      height: ${px2rem(300)};
    }
  }

  .right-container {
    background: rgba(0, 46, 29, 0.6);
    padding: ${px2rem(24)};
    border-radius: 20px;
    position: relative;

    .inscription-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: ${px2rem(28)};

      .refresh-btn {
        cursor: pointer;
      }
    }

    .header {
      margin-top: ${px2rem(16)};
      display: flex;
      flex-direction: column;
      text-decoration: none;

      .title {
        font-style: normal;
        font-weight: 500;
        font-size: ${px2rem(20)};
        line-height: ${px2rem(28)};
        color: white;
        text-transform: uppercase;
        letter-spacing: 0.07em;
      }

      .subTitle {
        font-style: normal;
        font-weight: 500;
        font-size: ${px2rem(24)};
        line-height: ${px2rem(34)};
        color: #b6b6b6;
      }
    }

    .tag {
      text-decoration: none;

      .tag-title {
        font-style: normal;
        font-weight: 400;
        font-size: ${px2rem(18)};
        line-height: ${px2rem(28)};
        letter-spacing: -0.01em;
        color: #898989;
      }

      .subTitle {
        font-style: normal;
        font-weight: 600;
        font-size: ${px2rem(24)};
        line-height: 34px;
        color: #c6c7f8;
      }
    }

    .list-container {
      padding-top: 16px;
      padding-bottom: 8px;
      max-width: 700px;

      .list-name {
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 28px;
        letter-spacing: -0.01em;
        color: #898989;
        margin-bottom: 12px;
      }

      .attribute-list {
        display: grid;
        grid-template-columns: repeat(3, minmax(1fr));
        gap: ${px2rem(16)};

        @media screen and (max-width: 768px) {
          grid-template-columns: repeat(2, minmax(1fr));
        }
      }
    }

    .properties-item {
      background-color: #303030;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 88px;
    }

    .properties-trait-type {
      font-weight: 400;
      font-size: 13px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #1a73e8;
      text-align: center;
    }

    .properties-trait-value {
      font-weight: 500;
      font-size: 15px;
      line-height: 140%;
      margin-top: 4px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 90%;
    }

    &::before {
      content: '';
      border-radius: 20px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 1px solid transparent;
      pointer-events: none !important;
      background: linear-gradient(
          138.24deg,
          rgba(120, 170, 143, 0.8) 1.72%,
          rgba(2, 47, 22, 0.64) 101.88%
        )
        border-box;
      -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
    }
  }

  @media screen and (max-width: 768px) {
    padding: 0px 0px;

    .content {
      flex-direction: column;
      gap: 40px;
    }

    .left-container {
      width: 100%;

      .thumbnail {
        width: 100%;
      }
    }

    .right-container {
      width: 100%;

      .header {
        .title {
          font-size: 28px;
          line-height: 28px;
        }

        .subTitle {
          font-size: 20px;
        }
      }

      .tag {
        .tag-title {
        }

        .subTitle {
          font-size: 20px;
          line-height: 24px;
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .content {
      gap: 28px;
    }

    .left-container {
      .thumbnail {
        width: 100%;
      }
    }

    .right-container {
      .header {
        .title {
          line-height: 24px;
          font-size: 24px;
        }

        .subTitle {
          font-size: 16px;
        }
      }
    }
  }
`;

const Information = styled.div<{ loading: boolean }>`
  position: relative;

  .loading {
    position: absolute;
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: 1;
    display: grid;
    place-items: center;
    .lds-spinner {
      color: #78f381;
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;
      transform: scale(0.5) translateX(-120%);
      left: 50%;
    }
    .lds-spinner div {
      transform-origin: 40px 40px;
      animation: lds-spinner 1.2s linear infinite;
    }
    .lds-spinner div:after {
      content: ' ';
      display: block;
      position: absolute;
      top: 3px;
      left: 37px;
      width: 6px;
      height: 18px;
      border-radius: 20%;
      background: #78f381;
    }
    .lds-spinner div:nth-child(1) {
      transform: rotate(0deg);
      animation-delay: -1.1s;
    }
    .lds-spinner div:nth-child(2) {
      transform: rotate(30deg);
      animation-delay: -1s;
    }
    .lds-spinner div:nth-child(3) {
      transform: rotate(60deg);
      animation-delay: -0.9s;
    }
    .lds-spinner div:nth-child(4) {
      transform: rotate(90deg);
      animation-delay: -0.8s;
    }
    .lds-spinner div:nth-child(5) {
      transform: rotate(120deg);
      animation-delay: -0.7s;
    }
    .lds-spinner div:nth-child(6) {
      transform: rotate(150deg);
      animation-delay: -0.6s;
    }
    .lds-spinner div:nth-child(7) {
      transform: rotate(180deg);
      animation-delay: -0.5s;
    }
    .lds-spinner div:nth-child(8) {
      transform: rotate(210deg);
      animation-delay: -0.4s;
    }
    .lds-spinner div:nth-child(9) {
      transform: rotate(240deg);
      animation-delay: -0.3s;
    }
    .lds-spinner div:nth-child(10) {
      transform: rotate(270deg);
      animation-delay: -0.2s;
    }
    .lds-spinner div:nth-child(11) {
      transform: rotate(300deg);
      animation-delay: -0.1s;
    }
    .lds-spinner div:nth-child(12) {
      transform: rotate(330deg);
      animation-delay: 0s;
    }
    @keyframes lds-spinner {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }

    p {
      color: white;
      font-size: ${px2rem(14)};
      max-width: 35ch;
      text-align: center;
    }
  }

  .title {
    font-style: normal;
    font-weight: 500;
    font-size: ${px2rem(20)};
    line-height: ${px2rem(34)};
    color: white;
    padding-bottom: 8px;
    width: fit-content;
    border-bottom: 2px solid white;
    cursor: pointer;
  }

  .list {
    display: flex;
    flex-direction: column;
    opacity: ${(props) => (props.loading ? 0 : 1)};

    .item {
      padding: ${px2rem(20)} 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);

      /* max-width: 700px; */

      &:first-of-type {
        padding-top: 0;
      }

      .name {
        font-style: normal;
        font-weight: 400;
        line-height: 28px;
        letter-spacing: -0.01em;
        font-weight: 500;
        font-size: ${px2rem(13)};
        line-height: ${px2rem(16)};
        color: white;
        opacity: 0.7;
        margin-bottom: ${px2rem(8)};
      }

      .desc {
        font-style: normal;
        word-break: break-all;

        font-weight: 500;
        font-size: ${px2rem(16)};
        line-height: ${px2rem(20)};

        color: white;
      }

      .link {
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 28px;
        letter-spacing: -0.01em;
        color: #4185ec;
        text-decoration: none;
        word-break: break-all;
      }
    }
  }

  @media screen and (max-width: 768px) {
    margin-top: 28px;
  }
`;

export { Container, Information };
