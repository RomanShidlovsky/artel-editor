import { refs } from "reactronic"
import { Block, BlockArgs, use, asComponent, Align } from "verstak"
import { observableModel } from "common/Utils"
import { Toggle } from "components/Toggle.v"
import { createFieldModel, Field } from "components/Field.v"
import { Theme } from "themes/Theme"
import { App } from "models/App"
import * as s from "themes/Common.s"
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
