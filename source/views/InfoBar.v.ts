import { cx } from "@emotion/css"
import { refs, Transaction } from "reactronic"
import { Block, BlockArgs, PlainText, lineFeed, Align, Img, use, asComponent, HtmlText } from "verstak"
import { Icon } from "components/Icon.v"
import { App } from "models/App"
import * as s from "themes/Common.s"
import { createFieldModel, Field } from "components/Field.v"

export function InfoBar(name: string, args?: BlockArgs<HTMLElement, void, void>) {
  return (
    Block(name, asComponent(args, {
      render(e, b) {
        const app = use(App)
        Block("Logo", {
          render(e, b) {
            e.style.backgroundColor = app.theme.workAreaColor
            e.className = cx(app.theme.Panel, s.Clickable, s.Logo)
            Img("N*", {
              render(e, b) {
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
              render(e, b) {
                HtmlText(`<b>Artel editor</b> v${app.version}`)
              },
            })
          }
        })
      },
    }))
  )
}
