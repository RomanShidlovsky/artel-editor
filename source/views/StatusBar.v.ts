import {Align, asComponent, Block, BlockArgs, use} from "verstak"
import {App} from "models/App"
import {ButtonV} from "./Button.v"
import {Transaction} from "reactronic";

export function StatusBar(name: string, args: BlockArgs<HTMLElement, void, void>) {
  return (
    Block(name, asComponent(args, {
      render(e,b) {
        const app = use(App)
        e.className = app.theme.Panel

        ButtonV("RunBtn", "fa-solid fa-play", app.theme.runBtnColor, () => {
          app.reset()
          app.placeSquare("A1:B2")
          app.placeSquare("D4")
          app.sendMessage("D4","OPA")
          app.sendMessage("A1","123")
          app.placeSquare("C2:D4")
          })
        ButtonV("NextStep", "fa-solid fa-forward-step", app.theme.nextStepBtnColor)
        ButtonV("Stop","fa-solid fa-stop", app.theme.stopBtnColor)
      }
    }))
  )
}
