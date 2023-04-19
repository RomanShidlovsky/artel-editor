import {cx} from "@emotion/css"
import {asComponent, Block, BlockArgs, HtmlText, Img, use} from "verstak"
import {App} from "models/App"
import * as s from "themes/Common.s"

export function InfoBar(name: string, args?: BlockArgs<HTMLElement, void, void>) {
  return (
    Block(name, asComponent(args, {
      render() {
        const app = use(App)
        Block("Logo", {
          render(e) {
            e.style.backgroundColor = app.theme.workAreaColor
            e.className = cx(app.theme.Panel, s.Clickable, s.Logo)
            Img("N*", {
              render(e) {
                e.src = "../../public/assets/images/nz-512x512.png"
              }
            })
          }
        })
        Block(`Artel Editor ${app.version}`, {
          widthGrowth: 1,
          render(e, b, base) {
            base()
            e.className = app.theme.Panel
            Block("Welcome", {
              widthGrowth: 1,
              render() {
                HtmlText(`<b>Artel editor</b> v${app.version}`)
              },
            })
          }
        })
      },
    }))
  )
}
