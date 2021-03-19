> # draw-guess

一个你画我猜的小游戏，主要用到的技术栈是: vue webSocket canvas 

UI风格来源于网站: 

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


- ** vuex ** 在实习之前就学过vuex，但是了解不深，之后实习因为并不需要将数据存入的store中，差不多忘了，通过这次项目连续，重新复习了vuex，也了解得更加深刻。
- ** canvas ** 学习了canvas基础的api, 简单的画图操作基本上都能完成，附加
[canvas学习链接](https://malun666.github.io/aicoder_vip_doc/#/pages/canvas)
- ** websocket ** 学习了websocket的是如何使用的，以及websocket协议的基本知识  

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





