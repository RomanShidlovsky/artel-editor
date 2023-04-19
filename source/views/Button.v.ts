import {Align, Block, I, use} from "verstak";
import {App} from "../models/App";

export function ButtonV(
  name: string,
  iconType: string,
  color: string,
  onclick? : ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null,
) {
  return(
    Block(name, {
      heightMax : "55px",
      widthMax : "55px",
      alignContent: Align.CenterV + Align.Center,
      initialize(e) {
        if (onclick) {
          e.onclick = onclick
        }
      },
      render(e) {
        const app = use(App)
        e.className = app.theme.Button
        e.style.color = color
        I("run", {
          render(e) {
            e.className = iconType
          }
        })
      }
    }))
}
