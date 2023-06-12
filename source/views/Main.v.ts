import {cx} from "@emotion/css"
import {Align, Block, lineFeed} from "verstak"
import {App} from "models/App"
import {InfoBar} from "./InfoBar.v"
import {StatusBar} from "./StatusBar.v"
import {Editor} from "./Editor.v"
import * as s from "themes/Common.s"
import {Transaction} from "reactronic";
import {ButtonV} from "./Button.v";
import {WorkAreaCanvas} from "./WorkAreaCanvas.v";

export function Main(app: App, name: string) {
  return (
    Block(name, {
      reacting: true, // re-rendering point
      triggers: app.rerender,
      alignContent: Align.Top,
      heightGrowth: 1,
      render(e) {
        app.parWidth = e.getBoundingClientRect().width
        e.style.backgroundColor = app.theme.backColor
        InfoBar("ToolBar", { widthGrowth: 1 })
        lineFeed()
        Editor("Editor", {
          widthGrowth: 3,
          widthMin: "250px",
          heightGrowth: 0.5,
          heightMax: "690px",
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
          widthMin: "5px",
          heightGrowth: 0.5,
          initialize(e){
            e.id = "resizer"
            e.className = s.Resizer
            app.resizer = e

            const mouseMoveHandler = function (e : MouseEvent) {
              const dx = e.clientX - app.x
              Transaction.run(null, () => {app.newWidth = app.leftWidth! + dx - 33;})
            }

            const mouseUpHandler = () => {
              document.removeEventListener('mousemove', mouseMoveHandler)
              document.removeEventListener('mouseup', mouseUpHandler)
            }

            const mouseDownHandler = function (e : MouseEvent) {
              app.x = e.clientX
              app.leftWidth = app.leftSide?.getBoundingClientRect().width!
              document.addEventListener('mousemove', mouseMoveHandler)
              document.addEventListener('mouseup', mouseUpHandler)
            }
            e.addEventListener('mousedown', mouseDownHandler)
          }
        })

        WorkAreaCanvas("GridExample", {
          render(e, b, base) {
            base()
            e.className = cx(s.Important, app.theme.Smartphone)
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
