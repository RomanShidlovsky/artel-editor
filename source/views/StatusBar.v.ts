import {Align, asComponent, Block, BlockArgs, use} from "verstak"
import {App} from "models/App"
import {ButtonV} from "./Button.v"
import {Transaction} from "reactronic";
import {compileArtel} from "../index";
import {string} from "yargs";

export function StatusBar(name: string, args: BlockArgs<HTMLElement, void, void>) {
  return (
    Block(name, asComponent(args, {
      render(e,b) {
        const app = use(App)
        e.className = app.theme.Panel

        ButtonV("RunBtn", "fa-solid fa-play", app.theme.runBtnColor, () => {
          const code = app.model?.getValue()
          if (code != undefined) {
            const compilationResult = compileArtel(code)
            app.reset()
            const f = eval(compilationResult.code)
            Transaction.run(null, () => app.rerender = !app.rerender)
            console.log(app.cellSize)
          }
          })
        ButtonV("NextStep", "fa-solid fa-forward-step", app.theme.nextStepBtnColor)
        ButtonV("Stop","fa-solid fa-stop", app.theme.stopBtnColor)
        ButtonV("ResetCanvas", "fa-solid fa-rotate-right", app.theme.resetBtnColor, () => {
          Transaction.run(null, () => {
            app.places = app.places.toMutable();
            app.places.clear();
            app.textQueue = app.textQueue.toMutable();
            app.textQueue.clear();
          })
          console.log(app.places)
        })
      }
    }))
  )
}
