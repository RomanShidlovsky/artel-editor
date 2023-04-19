import * as monaco from 'monaco-editor';

interface IKeyBinding {
  keyMods: number;
  keyCode: monaco.KeyCode;
  text: string;
}

const keyBindings: IKeyBinding[] = [
  {keyMods: monaco.KeyMod.Alt, keyCode: monaco.KeyCode.Backquote, text: '`'},
  {keyMods: monaco.KeyMod.Alt, keyCode: monaco.KeyCode.Quote, text: "'"},
  {keyMods: monaco.KeyMod.Alt | monaco.KeyMod.Shift, keyCode: monaco.KeyCode.Quote, text: '"'},
  {keyMods: monaco.KeyMod.Alt | monaco.KeyMod.Shift, keyCode: monaco.KeyCode.Backquote, text: '~'},
  {keyMods: monaco.KeyMod.Alt, keyCode: monaco.KeyCode.BracketLeft, text: '['},
  {keyMods: monaco.KeyMod.Alt, keyCode: monaco.KeyCode.BracketRight, text: ']'},
  {keyMods: monaco.KeyMod.Alt | monaco.KeyMod.Shift, keyCode: monaco.KeyCode.BracketLeft, text: '{'},
  {keyMods: monaco.KeyMod.Alt | monaco.KeyMod.Shift, keyCode: monaco.KeyCode.BracketRight, text: '}'},
  {keyMods: monaco.KeyMod.Alt, keyCode: monaco.KeyCode.Comma, text: ','},
  {keyMods: monaco.KeyMod.Alt | monaco.KeyMod.Shift, keyCode: monaco.KeyCode.Comma, text: '<'},
  {keyMods: monaco.KeyMod.Alt, keyCode: monaco.KeyCode.Period, text: '.'},
  {keyMods: monaco.KeyMod.Alt | monaco.KeyMod.Shift, keyCode: monaco.KeyCode.Period, text: '>'},
  {keyMods: monaco.KeyMod.Alt, keyCode: monaco.KeyCode.Slash, text: '/'},
  {keyMods: monaco.KeyMod.Alt, keyCode: monaco.KeyCode.Backslash, text: '\\'},
  {keyMods: monaco.KeyMod.Alt | monaco.KeyMod.Shift, keyCode: monaco.KeyCode.Backslash, text: '|'}
];

export function addKeybindings(editor: monaco.editor.IStandaloneCodeEditor) {
  keyBindings.forEach(binding => {
    editor.addCommand(binding.keyMods | binding.keyCode, () => {
      editor.trigger('keyboard', 'type', {text: binding.text});
    });
  });
}
