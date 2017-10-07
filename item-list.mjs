const ItemList = function(parent) {
  this.parent = parent
  this.content = ''
  this.spacer = ''
  this.indent = parent ? parent.indent : ''
  this.isFirstItem = true
}

ItemList.prototype.addSpace = function(space) {
  this.spacer += space

  if (space.indexOf('\n') !== -1) {
    // reset indent when there are new lines
    this.indent = /[^\n]*$/.exec(space)[0]
  } else {
    // otherwise keep appending to current indent
    this.indent += space
  }
}

ItemList.prototype.add = function(data, ignoreComma) {
  // if (!ignoreComma) {
  //   if (!this.isFirstItem) {
  //     this.content += this.spacer.length ? ',' : ', '
  //   }
  //
  //   this.isFirstItem = false
  // }
  //
  // this.content += this.spacer
  // this.spacer = ''
  this.content += data
}

export default ItemList
