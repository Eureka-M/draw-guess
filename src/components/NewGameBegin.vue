<template>
    <div class="begin-wrapper">
        <!-- 画图端 -->
        <DrawCanvas v-if="drawer.name == user.name && gameStatus == 'begin'" class="drawer-panel"/>
        <GuessCanvas v-else :status="gameStatus"/>
		<div v-if="showAnswer">正确答案是：{{guessWord}}</div>
        <!-- 猜图端 -->
        <my-progress @progressEnd="progressEnd"/>
    </div>
</template>

<script>
import { sleep } from '../utils/sleep'
export default {
    props: {
    },
    computed: {
        drawer () {
            return this.$store.state.drawer
        },
        user () {
            return this.$store.state.user
        },
        gameStatus () {
			if (this.$store.state.gameStatus == 'over') {
				this.showAnswer = true
			} else {
				this.showAnswer = false
                this.init()
			}
            return this.$store.state.gameStatus
        },
        guessWord () {
            return this.$store.state.guessWord
        },
        userList () {
            return this.$store.state.userList
        }
    },
    components: {
        MyProgress: () => import('./MyProgress'),
        DrawCanvas: () => import('./DrawCanvas'),
        GuessCanvas: () => import('./GuessCanvas')
    },
    data () {
        return {
            showProgress: false,
            ws: this.$store.state.ws,
			showAnswer: false,
            seconds: 0
        }
    },
    watch: {
        
    },
    mounted () {
        this.init()
    },
    methods: {
        init() {
            if (this.$store.state.gameStatus == 'begin') {
                console.log('new game begin')
                let that = this
                async function play() {
                    that.ws.send(JSON.stringify({type: 'countDown', duration: 10}))
                    await sleep(10)
                    
                    that.ws.send(JSON.stringify({type: 'countDown', duration: 60}))
                    await sleep(60)

                    that.ws.send(JSON.stringify({type: 'countDown', duration: 15}))
                    await sleep(15)
                }
                play()
            }
        },
        progressEnd () {
            this.showProgress = false
        }
    }
}
</script>

<style lang="less" scoped>

</style>