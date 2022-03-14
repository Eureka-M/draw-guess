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
            GAME_BEFORE_TIMER_LENGTH: GAME_BEFORE_TIMER_LENGTH,
            GAME_TIMER_LENGTH: GAME_TIMER_LENGTH,
            GAME_AFTER_TIMER_LENGTH: GAME_AFTER_TIMER_LENGTH
        }
    },
    props: {
        seconds: {
            type: Number,
            default: 0,
            require: true
        }
    },
    watch: {
        seconds (val) {
            console.log(watch)
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
    },
    mounted() {
        this.countDown(this.seconds)
    },
    methods: {
        countDown (seconds) {
            setTimeout(() => {
                if (seconds > 1) {
                    --seconds
                    this.percent = seconds / this.seconds
                    this.countDown(seconds)
                } else {
                    this.$emit('progressEnd')
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