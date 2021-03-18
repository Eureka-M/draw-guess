<template>
    <div class="draw-area-wrapper">
        <div v-if="userList.length == 1">
            <div class="wait-begin">
                <span class="wait-png"></span>
                <span>等待更多玩家加入房间...</span>
            </div>
        </div>
        <div v-if="houseOwnerIsMe && userList.length > 1 && !gameStart" class="begin-game-wrapper">
            <div class="begin-game">
                <span class="begin-png"></span>
                <Button @click="gameBegin">开始游戏</Button>
            </div>
        </div>
        <div v-if="!houseOwnerIsMe && !gameStart">
            <div class="wait-begin">
                <span class="wait-png"></span>
                <span>等待房主开始游戏</span>
            </div>
            
        </div>
        <NewGameBegin v-if="showNewGameBegin"/>
    </div>
</template>

<script>
import generateWord from '../utils/guessWords'

export default {
    components: {
        NewGameBegin: () => import('./NewGameBegin')
    },
    data () {
        return {
            showNewGameBegin: false,
            enableStart: false,
            ws: this.$store.state.ws,
        }
    },
    computed: {
        userList () {
            return this.$store.state.userList
        },
        houseOwner () {
            return this.$store.getters.houseOwner
        },
        houseOwnerIsMe () {
            return this.houseOwner.name == this.$store.state.user.name
        },
        gameStatus () {
            return this.$store.state.gameStatus
        },
        gameStart () {
            if (this.$store.state.gameStart) {
                this.showNewGameBegin = true
            }
            return this.$store.state.gameStart
        }
    },
    watch: {
        userList (val) {
            if (val.length == 1) {
                this.showNewGameBegin = false

                // 发送一个游戏over的信令，游戏只剩下一个人时改变游戏的状态
                this.ws.send(JSON.stringify({type: 'gameOver'}))
            } 
        }
    },
    methods: {
        gameBegin () {
            // 本机用户
            let localUser = this.$store.state.user
            let word = generateWord()
            this.ws.send(JSON.stringify({type: 'gameFirstStart'}))
            this.ws.send(JSON.stringify({type: 'gameBegin', drawer: localUser, guessWord: word, position: 'DrawArea'}))

            // 游戏开始界面
            //this.showNewGameBegin = true
        },
        progressEnd () {
            
        }
    }
}
</script>

<style lang="less" scoped>
    .draw-area-wrapper {
        width: 700px;
        height: 400px;
        background: #fff;
        border-radius: 6px;
        margin-left: 10px;
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;

        .begin-game-wrapper {
            .begin-game {
                .begin-png {
                    width: 232px;
                    height: 150px;
                    background: url(../assets/game-begin.jpg);
                    display: block;
                    background-size: cover;
                }
            } 
        }

        .wait-begin {
            .wait-png {
                width: 178px;
                height: 150px;
                background: url(../assets/wait.jpg);
                display: block;
                background-size: cover;
            }
        }
    }
</style>