import { cx } from "@emotion/css"
import { refs, Transaction } from "reactronic"
import { Block, BlockArgs, PlainText, lineFeed, Align, Img, use, asComponent, HtmlText } from "verstak"
import { Icon } from "components/Icon.v"
import { MarkdownCodeDarkTheme } from "themes/MarkdownCodeDarkTheme.s"
import { App } from "models/App"
import * as s from "themes/Common.s"
import { createFieldModel, Field } from "components/Field.v"

export function ToolBar(name: string, args?: BlockArgs<HTMLElement, void, void>) {
  return (
    Block(name, asComponent(args, {
      render(e, b) {
        const app = use(App)
        Block("Logo", {
          render(e, b) {
            e.className = cx(s.Panel, s.Clickable, s.Logo)
            e.style.backgroundColor = app.blinkingEffect ? "red" : ""
            Img("N*", {
              render(e, b) {
                e.src = "https://nezaboodka.com/img/star-768x768-circle.png"
              }
            })
          }
        })
        Block(`Verstak ${app.version}`, {
          widthGrowth: 1,
          render(e, b, base) {
            base()
            e.classList.toggle(s.Panel, true)
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
