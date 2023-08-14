import { styled } from "styled-components";
import { colors } from "./../../global/colors";
import { breakpoints } from "./../../global/breakpoints";

export default function MobMenuIcon({ toggleMobMenu, isMobMenu }) {
  return (
    <I onClick={toggleMobMenu} className={isMobMenu ? "open" : ""}>
      <BURGER_MENU />
      <BURGER_MENU />
      <BURGER_MENU />
      <BURGER_MENU />
    </I>
  );
}

const { mob, tab } = breakpoints;

const I = styled.i`
  @media ${mob}, ${tab} {
    display: block;
    width: 3rem;
    margin-top: 0.3em;
    padding-top: 3.4em;
    position: relative;
    transform: rotate(0deg);
    transition: 0.5s ease-in-out;
    cursor: pointer;
    z-index: 1;
    &.open span:nth-child(1) {
      top: 18px;
      width: 0%;
      left: 50%;
    }

    &.open span:nth-child(2) {
      transform: rotate(45deg);
    }

    &.open span:nth-child(3) {
      transform: rotate(-45deg);
    }

    &.open span:nth-child(4) {
      top: 18px;
      width: 0%;
      left: 50%;
    }
    transform: scale(0.6);
  }
  display: none;
`;

const BURGER_MENU = styled.span`
  @media ${mob}, ${tab} {
    display: block;
    position: absolute;
    height: 9px;
    width: 100%;
    background: ${colors.white.mid};
    border-radius: 9px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;

    &:nth-child(1) {
      top: 0px;
    }

    &:nth-child(2),
    &:nth-child(3) {
      top: 18px;
    }

    &:nth-child(4) {
      top: 36px;
    }
  }
`;
