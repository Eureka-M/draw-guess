<template>
    <div>
        <div v-if="showGameBefore">轮到{{drawer.name}}进行画画</div>
        <div v-if="showCanvas">猜词
            <Canvas id="myCanvas" ref="myCanvas" width="700" height="380"></Canvas>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        status: {
            default: 'over',
            type: String
        }
    },
    data () {
        return {
            showGameBefore: false,
            showCanvas: false,
            showAnswer: false,
            gameBeginTimer: null,
            gameTimer: null,
            gameOverTimer: null,
            canvas: '',
            ctx: '',
            draw: {},
            isDraw: 1
        }
    },
    watch: {
        status (val) {
            console.log(val)
        },
        gameStatus (val) {
            if (val == 'begin') {
                this.init()
            }
        },
        showCanvas (val) {
            if (val) {
                this.$nextTick(() => {
                    this.canvas = this.$refs.myCanvas
                    this.ctx = this.canvas.getContext('2d')
                    this.ctx.strokeStyle = "#000";
                })
            }
        },
        drawMsg (val) {
            if (val.type == "draw" || val.type =="stop") {
				if (this.isDraw == 1 && val.type !="stop") {
					this.ctx.beginPath()
					this.ctx.moveTo(val.beginX, val.beginY)
					this.isDraw = 0
				} else if (this.isDraw == 0 && val.type =='stop') {
					this.isDraw = 1
				}
				this.ctx.lineTo(val.endX, val.endY)
				this.ctx.stroke()

			} else if (val.type == 'drawLine') {
                this.ctx.beginPath()
				this.ctx.moveTo(val.beginX, val.beginY)
                this.ctx.lineTo(val.endX, val.endY)
                this.ctx.stroke()
            } else if (val.type == 'drawRect') {
                this.ctx.beginPath()
				this.ctx.moveTo(val.beginX, val.beginY)
                this.ctx.rect(val.beginX, val.beginY, val.rectWidth, val.rectHeight)
                this.ctx.fill()
			    this.ctx.stroke()
            } else if (val.type == 'drawRound') {
                this.ctx.beginPath()
                this.ctx.arc(val.beginX + val.roundWidth / 2, val.beginY + val.roundHeight / 2, Math.sqrt(val.roundWidth * val.roundWidth + val.roundHeight * val.roundHeight) / 2, 0, Math.PI * 2)
                this.ctx.fill()
                this.ctx.stroke()
            }
            else if (val.type == 'clear'){
				this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			}
        },
        drawColor (val) {
            if (this.canvas) {
                this.ctx.strokeStyle = val;
                this.ctx.fillStyle = val;
            }
        }
    },
    computed: {
        guessWord () {
            return this.$store.state.guessWord
        },
        drawer () {
            return this.$store.state.drawer
        },
        gameStatus () {
            return this.$store.state.gameStatus
        },
        drawMsg () {
            return this.$store.state.draw
        },
        drawColor () {
            return this.$store.state.color
        }
    },
    created () {
        console.log('created')
        this.$forceUpdate();
        this.init()
    },
    methods: {
        init() { 
            if (this.$store.state.gameStatus == 'begin') {
                console.log('new game begin')
                let that = this
                
                that.showGameBefore = true
                
                that.gameBeginTimer = window.setTimeout(() => {
                    console.log('10s后执行')

                    that.showGameBefore = false
                    that.showCanvas = true

                    window.clearTimeout(that.gameBeginTimer)
                    
                    that.gameTimer = window.setTimeout(() => {
                        console.log('1min后执行')
                        
                        that.showCanvas = false
                        that.showAnswer = true

                        window.clearTimeout(that.gameTimer)

                        that.gameOverTimer = window.setTimeout(() => {
                            console.log('10s后执行')

                            that.showAnswer = false

                            window.clearTimeout(that.gameOverTimer)

                        }, 10 * 1000)

                    }, 60 * 1000)

                }, 10 * 1000)
            
            }
        }
            
    }
}
</script>

<style lang="less" scoped>

</style>