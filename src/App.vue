<template>
  	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
const ws = new WebSocket('ws://172.27.12.198:3000');

export default {
	name: "App",
	data () {
		return {
			answerList: [],
			chatList: []
		}
	},
	mounted () {
		this.$store.commit('connentWs', ws)

		ws.addEventListener('open', this.handleWsOpen.bind(this), false)
		ws.addEventListener('close', this.handleWsClose.bind(this), false)
		ws.addEventListener('error', this.handleWsError.bind(this), false)
		ws.addEventListener('message', this.handleWsMessage.bind(this), false)

		window.onbeforeunload = (event) => {
			let that = this
			console.log(that.$route.name)
			if (that.$route.path !== '/' && that.$route.path !== '/login') {
				let e = event || window.event
				if (e) {
					e.returnValue = '关闭提示'
				}
				return '关闭提示'
			} else {
				window.onbeforeunload = null
			}
		}

		window.onunload = () => {
			let that = this
			if (that.$route.path !== '/' && that.$route.path !== '/login') { 
				ws.send(JSON.stringify({type: 'disConnect', user: that.$store.state.user}))
			}
		}
	},
	methods: {
		handleWsOpen (e) {
			console.log('前端：open' + ' ' + e)
		},
		handleWsClose (e) {
			console.log('前端：close' + ' ' + e)
		},
		handleWsError (e) {
			console.log('前端：error' + ' ' + e)
		},
		handleWsMessage (e) {
			let msg = JSON.parse(e.data)
			console.log(msg)

			//用户登录返回（userList）
			if (msg.type == 'loginRes') {
				this.$store.commit('userList', msg.userList)
			}
			
			// 聊天面板的消息
			if (msg.type == 'chat') {
				this.$store.commit('chatMsg', msg)
			}

			// 游戏开始通知
			if (msg.type == 'gameFirstStart') {
				this.$store.commit('gameFirstStart')
			}

			// 一轮游戏开始通知
			if (msg.type == 'gameBegin') {
				this.$store.commit('gameBegin', {status: 'begin', drawer: msg.drawer, guessWord: msg.guessWord})
			}

			// 一轮游戏结束通知
			if (msg.type == 'gameOver') {
				this.$store.commit('gameOver', {status: 'over'})
			}
			
			// 画画
			if (msg.type == 'draw' || msg.type == 'stop' || msg.type == 'drawLine' || msg.type == 'drawRect' || msg.type == 'drawRound' || msg.type == 'clear' || msg.type == 'drawBorder' || msg.type == 'drawRadius') {
				this.$store.commit('draw', msg)
			}

			// 改变画笔颜色
			if (msg.type == 'changeTools') {
				this.$store.commit('changeTool', msg.tool)
			}

			//改变tool
			if (msg.type == 'changeColor') {
				this.$store.commit('changeColor', msg.color)
			}

			// 倒计时
			if (msg.type == 'countDown') {
				this.$store.commit('countDown', msg.duration)
			}

		},
	}
};
</script>

<style lang="less" scoped>
	#app {
		font-family: "Avenir", Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		background: url('./assets/bg2.png');
		background-size: 100% 100%;
	}
</style>
