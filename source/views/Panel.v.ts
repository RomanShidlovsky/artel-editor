import { block, BlockOptions, br, text } from "verstak"

export function Panel(name: string, content: string, options?: BlockOptions<HTMLElement, void, void>) {
  return (
    block(name, options, (e, b) => {
      e.style.border = "1px solid red"
      e.style.margin = "1em"

      br()
      text(name)

      br()
      text(e => {
        e.innerText = content
        e.style.border = "1px solid green"
        e.style.margin = "0.25em"
      }, { box: { hGrow: 1 } })
    })
  )
}
