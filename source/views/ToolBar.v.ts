import { Block, BlockArgs, PlainText, lineFeed, To, Img } from "verstak"
import { Panel } from "./Panel.v"
import * as m from "theme/Common.m"

export function ToolBar(name: string, args?: Partial<BlockArgs<HTMLElement, void, void>>) {
  return (
    Block(name, { ...args, render(e, b) {
      Block("Logo", {
        render(e, b) {
          b.apply(m.Panel)
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
        align: To.Center,
        render(e, b) {
          b.baseRender()
          b.apply(m.Panel)
          lineFeed(); PlainText("Block may contain multiple lines")
          lineFeed(); PlainText("Try to change window size")
        }
      })

      Block("Account", {
        render(e, b) {
          b.apply(m.Panel, m.Hint)
          PlainText("[=]")
        }
      })
    }})
  )
}
