import {Align, asComponent, Block, BlockArgs, use} from "verstak"
import {App} from "models/App"
import {ButtonV} from "./Button.v"

export function StatusBar(name: string, args: BlockArgs<HTMLElement, void, void>) {
  return (
    Block(name, asComponent(args, {
      render(e,b) {
        const app = use(App)
        e.className = app.theme.Panel
        ButtonV("RunBtn", "fa-solid fa-play", app.theme.runBtnColor)
        ButtonV("NextStep", "fa-solid fa-forward-step", app.theme.nextStepBtnColor)
        ButtonV("Stop","fa-solid fa-stop", app.theme.stopBtnColor)
      }
    }))
  )
}
