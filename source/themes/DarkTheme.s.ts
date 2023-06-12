import {Theme} from "./Theme";
import {css} from "@emotion/css";

export class DarkTheme implements Theme {
  runBtnColor = "green"
  nextStepBtnColor = "white"
  stopBtnColor = "red"
  resetBtnColor = "blue"
  themeBtnColor = "yellow"
  backColor = "black"
  panelColor = "#212121"
  textColor = "white"
  hoverColor = "black"
  workAreaColor = "#212121"
  lineColor = "white"
  editorTheme = "vs-dark"
  phoneColor = "#0d60a8"

  Panel = css`
    margin: 0.5rem;
    padding: 1rem;
    box-shadow: 0.025rem 0.025rem 0.35rem 0 gray;
    border-radius: 0.25rem;
    background-color: ${this.panelColor};
    color: ${this.textColor};
  `
  Button = css`
    min-height: 55px;
    min-width: 55px;
    box-shadow: 0.025rem 0.025rem 0.35rem 0 gray;
    border-radius: 0.25rem;
    font-size: 25px;
    margin: 5px;
    :hover {
      background-color: ${this.hoverColor};
    }
  `

  Smartphone = css`
    position: relative;
    width: 360px;
    height: 610px;
    margin: auto;
    border: 16px ${this.phoneColor} solid;
    border-top-width: 60px;
    border-bottom-width: 60px;
    border-radius: 36px;

    :before {
      content: '';
      display: block;
      width: 60px;
      height: 5px;
      position: absolute;
      top: -30px;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #333;
      border-radius: 10px;
  }

  :after{
    content: '';
    display: block;
    width: 35px;
    height: 35px;
    position: absolute;
    left: 50%;
    bottom: -65px;
    transform: translate(-50%, -50%);
    background: #333;
    border-radius: 50%;
  }
`
}
