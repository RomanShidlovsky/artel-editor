import { Block, BlockPreset, row, $ } from "verstak"
import * as css from "theme/Common.css"
import { Panel } from "./Panel.v"

export function ToolBar(name: string, preset?: BlockPreset<HTMLElement, void, void>) {
  return (
    Block(name, preset, (e, b) => {
      Block("logo", [css.Panel, css.Brand], e => {
        $`Logo`
      })

      Panel("Toolbar", { widthGrow: 1, mixins: [css.Panel] }, (e, b) => {
        b.render() // base render
        row(() => $`multi`)
        row(() => $`line`)
        row(() => $`text`)
      })

      Block("account", [css.Panel, css.Unimportant], e => {
        $`Account`
      })
    })
  )
}
