
import Vue from 'vue'
import Vuex from 'vuex'

//1.安装插件
Vue.use(Vuex)

//2.创建Store对象
const store = new Vuex.Store({
    state: {
        //count: 0
        ws: null,
        chatMsgList: [],
        user: {}, //用户
        userList: [],
        drawer: {},
        gameStatus: 'over',
        guessWord: '',

        gameStart: false, //这个变量来表示第一次的点击开始游戏
        tool: 'brush',
        color: '#000',
        paintWidth: 25,

        draw: {},
        countDownDuration: 0
    },
    // getters 可以认为是store的计算属性，
    //getter的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了变化才会被重新计算
    // store.getters.chatList
    getters: {
        chatList (state) {
            return state.chatMsgList.filter(msg => msg.msgType == 'chat')
        },
        answerList (state) {
            return state.chatMsgList.filter(msg => msg.msgType == 'answer')
        },
        houseOwner (state) {
            if (state.userList.length) {
                return state.userList[0]
            }
        }
    },
    //更改store中状态的唯一方法是提交mutations, 想要唤醒一个mutation handle, 你需要以相应的type调用为store.commit
    // 如果想向store.commit传入额外的参数  store.commit('increment', 10)
    // mutations 都是同步事务
    mutations: {
        // increment (state) {
        //     state.count++
        // }  
        // increment (state, n) {
        //     state.count += n
        // } 
        connentWs (state, ws) {
            state.ws = ws
        },
        chatMsg (state, msg) {
            state.chatMsgList.push(msg)
        },
        user (state, msg) {
            state.user = msg
        },
        userList (state, msg) {
            state.userList = msg
        },
        gameBegin (state, msg) {
            state.drawer = msg.drawer
            state.gameStatus = msg.status
            state.guessWord = msg.guessWord
        },
        gameOver (state, msg) {
            state.gameStatus = msg.status
        },
        gameFirstStart (state, msg) {
            state.gameStart = true
        },
        changeTool (state, msg) {
            state.tool = msg
        },
        changeColor (state, msg) {
            state.color = msg
        },
        changePaintWidth (state, msg) {
            state.paintWidth = msg
        },
        draw (state, msg) {
            state.draw = msg
        },
        countDown (state, msg) {
            state.countDownDuration = msg
        }
    },
    // action类似于 mutation, 
    //Action 提交的是 mutation，而不是直接变更状态。
    //Action 可以包含任意异步操作。
    //Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象
    //可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。
    actions: {
        // increment (context) {
        //     context.commit('increment')
        // }
    },
})

//3.挂载到Vue实例上
export default store