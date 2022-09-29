const lodash = require('lodash')

const nft = {
  info:
    {title: 'abc'}
}

console.log(lodash.get(nft, 'info.title'))