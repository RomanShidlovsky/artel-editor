import * as monaco from 'monaco-editor';

export function addKeybindings(editor: monaco.editor.IStandaloneCodeEditor) {
  editor.addCommand(monaco.KeyMod.Alt | monaco.KeyCode.Backquote, function () {
    editor.trigger("keyboard", "type", { text: "`" });
  });
  editor.addCommand(monaco.KeyMod.Alt | monaco.KeyCode.Quote, function () {
    editor.trigger("keyboard", "type", { text: "'" });
  })
  editor.addCommand(monaco.KeyMod.Alt | monaco.KeyMod.Shift | monaco.KeyCode.Quote, function () {
    editor.trigger("keyboard", "type", { text: '"' });
  })
  editor.addCommand(monaco.KeyMod.Alt | monaco.KeyMod.Shift | monaco.KeyCode.Backquote, function () {
    editor.trigger("keyboard", "type", { text: "~" });
  })
  editor.addCommand(monaco.KeyMod.Alt | monaco.KeyCode.BracketLeft, function () {
    editor.trigger("keyboard", "type", { text: "[" });
  })
  editor.addCommand(monaco.KeyMod.Alt | monaco.KeyCode.BracketRight, function () {
    editor.trigger("keyboard", "type", { text: "]" });
  })
  editor.addCommand(monaco.KeyMod.Alt | monaco.KeyMod.Shift | monaco.KeyCode.BracketLeft, function () {
    editor.trigger("keyboard", "type", { text: "{" });
  })
  editor.addCommand(monaco.KeyMod.Alt | monaco.KeyMod.Shift | monaco.KeyCode.BracketRight, function () {
    editor.trigger("keyboard", "type", { text: "}" });
  })
  editor.addCommand(monaco.KeyMod.Alt | monaco.KeyCode.Comma, function () {
    editor.trigger("keyboard", "type", { text: "," });
  })
  editor.addCommand(monaco.KeyMod.Alt | monaco.KeyMod.Shift | monaco.KeyCode.Comma, function () {
    editor.trigger("keyboard", "type", { text: "<" });
  })
  editor.addCommand(monaco.KeyMod.Alt | monaco.KeyCode.Period, function () {
    editor.trigger("keyboard", "type", { text: "." });
  })
  editor.addCommand(monaco.KeyMod.Alt | monaco.KeyMod.Shift | monaco.KeyCode.Period, function () {
    editor.trigger("keyboard", "type", { text: ">" });
  })
  editor.addCommand(monaco.KeyMod.Alt | monaco.KeyCode.Slash, function () {
    editor.trigger("keyboard", "type", { text: "/" });
  })
}
