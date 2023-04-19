import {Transaction} from "reactronic"
import {HtmlBody, setContext, VBlock} from "verstak"
import {configureDebugging} from "dbg"
import {App} from "models/App"
import {Main} from "views/Main.v"

import "../index.reset.css"
import "../public/assets/verstak.css"
import "../index.css"
import {DirectoryNode, FileNode, SourceFileState, Workspace} from "../library/artel/packages/compiler/source/project";
import {Uri} from "../library/artel/packages/compiler/source/common";
import {Emitter} from "../library/artel/packages/compiler/source/compilation/Emitter";
import { artelFunctions } from "models/App";

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
const version: string = "0.1"

configureDebugging()

const app = Transaction.run(null, () => {
  return new App(version)
})



const helperArtelFunctions = `
  function прямоугольник(place, borderWidth, color) {
    return app.placeSquare(place, borderWidth, color)
  }
  function сообщить(place, message, color) {
    return app.sendMessage(place, message, color)
  }
  function установитьПараметрыСетки(cellSize, rowNumber, columnNumber) {
    return app.setNetParams(cellSize, rowNumber, columnNumber)
  }

  async function прочитать_1(hint) {
    return await app.waitForInput(hint);
  }

  function разобратьСтрокуВЧисло(numberString) {
    const number = parseInt(numberString);
    if (Number.isNaN(number)) {
      return undefined;
    } else {
      return number;
    }
  }
`

VBlock.root(() => {
  HtmlBody("body", {
    render() {
      setContext(App, app)
      Main(app, "Main")
    },
  })
})

export function compileArtel(code: string) {
  const fileSystemTree =
    new DirectoryNode(
      new Uri(['project']),
      [
        new FileNode(
          new Uri(['project', 'main.art']),
          new SourceFileState(code, 0)
        ),
        new FileNode(
          new Uri(['project', 'artel.project']),
          new SourceFileState('', 0)
        ),
        new DirectoryNode(
          new Uri(['project', 'рисование']),
          [
            new FileNode(
              new Uri(['project', 'main.art']),
              new SourceFileState(artelFunctions, 0)
            )
          ]
        )
      ]
    )
  const workspace = new Workspace([fileSystemTree])
  const project = workspace.projects[0]
  if (project.kind !== 'standard')
    throw new Error('Internal error')
  const emitter = new Emitter(project)
  return emitter.emitToString() + helperArtelFunctions
}
