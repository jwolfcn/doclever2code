(function(console){
  console.save = function(data, filename){
    if(!data) {
      console.error('Console.save: No data')
      return
    }
    if(!filename) filename = 'console.json'
    if(typeof data === "object"){
      data = JSON.stringify(data, undefined, 4)
    }
    var blob = new Blob([data], {type: 'text/json'}),
      e    = document.createEvent('MouseEvents'),
      a    = document.createElement('a')
    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
  }
})(console)
  function captureAndConvert ($, $$) {
    var comment = $('#interfaceBasicInfo input').value.split('_')[1]
    var url = $$('#interfaceBasicInfo input')[5].value
    var method = $$('#interfaceBasicInfo input')[4].value
    var qReg = /Query\s\(\d\)/
    var pReg = /Param\s\(\d\)/
    var bodyReg = /Body \(Raw\)/
    var params = '' // 拼接参数注释字符串
    var qParams = [] // query 参数
    var bodyParams = [] // body 参数
    var pParams = [] // params 参数
    var fparams = '{' // 拼接函数参数字符串
    var paramsStr = '' // 拼接参数串行
    var paramsCount = 0
    var bodyParamStr = ''
    $$('#paramContent > div.row').forEach((item, index) =>{
      if (qReg.test(item.innerHTML)){ // 如果是 query参数
        [].forEach.call(item.querySelectorAll('tr'),(tr)=>
          {
            var p = tr.querySelector('td:first-child input').value
            var c = tr.querySelector('td:nth-child(3) input').value
            if (p.length > 0) {
              params = params + `* @param \{*\} ${p} ${c}\n`
          qParams.push(p)
              if (paramsCount === 0) {
                fparams = fparams + ' ' + p
              } else {
                fparams = fparams + ', ' + p
              }
              paramsCount ++ 
            }
          }
        )
      }
      if (pReg.test(item.innerHTML)){ // 如果是 param参数
        [].forEach.call(item.querySelectorAll('tr'),(tr, index)=>
          {
            var p = tr.querySelector('td').innerText.trim()
            var c = tr.querySelector('td input').value
            if (p.length > 0) {
              params = params + `* @param \{*\} ${p} ${c}\n`
          pParams.push(p)
              if (paramsCount === 0) {
                fparams = fparams + ' ' + p
              } else {
                fparams = fparams + ', ' + p
              }
              paramsCount ++
            }
          }
        )
      }
      if (bodyReg.test(item.innerHTML)){ // 如果是 body参数
        [].forEach.call(item.querySelectorAll('tr[draggable="true"]'),(tr, index)=>
          {
        var p = tr.querySelector('td:first-child input').value
        var type = tr.querySelector('td:nth-child(2) input').value
            var c = tr.querySelector('td:nth-child(4) input').value
            if (p.length > 0) {
              params = params + `* @param \{${type}\} ${p} ${c}\n`
          bodyParams.push(p)
              if (paramsCount === 0) {
                fparams = fparams + ' ' + p
              } else {
                fparams = fparams + ', ' + p
              }
              paramsCount ++
            }
          }
        )
      }
    })
    fparams = fparams + (fparams.length > 1 ? ' }' : '}')
    var urlStr = ''
    if (pParams.length > 0) {
      var temp = `\'${url}\'`
      pParams.forEach(item => {
      temp  = `${temp}.replace(\'{${item}}\', ${item})`
      })
      urlStr = `\n    url: ${temp},`
    } else {
      urlStr = `\n    url: \'${url}\',`
    }
    if (method.toLowerCase().indexOf('get') > -1) {
      paramsStr = qParams.length > 0 ? `\n    params: { ${qParams.join(', ')} }` : `\n    params: {}`
    } else {
      paramsStr = bodyParams.length > 0 ? `\n    params: { ${bodyParams.join(', ')} }` : `\n    params: {}`
    }
    return '/**' +
    '\n* ' + comment +
    '\n' + params +
    '*/' +
    '\nexport function functionName(' + fparams + ') {' +
    '\n  return request({' +
    urlStr +
    '\n    method: \'' + method.toLowerCase() + '\'' + ',' +
    paramsStr +
    '\n  })' +
    '\n}'
  }
  var t = 0
  var result = ''
  var targets = $$('div[name="treeName"]')
  var $1 = $
  var $2 = $$
  targets.forEach((item, index) => {
    t = t + 600
    setTimeout(() => {
      item.click()
      setTimeout(() => {
      result = result + captureAndConvert($1, $2) + '\n'
      console.log(result)
        if (index === targets.length - 1) {
          console.save(result, 'test.txt')
        }
      }, 300)
    }, t)
  })
