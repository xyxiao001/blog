var getQueryString = function (search, name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = search.substr(1).match(reg)
  if (r != null) {
      return unescape(r[2])
  }
  return null
}

export default getQueryString
