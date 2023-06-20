import { css } from "@emotion/css"

export const Logo = css`
  padding: 0.25rem !important;
  border-radius: 100% !important;

  img {
    width: 2.5em;
    height: 2.5em;
  }
`

export const Panel = css`
  margin: 0.5rem;
  padding: 1rem;
  box-shadow: 0.025rem 0.025rem 0.35rem 0 gray;
  border-radius: 0.25rem;
  background-color: white;
  color: black;
`

export const DarkPanel = css`
  margin: 0.5rem;
  padding: 1rem;
  box-shadow: 0.025rem 0.025rem 0.35rem 0 gray;
  border-radius: 0.25rem;
  background-color: #212121;
  color: white;
`

export const PanelTitle = css`
  font-weight: bold;
`

export const Brand = css`
  color: blue;
  background-color: rgba(0, 0, 255, 0.1);
  border: 1px solid blue;
`

export const Important = css`
  color: #029111;
  background-color: rgba(0, 140, 255, 0.1);
  border: 1px solid #0051ff;
`

export const SquareImportant = css`
  color: #029111;
  background-color: rgba(0, 140, 255, 0.1);
  border: 2px solid #ff0000;
`

export const Hint = css`
  font-size: smaller;
  border: 1px solid silver;
`

export const Clickable = css`
  cursor: pointer;
  user-select: none;
`

export const Button = css`
  min-height: 55px;
  min-width: 55px;
  box-shadow: 0.025rem 0.025rem 0.35rem 0 gray;
  border-radius: 0.25rem;
  font-size: 25px;
  margin: 5px;

  :hover {
    background-color: #dedede;
  }
`



export const Resizer = css`
  background-color: unset;
  cursor: col-resize;
  user-select: none;
`

export const WrapStyle = css`
  word-break: break-word;
`

export const Border = css`
  border: 1px solid black;
`

export const InputStyle = css`
  box-shadow: 0.025rem 0.025rem 0.35rem 0 gray;
  border-radius: 0.25rem;
  border-color: white;
  height: 100%;
  font-size: 30px;
  margin-left: 0.5%;
  width: 60%;
  padding: 5px;
`
export const PhoneBlock = css`
  background-color: #000;
  border-radius: 40px;
  overflow: hidden;
  margin: 0 auto;
  padding: 20px;
  width: 300px;
`



export const SmartphoneWhite = css`
  position: relative;
  width: 360px;
  height: 640px;
  margin: auto;
  border: 16px white solid;
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

export const Wrapper = css`
  position: relative;
  width: 360px;
  height: 610px;
  overflow: hidden;
`

export const TableContent = css`
  position: absolute;
  overflow: scroll;
  ::-webkit-scrollbar{
    display: none;
  }
`

export const ColumnHeaders = css`
  position: absolute;
  width: 360px;
  top: 0;
  overflow: hidden;
  div {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    display: inline-block;
    text-align: center;
  }
  ::-webkit-scrollbar{
    display: none;
  }
`

export const Centerer = css`
  display: inline-block;
  height: 100%;
  vertical-align: middle;
`

export const Centered = css`
  vertical-align: middle;
  display: inline-block;
`

export const RowHeaders = css`
  position: absolute;
  left: 0;
  bottom: 0;
  overflow: hidden;
  div {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ::-webkit-scrollbar{
    display: none;
  }
`

export const Content = css`
  width: 360px;
  height: 535px;
  background: white;
`
