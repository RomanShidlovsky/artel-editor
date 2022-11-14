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
`
export const Workarea = css`
  background-image: url("../../public/assets/images/back.webp");
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

export const Hint = css`
  font-size: smaller;
  border: 1px solid silver;
`

export const Clickable = css`
  cursor: pointer;
  user-select: none;
`
