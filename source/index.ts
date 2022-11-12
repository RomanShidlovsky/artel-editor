import { Transaction } from "reactronic"
import { VBlock, HtmlBody } from "verstak"
import { configureDebugging } from "dbg"
import { App } from "models/App"
import { Main } from "views/Main.v"

import "../index.reset.css"
import "../public/assets/verstak.css"
import "../index.css"
import { MarkdownCodeDarkTheme } from "themes/MarkdownCodeDarkTheme.s"

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
const version: string = "0.1"

configureDebugging()

const app = Transaction.run(null, () => new App(version))
const theme = new MarkdownCodeDarkTheme()

VBlock.root(() => {
  HtmlBody("html > body", body => {
    Main("main", app, theme)
  })
})
