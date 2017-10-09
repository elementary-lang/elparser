import htmlparser from 'htmlparser2'
import prettier from 'prettier'
import ItemList from './item-list'
import R from 'ramda'
const {
  omit,
  trim,
  length,
  gt,
  isEmpty,
  splitAt,
  head,
  tail,
  reverse,
  split,
  not,
  compose,
  __,
  cond,
  T,
  equals
} = R

var elementStack = []
const hasText = compose(gt(__, 0), length, trim)
const stringIsNotEmpty = compose(not, isEmpty, trim)

export default function(el, cb) {
  let currentItemList = new ItemList(null)

  const parser = new htmlparser.Parser(
    {
      onopentag: function(name, attribs) {
        currentItemList = new ItemList(currentItemList)
        elementStack.unshift([name, attribs])
      },
      ontext: function(text) {
        if (hasText(text)) {
          currentItemList.add(trim(text) + '\n')
        }
      },
      onclosetag: function(tagname) {
        var element = elementStack.shift()
        var elementContent = currentItemList.content + currentItemList.spacer
        currentItemList = currentItemList.parent

        currentItemList.add(
          cond([
            [equals('js'), renderJs(element[1], elementContent)],
            [equals('export'), renderExport(element[1], elementContent)],
            [equals('import'), renderImport(element[1], elementContent)],
            [equals('function'), renderFunction(element[1], elementContent)],
            [T, renderBasic(element[1], elementContent)]
          ])(element[0])
        )
      },
      onend: function() {
        cb(null, prettier.format(currentItemList.content, { semi: false }))
      }
    },
    { decodeEntities: true, lowerCaseTags: false }
  )
  parser.write(el)
  parser.end()
}

function renderExport(attribs, elementContent) {
  return () => `export default ${attribs.default} \n${elementContent}`
}

function renderImport(attribs, elementContent) {
  return () =>
    `import ${attribs.as ||
      attribs.from} from "${attribs.from}" \n${elementContent}`
}

function renderJs(attribs, elementContent) {
  return () => elementContent
}

function renderFunction(attribs, elementContent) {
  return function(tag) {
    let args = omit(['name'], attribs)
    args = isEmpty(args) ? '' : '{' + Object.keys(args).join(',') + '}'
    const lines = elementContent

    return `
function ${attribs['name']} (${args}) {
return (${lines})
}
    `
  }
}

function renderBasic(attribs, elementContent) {
  return function(tag) {
    if (stringIsNotEmpty(elementContent)) {
      attribs['data'] = trim(elementContent)
    }
    let args = isEmpty(attribs)
      ? ''
      : '{' + Object.keys(attribs).map(k => `${k}: ${attribs[k]}`) + '}'
    return `${tag}(${args})`
  }
}
