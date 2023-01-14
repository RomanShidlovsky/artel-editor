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
          heightMin: "100%",
          initialize(e){
            e.id = "resizer"
            e.className = s.Resizer
            app.resizer = e

            const mouseMoveHandler = function (e : MouseEvent) {
              const dx = e.clientX - app.x
              const dy = e.clientY - app.y
              console.log('dx='+dx)
              console.log('old =' + app.newWidth)
              Transaction.run(null, () => app.newWidth = app.leftWidth! + dx)
              console.log('new =' + app.newWidth)
            }

            const mouseUpHandler = (e : MouseEvent) => {
              document.removeEventListener('mousemove', mouseMoveHandler)
              document.removeEventListener('mouseup', mouseUpHandler)
            }

            const mouseDownHandler = function (e : MouseEvent) {
              app.x = e.clientX
              app.y = e.clientY
              app.leftWidth = app.newWidth != 0 ? app.newWidth :app.leftSide?.getBoundingClientRect().width
              console.log('leftWidth=' + app.leftWidth)

              document.addEventListener('mousemove', mouseMoveHandler)
              document.addEventListener('mouseup', mouseUpHandler)
            }
            e.addEventListener('mousedown', mouseDownHandler)
          }
        })
        Block("Workarea", {
          reacting: true,
          widthMin: "16rem",
          widthGrowth: 2,
          alignContent: Align.Left + Align.Top,
          alignFrame: Align.Stretch,
          render(e, b) {
            e.className = cx(app.theme.Panel, s.Workarea)
            app.rightSide = e
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
