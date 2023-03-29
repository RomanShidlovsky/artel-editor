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


const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
const version: string = "0.1"

configureDebugging()

const app = Transaction.run(null, () =>
  new App(version))


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

  function прочитать(hint) {
    return app.read(hint)
  }
`

VBlock.root(() => {
  HtmlBody("body", {
    render(e, b) {
      setContext(App, app)
      Main(app, "Main")
    },
  })
})

export function compileArtel(code: string) {
  const compilation = new DirectoryNode(new Uri(['project']),
    [new FileNode(new Uri(['project', 'sheet.art']), new SourceFileState(code, 0)),
      new FileNode(new Uri(['project', 'artel.project']), new SourceFileState('', 0))])
  const workspace = new Workspace([compilation]);
  const project = workspace.projects[0];
  if (project.kind !== 'standard') {
    throw new Error()
  }
  const emitter = new Emitter(project);
  return emitter.emitToString();
}

