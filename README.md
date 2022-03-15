> # draw-guess

一个你画我猜的小游戏，主要用到的技术栈是: vue webSocket canvas

规则以及 UI 来源于网站: https://gartic.io/

项目运行：

```javascript
git clone https://github.com/tomato126/draw-guess.git
cd draw-guess
npm i
npm run dev
```

</br>

> #### 项目结构

```javascript
├─config
├─build
├─src
|  ├─App.vue
|  ├─main.js
|  ├─views
|  |   ├─Home.vue
|  |   └Login.vue
|  ├─utils
|  |   ├─guessWords.js
|  |   └whoIsNextDrawer.js
|  ├─store
|  |   └store.js
|  ├─router
|  |   └index.js
|  ├─components
|  |     ├─Chat.vue 聊天组件
|  |     ├─DrawArea.vue
|  |     ├─DrawCanvas.vue 画图端
|  |     ├─GuessCanvas.vue 猜图端
|  |     ├─MyProgress.vue 进度条
|  |     ├─NewGameBegin.vue
|  |     ├─Paint.vue 画笔
|  |     └PlayerList.vue 玩家列表
|  ├─assets 一些静态资源
├─app.js 服务器
├─index.html
├─package-lock.json
├─package.json
├─README.md

```

</br>

> #### 学到了什么？

- ** vuex ** 在实习之前就学过 vuex，但是了解不深，之后实习因为并不需要将数据存入的 store 中，差不多忘了，通过这次项目连续，重新复习了 vuex，也了解得更加深刻。
- ** canvas ** 学习了 canvas 基础的 api, 简单的画图操作基本上都能完成，附加
  [canvas 学习链接](https://malun666.github.io/aicoder_vip_doc/#/pages/canvas)
- ** websocket ** 学习了 websocket 的是如何使用的，以及 websocket 协议的基本知识

</br>

> #### 项目还不完善的地方

- 词库优化（选出的词做一次优化）
- 随机选择两个词语，可以让画家进行选择
- 限制玩家人数
- 限制一轮游戏局数
- 进度条展示
- 记分
- 画笔锯齿显示优化
- 工具优化

</br>

> #### 心得

虽然游戏的体验还是有点难受，但是总归，能够推动自己在工作之余还能学习一些新知识。项目还不完善的地方需要后期优化。希望自己能够不断前行吧~

</br>

> #### 后期优化记录（留坑慢慢填~）

- 2022-03-10 刷新页面不直接退出登录，弹出阻止弹框
  监听 onbeforeunload 弹出阻止弹窗
  监听 onunload 页面关闭之前发出 disConnect 信令

- 2022-03-14 解决代码中的回调地狱
  /utils/sleep.js sleep 函数
  async await promise 解决回调地狱

- 2022-03-14 新增进度条（遗留一个小问题）
  原本思路：根据 gameStatus 的状态等待改变: sleep(10) -> 进度条 10 秒 -> sleep(60) -> 进度条 60 秒...
  问题：在一轮一轮的游戏之后, sleep 每个端的不同影响（比如画笔端画图）导致进度条的不同步
  改进：sleep 之后发送 countDown 信令，各端每局游戏都能收到三次 countDown 的信令，收到信令立马改变进度条。保证各端基本同步的状态。
  遗留问题：一轮游戏之后 sleep10 秒接着就是一轮开始 sleep10 秒，出现的问题是 duration 相同，导致 store 不会触发更新，暂时解决将一轮游戏之后的 sleep 时间改成 15 秒。
