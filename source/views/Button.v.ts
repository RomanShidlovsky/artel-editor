import {Align, asComponent, Block, BlockArgs, I, use} from "verstak";
import * as s from "themes/Common.s"
import {App} from "../models/App";
import {Transaction} from "reactronic";

export function ButtonV(
  name: string,
  iconType: string,
  color: string,
  onclick? : ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null,
  args?: BlockArgs<HTMLElement, void, void>
) {
  return(
    Block(name, {
      heightMax : "55px",
      widthMax : "55px",
      alignContent: Align.CenterV + Align.Center,
      initialize(e, b) {
        const app = use(App)
        if (onclick) {
          e.onclick = onclick
        }
      },
      render(e) {
        e.className = s.Button
        const app = use(App)
        e.style.color = color
        I("run", {
          render(e) {
            e.className = iconType
          }
        })
      }
    }))
}
