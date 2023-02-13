import { css } from "@emotion/css"

export const Logo = css`
  background-color: white;
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
