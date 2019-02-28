const SERVICEID = require('./src/config.js').SERVICEID
const express = require('express')
const request = require('request-promise')
const address = require('network-address')
const getPort = require('get-port')
const fs = require('fs')
const path = require('path')

const app = express()
app.use(express.static('dist'))

app.get('/healthCheck', (req, res) => {
  res.set('Content-Type', 'application/json')
  res.send({
    status: 'success',
    message: 'service is living'
  })
})

  ; (async function (params) {
    const files = fs.readdirSync(path.join(__dirname, 'dist'))
    let serviceJS
    let widgetJS
    files.forEach(fileName => {
      if (path.extname(fileName) === '.js') {
        if (fileName.match(/service\.\w{8}\.js/)) {
          serviceJS = fileName
        }
        if (fileName.match(/widget[\w]*\.\w{8}\.js/)) {
          widgetJS = fileName
        }
      }
    })

    const port = await getPort(8083)
    const ip = address()
    const serviceRegistryUrl = process.env.REGISTRY || 'http://localhost:8013'
    const url = `http://${ip}:${port}`

    let res = await request({
      method: 'POST',
      uri: serviceRegistryUrl + '/service',
      body: {
        service: {
          id: SERVICEID,
          name: '贸易',
          version: '0.1.0',
          framework: 'React',
          url: url,
          serviceJS: serviceJS ? `${url}/${serviceJS}` : '',
          menus: [
            {
              id: SERVICEID,
              name: '贸易管理',
              children: [
                {
                  id: `${SERVICEID}-normal`,
                  name: '一般贸易',
                  link: `/${SERVICEID}/normal`
                },
                {
                  id: `${SERVICEID}-processing`,
                  name: '加工贸易',
                  link: `/${SERVICEID}/processing`
                }
              ]
            }
          ],
          widgets: [// 暂时只允许向Portal界面添加一个widget
            {
              id: `widget-${SERVICEID}-stat`,
              name: '贸易统计',
              widgetJS: widgetJS ? `${url}/${widgetJS}` : '',
              colSpan: 1, // 为了一屏至少可以显示9个widget，要求占用两列或三列宽的widget需要管理员审核才能生效
              maxHeight: 240 // 为了一屏至少可以显示9个widget，widget的高度超过240部分将被隐藏
            }
          ],
          healthCheck: {
            path: `${url}/healthCheck`
          }
        }
      },
      json: true
    })
    console.log(res.message)
    const server = app.listen(port, _ => {
      console.log('server has started', server.address())
    })
  })()
