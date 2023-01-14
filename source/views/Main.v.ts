import { cx } from "@emotion/css"
import {Block, Align, PlainText, lineFeed, use, setContext, Grid} from "verstak"
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
import {Compilation} from "../../library/artel/packages/compiler/source/compilation/Compilation";
import {Uri} from "../../library/artel/packages/compiler/source/Uri";
import {WorkArea} from "./WorkArea.v";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";

export function Main(app: App, name: string) {
  return (
    Block(name, {
      reacting: true, // re-rendering point
      triggers: app.darkTheme,
      alignContent: Align.Top,
      heightGrowth: 1,
      render(e, b) {
        app.parWidth = e.getBoundingClientRect().width
        e.style.backgroundColor = app.theme.backColor
        InfoBar("ToolBar", { widthGrowth: 1 })
        lineFeed()
        Editor("Editor", {
          widthGrowth: 3,
          widthMin: "250px",
          heightGrowth: 0.5,
          render(e, b, base) {
            base()
            e.className =  cx(app.theme.Panel, s.Important)
            app.leftSide = e
            if (app.newWidth != 0)
            {
              e.style.maxWidth = `${app.newWidth}px`
            }
          },
        })
        Block("resizer",{
          widthMin: "2px",
          heightMin: "98%",
          initialize(e){
            e.id = "resizer"
            e.className = s.Resizer
            app.resizer = e

            const mouseMoveHandler = function (e : MouseEvent) {
              const dx = e.clientX - app.x
              console.log()
              Transaction.run(null, () => {app.newWidth = app.leftWidth! + dx - 33;})
              console.log(app.newWidth, ' ', app.leftWidth)
            }

            const mouseUpHandler = (e : MouseEvent) => {
              document.removeEventListener('mousemove', mouseMoveHandler)
              document.removeEventListener('mouseup', mouseUpHandler)
            }

            const mouseDownHandler = function (e : MouseEvent) {
              app.x = e.clientX
              console.log(app.x)
              let rect = app.leftSide?.getBoundingClientRect().width
              console.log('rect: ', rect)
              app.leftWidth = app.leftSide?.getBoundingClientRect().width!
              document.addEventListener('mousemove', mouseMoveHandler)
              document.addEventListener('mouseup', mouseUpHandler)
            }
            e.addEventListener('mousedown', mouseDownHandler)
          }
        })

        WorkArea("GridExample", {
          reacting: true,
          widthMin: "16rem",
          alignContent: Align.Left + Align.Top,
          alignFrame: Align.Stretch,
          widthGrowth: 3,
          //heightGrowth: 1,
          render(e, b, base) {
            base()
            e.className = cx(s.Panel, s.Important)
          },
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
