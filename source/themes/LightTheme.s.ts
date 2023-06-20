import {Theme} from "./Theme";
import {css} from "@emotion/css";

export class LightTheme implements Theme {
  runBtnColor = "green"
  nextStepBtnColor = "black"
  stopBtnColor = "red"
  themeBtnColor = "black"
  resetBtnColor = "blue"
  backColor = "white"
  panelColor = "#212121"
  textColor = "black"
  workAreaColor = "white"
  lineColor = "black"
  hoverColor = "#dedede"
  editorTheme = "vs"
  phoneColor = "black"

  Panel = css`
    margin: 0.5rem;
    padding: 1rem;
    box-shadow: 0.025rem 0.025rem 0.35rem 0 gray;
    border-radius: 0.25rem;
    background-color: ${this.backColor};
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

  ColumnHeader = css`
    position: relative;
    border: none;

    ::before, ::after {
      position: absolute;
      content: "";
      height: 50%;
      bottom: 0;
      left: -1px;
      border-left: 2px solid ${this.lineColor};
    }
`

  RowHeader = css`
    position: relative;
    border: none;
    padding-left: 30%;
    ::before, ::after {
      position: absolute;
      content: "";
      width: 50%;
    }
    ::before {
      right: 0;
      top: -0.5px;
      border-top:  2px solid ${this.lineColor};
    }
`
}
