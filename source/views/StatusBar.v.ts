import { Block, BlockPreset, $, row } from "verstak"
import { Panel } from "./Panel.v"
import * as css from "theme/Common.css"

export function StatusBar(name: string, preset?: BlockPreset<HTMLElement, void, void>) {
  return (
    Block(name, preset, (e, b) => {
      Panel("Status", { widthGrow: 1, mixins: [css.Panel] }, (e, b) => {
        b.render() // base render
        row(() => $`status bar content`)
      })

      Panel("Ind-1", [css.Panel, css.Center], (e, b) => {
        b.render() // base render
        row(() => $`[1]`)
      })

      Panel("Ind-2", [css.Panel, css.Center], (e, b) => {
        b.render() // base render
        row(() => $`[2]`)
      })

      Panel("Ind-3", [css.Panel, css.Center], (e, b) => {
        b.render() // base render
        row(() => $`[3]`)
      })
    })
  )
}
