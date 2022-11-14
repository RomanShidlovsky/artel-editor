import { cx } from "@emotion/css"
import { Block, Align, PlainText, lineFeed, use, setContext } from "verstak"
import { Markdown } from "verstak-markdown"
import { Theme } from "themes/Theme"
import { App } from "models/App"
import { ToolBar } from "./ToolBar.v"
import { StatusBar } from "./StatusBar.v"
import { WorkArea } from "./WorkArea.v"
import * as s from "themes/Common.s"

export function Main(name: string) {
  return (
    Block(name, {
      reacting: true, // re-rendering point
      alignContent: Align.Top,
      heightGrowth: 1,
      render(e, b) {
        const app = use(App)
        setContext(Theme, app.theme)
        e.style.backgroundColor = "rgba(230, 230, 230)"
        // Toolbar row
        ToolBar("ToolBar", { widthGrowth: 1 })
        lineFeed()
        // Main row
        // Block("NavBar", {
        //   widthMin: "10rem",
        //   alignContent: Align.Top,
        //   alignFrame: Align.Stretch,
        //   render(e, b) {
        //     e.className = s.Panel
        //     PlainText("Navigation Bar")
        //   }
        // })
        WorkArea("Editor", {
          widthGrowth: 3,
          heightGrowth: 0.5,
          render(e, b, base) {
            base()
            e.className = cx(s.Panel, s.Important)
          },
        })
        Block("Workarea", {
          reacting: true,
          widthMin: "16rem",
          widthGrowth: 2,
          alignContent: Align.Left + Align.Top,
          alignFrame: Align.Stretch,
          render(e, b) {
            const theme = use(Theme)
            e.className = cx(s.Panel, theme.markdown, s.Workarea)
          }
        })
        // Status bar row
        lineFeed()
        StatusBar("StatusBar", { widthGrowth: 1 })
      },
    })
  )
}

const CODE = `
Block size is automatically adjusted to size of table
cells, while cells are automatically adjusted to screen
size of each user. System is suitable both to lay out
application panels and to create reusable components.

\`\`\` js
Grid("Example", {
  render(e, b) {
    // Blocks can be layed out automatically
    // based on their order and line feeds.
    Ruler("1", To.Left, true)
    Ruler("A", To.Top + To.Center)
    Ruler("B", To.Top + To.Center)
    Ruler("C", To.Top + To.Center); lineFeed()
    Ruler("2", To.Left); lineFeed()
    Ruler("3", To.Left); lineFeed()
    // Blocks can also be layed out
    // explicitly in exact cells.
    ExampleData("B2")
    ExampleData("A1:B1")
    ExampleData("C1:C2")
    ExampleData("B3:C3")
    ExampleData("A2:A3")
  },
})
\`\`\`
`
