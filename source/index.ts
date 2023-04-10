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

console.log('INDEX')

const app = Transaction.run(null, () => {
  return new App(version)
})

const artelFunctions = `
      используется артель
      внешняя операция сообщить(позиция: Текст, текст: Текст, цвет: Текст)
      внешняя операция прямоугольник(позиция: Текст, цвет: Текст)
      внешняя операция установить-параметры-сетки(размерКлетки: Число, количестовСтрок: Число, количетсвоСтолбцов: Число)
      внешняя параллельная операция прочитать(подсказка: Текст): Число
`

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

/*export function compileArtel(code: string) {
  const compilation = new Compilation(new Uri(['project']), [
    {
      uri: new Uri(['project', 'module']),
      sourceFiles: [
        {
          uri: new Uri(['project', 'module', 'sheet.a']),
          syntax: new Parser(code).parse(),
        }
      ]
    }
  ])
  let compilationResult
  try {
    const emitterResult = compilation.emitWithDiagnostics()
    const codeWithHelperFunction = helperArtelFunctions + emitterResult.code
    const mainFileDiagnostics = emitterResult.diagnostics[1]
    /!*const syntaxErrors = mainFileDiagnostics.syntax.items.map<LanguageError>(d => ({
      kind: 'syntax',
      message: d.message,
      span: { start: d.range.start, length: d.range.length }
    }))*!/
    /!*const semanticErrors = mainFileDiagnostics.semantic.items.map<LanguageError>(d => ({
      kind: 'semantic',
      message: d.message,
      span: { start: d.range.start, length: d.range.length }
    }))*!/
    compilationResult = {
      code: codeWithHelperFunction,
      //errors: [...syntaxErrors, ...semanticErrors]
    }
  } catch (_) {
    compilationResult = {
      code: '',
      errors: [{ kind: 'semantic', message: 'Emitter error', span: { start: 0, length: 1 } }]
    }
  }
  return compilationResult
}*/
