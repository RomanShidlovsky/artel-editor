import {Align, asComponent, Block, BlockArgs, I} from "verstak";
import * as s from "themes/Common.s"

export function StopBtn(name: string, args?: BlockArgs<HTMLElement, void, void>) {
  return(
    Block(name, asComponent(args,{
      heightMax : "55px",
      widthMax : "55px",
      alignContent: Align.CenterV + Align.Center,
      render(e) {
        e.className = s.Button
        I("run", {
          render(e) {
            e.className = "fa-solid fa-stop"
            e.style.color = "red"
          }
        })
      }
    }))
  )
}
