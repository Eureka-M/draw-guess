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
    computed: {
        gameStatus () {
            return this.$store.state.gameStatus
        }
    },
    watch: {
        gameStatus (val) {
            if (val == 'begin') {
                this.initProgress()
            }
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
        }
    },
    created() {
        this.initProgress ()
    },
    methods: {
        initProgress () {
            if (this.$store.state.gameStatus == 'begin') {
                let that = this
                // 新游戏前计时器
                this.GAME_BEFORE_TIMER_LENGTH = 10
                this.GAME_TIMER_LENGTH = 60
                this.GAME_AFTER_TIMER_LENGTH = 10
                this.percent = 100
                
                that.gameBeforeTimer = setInterval(() => {
                    that.GAME_BEFORE_TIMER_LENGTH = that.GAME_BEFORE_TIMER_LENGTH - 0.1
                    that.percent = that.GAME_BEFORE_TIMER_LENGTH / 10 * 100
                    
                    if (that.percent < 0) {
                        clearInterval(that.gameBeforeTimer)
                        
                        // 游戏中计时器
                        
                        that.gameTimer = setInterval(() => {
                            that.GAME_TIMER_LENGTH = that.GAME_TIMER_LENGTH - 0.1
                            that.percent = that.GAME_TIMER_LENGTH / 60 * 100

                            if (that.percent < 0) {
                                //游戏后计时器
                                clearInterval(that.gameTimer)

                                
                                that.gameAfter = setInterval(() => {

                                    that.GAME_AFTER_TIMER_LENGTH = that.GAME_AFTER_TIMER_LENGTH - 0.1
                                    that.percent = that.GAME_AFTER_TIMER_LENGTH / 10 * 100

                                    if (that.percent < 0) {
                                        clearInterval(that.gameAfter)
                                        //that.$emit('progressEnd')
                                        
                                    }

                                }, 100)
                            }
                        }, 100)
                    }
                }, 100)
            }
        }
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