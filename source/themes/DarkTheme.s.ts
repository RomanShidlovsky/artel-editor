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
  editorTheme = "vs-dark"

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
}
