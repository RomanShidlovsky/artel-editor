import { cx } from "@emotion/css"
import { Block, Align, PlainText, lineFeed, use, setContext } from "verstak"
import { Markdown } from "verstak-markdown"
import { Theme } from "themes/Theme"
import { App } from "models/App"
import { InfoBar } from "./InfoBar.v"
import { StatusBar } from "./StatusBar.v"
import { Editor } from "./Editor.v"
import * as s from "themes/Common.s"
import {Toggle} from "../components/Toggle.v";
import {observableModel} from "../common/Utils";
import {refs, Transaction} from "reactronic";
import {ButtonV} from "./Button.v";

export function Main(app: App, name: string) {
  return (
    Block(name, {
      reacting: true, // re-rendering point
      triggers: app.darkTheme,
      alignContent: Align.Top,
      heightGrowth: 1,
      render(e, b) {
        e.style.backgroundColor = app.theme.backColor
        InfoBar("ToolBar", { widthGrowth: 1 })
        lineFeed()
        Editor("Editor", {
          widthGrowth: 3,
          heightGrowth: 0.5,
          render(e, b, base) {
            base()
            e.className =  cx(app.theme.Panel, s.Important)
          },
        })
        Block("Workarea", {
          reacting: true,
          widthMin: "16rem",
          widthGrowth: 2,
          alignContent: Align.Left + Align.Top,
          alignFrame: Align.Stretch,
          render(e, b) {
            e.className = cx(app.theme.Panel, s.Workarea)
          }
        })
        // Status bar row
        lineFeed()
        StatusBar("StatusBar", { widthGrowth: 1 })
        Block("Panel",{
          render(e){
            e.className = app.theme.Panel
            ButtonV("ThemeBtn", "fa-solid fa-sun", app.theme.themeBtnColor,
              () => Transaction.run(null, () => app.setNextTheme()))
          }
        })

      },
    })
  )
}
