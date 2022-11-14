import { refs } from "reactronic"
import { Block, BlockArgs, use, asComponent, Align } from "verstak"
import { observableModel } from "common/Utils"
import { Toggle } from "components/Toggle.v"
import { createFieldModel, Field } from "components/Field.v"
import { Theme } from "themes/Theme"
import { App } from "models/App"
import * as s from "themes/Common.s"
import {RunBtn} from "./RunBtn.v"
import {NextStepBtn} from "./NextStepBtn.v";
import {StopBtn} from "./StopBtn";

export function StatusBar(name: string, args: BlockArgs<HTMLElement, void, void>) {
  return (
    Block(name, asComponent(args, {
      render(e,b) {
        e.className = s.Panel
        RunBtn("RunBtn")
        NextStepBtn("NextStep")
        StopBtn("Stop")
      }
    }))
  )
}
