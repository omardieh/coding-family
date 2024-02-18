// SpinnerComponent.jsx
import styled, { keyframes } from "styled-components";

export default function Loading() {
  return (
    <SVG viewBox="0 0 50 50">
      <CIRCLE cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
    </SVG>
  );
}

const rotateAnimation = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const dashAnimation = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;

const SVG = styled.svg`
  animation: ${rotateAnimation} 2s linear infinite;
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
  width: 50px;
  height: 50px;
`;

const CIRCLE = styled.circle`
  stroke: #cccccc;
  stroke-linecap: round;
  animation: ${dashAnimation} 1.5s ease-in-out infinite;
`;
