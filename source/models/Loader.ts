import {ObservableObject, pause, reactive} from "reactronic"

export class Loader extends ObservableObject {
  filter: string
  loaded: Array<string>

  constructor() {
    super()
    this.filter = ""
    this.loaded = []
  }

  @reactive
  protected async load(): Promise<void> {
    await pause(0)
    const f = this.filter.toLocaleLowerCase()
    this.loaded = technologies.filter(x => x.toLocaleLowerCase().indexOf(f) >= 0)
  }
}

const technologies = [
  "Nezaboodka",
  "Boocel",
  "Reactronic",
  "Artel",
  "Verstak",
  "And some more products in the future"
]
