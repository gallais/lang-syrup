import {parser} from "./syrup.grammar"
import {LRLanguage, LanguageSupport} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"

let parserWithMetadata = parser.configure({
  props: [
    styleTags({
      FunctionName: t.className,
      UnaryOp: t.operatorKeyword,
      BinaryOp: t.operatorKeyword,
      Comment: t.lineComment,
      TypeName: t.typeName,
      "->": t.operatorKeyword,
      Identifier: t.variableName,
    })
  ]
})

const syrupLanguage = LRLanguage.define({
  name: "syrup",
  parser: parserWithMetadata,
  languageData: {
    closeBrackets: {brackets: ["(", "[", "<"]},
    commentTokens: {line: "--"}
  }
})

export function syrup() {
  return new LanguageSupport(syrupLanguage)
}
