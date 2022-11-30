import {ObservableObject, raw, reactive, transactional} from "reactronic"
import { BaseHtmlDriver, HtmlSensors } from "verstak"
import { Theme } from "themes/Theme"
import { Loader } from "./Loader"
import {DarkTheme} from "../themes/DarkTheme.s";
import {LightTheme} from "../themes/LightTheme.s";
import * as monaco from 'monaco-editor'
import {ArtelMonacoClient} from "../../library/artel/packages/monaco-client/source";
import Worker from "../../library/artel/packages/monaco-client/source/worker?worker"

export class App extends ObservableObject {
  @raw readonly sensors: HtmlSensors
  version: string
  theme: Theme
  blinkingEffect: boolean
  loader: Loader
  themes: Theme[]
  darkTheme: boolean
  themeId: number
  model: monaco.editor.ITextModel | null = null
  isCreated : boolean = false

  constructor(version: string, theme: Theme) {
    super()
    this.sensors = new HtmlSensors()
    this.themeId = 0;
    this.version = version
    this.theme = theme
    this.blinkingEffect = false
    this.darkTheme = false
    this.loader = new Loader()
    this.themes = [new LightTheme(), new DarkTheme()]
  }

  @reactive
  protected actualizeBrowserTitle(): void {
    document.title = `Verstak Demo ${this.version}`
  }

  @reactive
  applyBlinkingEffect(): void {
    BaseHtmlDriver.blinkingEffect = this.blinkingEffect ? "verstak-blinking-effect" : undefined
  }

  @reactive
  async createModel(){
    const client = new ArtelMonacoClient()
    this.model = await client.getModel(new Worker())
  }

  @transactional
  setNextTheme(): void {
    this.themeId++
    if (this.themeId >= this.themes.length) {
      this.themeId = 0
    }
    this.theme = this.themes[this.themeId]
    monaco.editor.setTheme(this.theme.editorTheme)
  }
}
