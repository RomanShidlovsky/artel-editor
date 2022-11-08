import { Block, row, $, Align} from "verstak"
import { App } from "models/App"
import { ToolBar } from "./ToolBar.v"
import { StatusBar } from "./StatusBar.v"
import * as css from "theme/Common.css"

export function Main(name: string, app: App) {
  return (
    Block(name, {
      reactor: true,
      render(e, b) {
        if (b.isInitialRendering) {
          app.sensors.listen(e)
          e.addEventListener("contextmenu", event => event.preventDefault())
          e.dataForSensor.window = app
        }

        row(s => {
          ToolBar("ToolBar", {
            widthGrow: 1,
          })
        })

        row(s => {
          Block("NavBar", {
            reuse: [css.Panel],
            widthMin: "10rem",
            align: Align.TopCenter,
            render() {
              $`Navigation Bar`
            }
          })

          Block("WorkArea", {
            reuse: [css.Panel, css.Important],
            widthGrow: 1,
            heightGrow: 1,
            align: Align.MiddleCenter,
            render() {
              // work area contents can be placed here
              $`Hello, Verstak!<br/>How are you doing today?`
            }
          })

          Block("PropInspector", {
            reuse: [css.Panel],
            widthMin: "15rem", widthMax: "15rem",
            align: Align.FitButTop,
            render() {
              $`СПРАВКА`
              row(s => {
                $`<br/>Верстак – это система построения визуальных интерфейсов на основе табличной вёрстки. В основе лежит идея размещения визуальных элементов интерфейса в одиночных или смежных ячейках таблицы. Размещаемые элементы называются блоками. При этом сама таблица с размещёнными внутри неё блоками также считается блоком и в свою очередь может быть размещена в другом блоке уже на его табличной сетке.`
              })
            }
          })
        })

        row(() => {
          StatusBar("StatusBar", {
            widthGrow: 1,
          })
        })
      },
    })
  )
}
