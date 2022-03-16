<template>
    <div class="progress-wrapper">
        <Progress :percent="percent" :stroke-width="10" hide-info :stroke-color="progressColor"/>
    </div>
</template>

<script>
var GAME_BEFORE_TIMER_LENGTH = 10;
var GAME_TIMER_LENGTH = 60;
var GAME_AFTER_TIMER_LENGTH = 10;

export default {
    data () {
        return {
            percent: 100,
            isStart: false,
            gameBeforeTimer: null,
            gameTimer: null,
            countDownTimer: null,
            GAME_BEFORE_TIMER_LENGTH: GAME_BEFORE_TIMER_LENGTH,
            GAME_TIMER_LENGTH: GAME_TIMER_LENGTH,
            GAME_AFTER_TIMER_LENGTH: GAME_AFTER_TIMER_LENGTH
        }
    },
    watch: {
        countDownDuration(val) {
            this.countDownTimer = null
            this.countDown(val)
        }
    },
    computed: {
        progressColor () {
            if (this.percent < 10) {
                return '#CD5C5C'
            } else if (this.percent < 70) {
                return '#FFD700'
            } else if (this.percent < 100) {
                return '#00C342'
            }
        },
        countDownDuration () {
            return this.$store.state.countDownDuration
        }
    },
    mounted() {
        this.init()
    },
    onBeforeUnload() {
        this.countDownTimer = null
    },
    methods: {
        init() {
            if (this.$store.state.gameStatus == 'begin') {
                this.countDown(this.countDownDuration)
            }
        },
        countDown (seconds) {
            let that = this
            this.countDownTimer = setTimeout(() => {
                if (seconds > 0) {
                    --seconds
                    console.log('秒', seconds)
                    that.percent = (seconds / that.countDownDuration) * 100
                    console.log('进度条', that.percent)
                    that.countDown(seconds)
                } else {
                    that.$emit('progressEnd')
                    this.countDownTimer = null
                }
            }, 1000)
        },
    }
}
</script>

<style lang="less" scoped>
    .progress-wrapper {
        position: absolute;
        width: 680px;
        margin-left: 10px;
        margin-bottom: 6px;
        left: 0;
        bottom: 0;
    }
</style>