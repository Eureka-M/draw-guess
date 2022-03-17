<template>
    <div>
        <div v-if="showGameBefore">轮到{{drawer.name}}进行画画</div>
        <div v-if="showCanvas">猜词
            <Canvas id="myCanvas" ref="myCanvas" width="700" height="380"></Canvas>
        </div>
    </div>
</template>

<script>
import { sleep } from '../utils/sleep'

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
            isDraw: 1,
            points: [],
            pathBeginX: null,
            pathBeginY: null,
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
                    this.ctx.lineWidth = 1.5
                    this.ctx.lineJoin = this.ctx.lineCap = 'round'
                    this.ctx.shadowBlur = 1.5
                    this.ctx.shadowColor = 'rgb(0, 0, 0)'
                })
            }
        },
        drawMsg (val) {
            if (val.type == "draw" || val.type =="stop") {
                if (val.type !="stop") {
                    this.points.push({ x: val.beginX, y: val.beginY })
                    this.points.push({ x: val.endX, y: val.endY })
                }
                if (this.isDraw == 1 && val.type !="stop") {
				
					
                  
                    this.ctx.beginPath()
                    this.ctx.moveTo(val.beginX, val.beginY)
                    
                    this.pathBeginX = val.beginX
                    this.pathBeginY = val.beginY
                   

                    
                    this.isDraw = 0
                } else if (this.isDraw == 0 && val.type =="stop") {
                    this.ctx.beginPath()
                    this.ctx.moveTo(val.beginX, val.beginY)
                    this.isDraw = 1
                }

                if (this.points.length > 3) {
                    const lastTwoPoints = this.points.slice(-2)
                    const controlPoint = lastTwoPoints[0]
                    const endPoint = {
                        x: (lastTwoPoints[0].x + lastTwoPoints[1].x) / 2,
                        y: (lastTwoPoints[0].y + lastTwoPoints[1].y) / 2,
                    }
                    
                    this.ctx.beginPath()
		            this.ctx.moveTo(this.pathBeginX, this.pathBeginY)
                    this.ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, endPoint.x, endPoint.y)

                    this.pathBeginX = endPoint.x
                    this.pathBeginY = endPoint.y

                       
                    }
                this.ctx.stroke()
				//this.ctx.lineTo(val.endX, val.endY)
                
				

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
            } else if (val.type == 'drawRadius') {
                this.ctx.beginPath()
                this.ctx.arc(val.beginX + val.roundWidth / 2, val.beginY + val.roundHeight / 2, Math.sqrt(val.roundWidth * val.roundWidth + val.roundHeight * val.roundHeight) / 2, 0, Math.PI * 2)
                this.ctx.stroke()
            } else if (val.type == 'drawBorder') {
                this.ctx.beginPath()
				this.ctx.moveTo(val.beginX, val.beginY)
                this.ctx.rect(val.beginX, val.beginY, val.rectWidth, val.rectHeight)
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
                async function play() {
                    that.showGameBefore = true

                    await sleep(10)
                    that.showGameBefore = false
                    that.showCanvas = true

                    await sleep(60)
                    that.showCanvas = false
                    that.showAnswer = true

                    await sleep(15)
                    that.showAnswer = false
                }

                play()
            }
        },
        
            
    }
}
</script>

<style lang="less" scoped>

</style>