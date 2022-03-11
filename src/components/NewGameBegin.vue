<template>
    <div class="begin-wrapper">
        <!-- 画图端 -->
        <DrawCanvas v-if="drawer.name == user.name && gameStatus == 'begin'" class="drawer-panel"/>
        <GuessCanvas v-else :status="gameStatus"/>
		<div v-if="showAnswer">正确答案是：{{guessWord}}</div>
        <!-- 猜图端 -->
        <my-progress v-if="showProgress" :seconds="100" @progressEnd="progressEnd"/>
    </div>
</template>

<script>

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
				this.showProgress = true
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
			showAnswer: false
        }
    },
    watch: {
    },
    mounted () {
        this.showProgress = true
    },
    methods: {
        progressEnd () {
            this.showProgress = false
        }
    }
}
</script>

<style lang="less" scoped>

</style>