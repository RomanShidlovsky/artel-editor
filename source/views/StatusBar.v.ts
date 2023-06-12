import {asComponent, Block, BlockArgs, Input, use} from "verstak"
import {App} from "models/App"
import {ButtonV} from "./Button.v"
import {Transaction} from "reactronic";
import {compileArtel} from "../index";
import * as s from "themes/Common.s"

export function StatusBar(name: string, args: BlockArgs<HTMLElement, void, void>) {
  return (
    Block(name, asComponent(args, {
      render(e) {
        const app = use(App)
        e.className = app.theme.Panel

        ButtonV("RunBtn", "fa-solid fa-play", app.theme.runBtnColor, () => {
          const code = app.model?.getValue()
          if (code != undefined) {
            const compilationResult = compileArtel(code)
            app.reset()
            eval(compilationResult)
            Transaction.run(null, () => app.rerender = !app.rerender)
          }
          })
        //ButtonV("NextStep", "fa-solid fa-forward-step", app.theme.nextStepBtnColor)
        ButtonV("Stop","fa-solid fa-stop", app.theme.stopBtnColor)
        ButtonV("ResetCanvas", "fa-solid fa-rotate-right", app.theme.resetBtnColor, () => {
          Transaction.run(null, () => {
            app.places = app.places.toMutable();
            app.places.clear();
            app.textQueue = app.textQueue.toMutable();
            app.textQueue.clear();
          })
        })
        Input("inputField", {
          initialize(e) {
            e.id = "inputID";
            app.inputId = e.id;
            e.className = s.InputStyle;
            e.hidden = true;
          },
          widthMin: "300px"
        })
      }
    }))
  )
}
