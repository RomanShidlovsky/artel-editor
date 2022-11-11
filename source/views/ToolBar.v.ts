import { cx } from "@emotion/css"
import { Block, BlockArgs, PlainText, lineFeed, To, Img } from "verstak"
import { Panel } from "./Panel.v"
import * as s from "theme/Common.s"

export function ToolBar(name: string, args?: Partial<BlockArgs<HTMLElement, void, void>>) {
  return (
    Block(name, {
      ...args,
      render(e, b) {
        Block("Logo", {
          initialize(e, b) {
            e.className = s.Panel
          },
          render(e, b) {
            e.style.backgroundColor = "white"
            e.style.padding = "0.5rem"
            e.style.borderRadius = "100%"
            Img("N*", {
              render(e, b) {
                e.src = "https://nezaboodka.com/img/star-768x768-circle.png"
                e.style.width = "3em"
                e.style.height = "3em"
              }
            })
          }
        })

        Panel("Verstak", {
          widthGrowth: 1,
          alignContent: To.Center,
          initialize(e, b) {
            e.className = s.Panel
          },
          render(e, b) {
            b.baseRender()
            lineFeed(); PlainText("Block may contain multiple lines")
            lineFeed(); PlainText("Try to change window size")
          }
        })

        Block("Account", {
          initialize(e, b) {
            e.className = cx(s.Panel, s.Hint)
          },
          render(e, b) {
            PlainText("[=]")
          }
        })
      }
    })
  )
}
