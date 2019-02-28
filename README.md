# 前端微服务子应用脚手架
## 目录简介
1. [介绍](#介绍) 
2. [程序目录](#程序目录)
3. [开发与构建命令](#开发与构建命令)
    * [依赖配置](#依赖配置)
    * [命令说明](#命令说明)
4. [开发流程](#开发流程)
    * [概述](#概述)
5. [注意事项](#注意事项)
    * [原则](#原则)
    * [如何定义全局方法或变量](#如何定义全局方法或变量)
    * [如何使用sessionStorage/localStorage/cookie](#如何使用sessionStorage/localStorage/cookie)
    * [如何跨子应用数据交互](#如何跨子应用数据交互)
    * [如何链接跳转](#如何链接跳转)
    * [全局样式规范](#全局样式规范)

## <a name="介绍">介绍</a>
本项目是基于 react & redux & react-router & axios & element-ui 的前端微服务子应用脚手架工程的模板，本地环境需要安装 node  

![整体架构图](http://120.79.26.168:10001/classroom/vue/portal-childapp-vue/raw/develop/template/src/assets/images/ArchitectureDiagram.png)

## <a name="程序目录">程序目录</a>
```
|── config                                  // 构建相关  
|── public                                  // 公共文件 
├── src                                     // 源代码
│   ├── assets                              // 图片样式等静态资源
│   ├── lib                                 // 字体等第三方库资源
│   ├── components                          // 全局公用组件
│   ├── utils                               // 全局公用方法
│   │   ├── auth.js                         // 操作 token 
│   │   ├── cookies.js                      // 操作 cookies
│   │   ├── index.js                        // 公用方法
│   │   ├── storage.js                      // 全局 storage 相关方法封装
│   ├── config.js                           // 微服务 id 存放在这个文件中，webpack、server 等 js 都有读取这个id配置
│   ├── service.js                          // Portal 入口加载组件初始化等
└── package.json                            // 包配置
```

## <a name="开发与构建命令">开发与构建命令</a>
### <a name="依赖配置">依赖配置</a>
```shell
# 安装依赖   
npm install

# 进入开发模式，启动前台应用，localhost:3000，监听vue文件改动自动刷新浏览器  
npme start

# 构建文件到dist目录供发布，无法单独部署访问，必须集成到portal访问
npm run build
```

如果一切顺利，就能正常打开端口: [http://localhost:3000/](http://localhost:3000/)       

### <a name="命令说明">命令说明</a>

| `npm run <script>` | 解释             |
| ------------------ | ---------------- |
| `dev`              | 打包测试资源     |
| `build`            | 打包正式资源     |
| `start`            | 启动3000端口服务 |
* 开发使用 `dev 和 start`
* 发布使用 `build`

## <a name="开发流程">开发流程</a>
### <a name="概述">概述</a>
1. 访问 [海关服务市场](http://www.portal.com) 填写配置后，点击下载按钮，下载本脚手架前端工程，确认 `src/config.js` 里的 SERVICEID 和 SERVICENAME 配置是否正确；
2. 根据项目实际需求，准备各路由所对应的 react 文件，分配给项目成员实现；
3. 访问 [可视化接口管理工具](http://10.200.15.38:2222) 配置 mock 数据；
4. 实现 react 文件的界面部分；
5. 后端实现 RESTful 接口，并维护接口文档；
6. 调试后端接口；
7. 测试。

## <a name="注意事项">注意事项</a>

### <a name="原则">原则</a>
1. /api/*.js 所有 js 都用驼峰命名，并且内部注释该 js 功能，删除未用 js；
2. 根据业务模块来划分 views，并且将 views 和 api 两个模块一一对应，方便维护；
3. 独立的东西，没有必要使用 vuex 来存储 data，每个页面里存放自己的 data 就行。但如登录 token，用户信息，或者是一些全局个人偏好设置等，还是用vuex管理更加的方便，具体还是要结合业务场景；
4. 后端返回前端的数据，字段名同数据库中的字段名，并转为小写字母开头的驼峰式命名，构造 mock 数据时也要注意这一点；
5. 工程编译时，`src` 目录下的 `lib`、`assets` 目录下的文件会被直接复制到 dist 目录下；
6. `@` 是 `src` 的别名，在程序中引入路径的时候，`@/utils/request`就直接可以代替`../src/utils/request`；
7. 为了便于维护，对话框、页签等如果里面的内容比较多（超过30行），要独立成 vue 组件，尽量不要让一个 vue 组件的代码太多（超过500行超过20K）,尽量把 vue 文件里的 js 移到单独的文件，便于使用编辑器的 js 校验 js 格式化功能。vue 文件中 css 代码行数较多时（超过50行），亦可将 css 移到单独的 css 文件。模板部分要保持在 vue 文件里，以使用 Vetur 插件的模板语法校验功能。
8. 使用 VSCode 作为 js/vue 的编辑器，并安装以下插件 `EditorConfig for VSCode` , `Prettier-Standard - JavaScript formatter` , `JavaScript Standard Style` , `stylefmt` , `Vetur`；
9. 在 VSCode 的配置里要加下面的命令，格式化时使用单引号而不是双引号和防止自动加分号：`"prettier.singleQuote": true`,`"prettier.semi": false` 
10. 可修改 `/src/app.js` 中的 `import App from '@/views/main.vue'` 来去左侧菜单；
11. 安装并配置 ESLint（可组装的JavaScript和JSX检查工具，保持团队代码规范统一），依次点击 文件 > 首选项 > 设置 打开 VSCode 配置文件，添加如下配置  

```js
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "html",
    {
      "language": "vue",
      "autoFix": true
    }      
  ],
  "eslint.options": {
    "plugins": [
      "html"
    ]      
  },
  "eslint.autoFixOnSave": true,    
```

### <a name="如何定义全局方法或变量">如何定义全局方法或变量</a>
子应用创建的全局方法或变量，都要放到子应用ID的命名空间下，例如：  
   
```js
import {SERVICEID} from './config.js'
let ns = window[SERVICEID] = window[SERVICEID] || {}
ns.foo = { bar: 'val1', baz: 'val2'}
ns.qux = (a, b) => {}    
```    

### <a name="如何使用sessionStorage/localStorage/cookie">如何使用sessionStorage/localStorage/cookie</a>  
在脚手架工程下提供sessionStorage的前后端操作库(`src/utils/storage.js`)，接管sessionStorage操作。
```js
import {SERVICEID} from './config.js'
import SessionStorage from './utils/storage.js'
SessionStorage.setServiceId(SERVICEID) // 设置子应用id
SessionStorage.setItem('foo', 'value')
```

在脚手架工程下提供localStorage的前后端操作库(`src/utils/storage.js`)，接管localStorage操作。
```js
import {SERVICEID} from './config.js'
import LocalStorage from './utils/storage.js'
LocalStorage.setServiceId(SERVICEID) // 设置子应用id
LocalStorage.setItem('foo', 'value')
```

在脚手架工程下提供cookie的前后端操作库(`src/utils/cookies.js`)，接管cookie操作。

```js
import { SERVICEID } from './config.js'
import Cookies from './utils/cookies.js'
// 操作 Cookies 是往浏览器 LocalStorage 里存值，通过 key 来区分，为了防止多个子应用设置 cookies 超量
Cookies.setServiceId(SERVICEID) // 设置子应用id
Cookies.set('name', 'value'); // 永不过期
Cookies.set('name', 'value', { expires: 7 }); // 过期时间7天
Cookies.get('name'); // => 'value'
Cookies.remove('name');
Cookies.get('name'); // => undefined
```

### <a name="如何跨子应用数据交互">如何跨子应用数据交互</a>
1. 在`index.js`里我们定义了`portal.global`为一个`Observable`实例，`Observable`是`订阅/发布模式`的实现，所以`portal.global`支持 `get``set``subscribe``unsubscribe` 等方法
   ```js
    function callback(value, path) {
        console.log(value, path);
    }
        
    portal.global.set('foo', { bar: 'value' }) // 改变属性foo的值
    portal.global.set('foo.bar', 'newValue') // 改变属性 foo.bar的值
    portal.global.get('foo') // 获取属性foo 的值
    portal.global.get('foo.bar') // 获取属性bar 的值 
    portal.global.subscribe('foo', callback) // 监听foo属性的改变
    portal.global.subscribe('foo.bar', callback) // 监听bar属性的改变
    portal.global.unsubscribe('foo', callback) // 停止监听 foo 属性的改变
    portal.global.unsubscribe('foo.bar', callback) // 停止监听 bar 属性的改变
   ```
2. 子应用可以在bootstrap生命周期函数中声明自己的跨服务数据项。声明方式类似于：

    ```js
    portal.global.set("form.count",1)
    ```
3. 其他子界面可以在自己的bootstrap生命周期函数中声明要监听跨服务业数据项。声明方式类似于：

    ```js
    portal.global.subscribe("form.count",function(value, path){
        //获取value做相应动作
    });
    ```

### <a name="如何链接跳转">如何链接跳转</a>
1. 子应用里的链接要设置属性`target="_blank"`，使页面在新窗口打开。
2. 集成页面的js会遍历没有设置属性为`target="_blank"`的链接，并禁止这些链接在当前窗口打开。
