import {parser} from "./syrup.grammar"
import {LRLanguage, LanguageSupport} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"

let parserWithMetadata = parser.configure({
  props: [
    styleTags({
      Identifier: t.variableName,
      FunctionName: t.name,
      UnaryOp: t.name,
      BinaryOp: t.name,
      Type: t.typeName,
      Comment: t.lineComment,
      TypeName: t.typeName
    })
  ]
})

export const syrupLanguage = LRLanguage.define({
  parser: parserWithMetadata,
  languageData: {
    closeBrackets: {brackets: ["(", "[", "<"]},
    commentTokens: {line: "--"}
  }
})

export function syrup() {
  return new LanguageSupport(syrupLanguage)
}
