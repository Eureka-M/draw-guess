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
			
			switch (msg.type) {
				case 'loginRes':
					this.$store.commit('userList', msg.userList)
					break;
				case 'chat':
					this.$store.commit('chatMsg', msg)
					break;
				case 'gameFirstStart':
					this.$store.commit('gameFirstStart')
					break;
				case 'gameBegin':
					this.$store.commit('gameBegin', {status: 'begin', drawer: msg.drawer, guessWord: msg.guessWord})
					break;
				case 'gameOver':
					this.$store.commit('gameOver', {status: 'over'})
					break;
				case 'gameOver':
					this.$store.commit('gameOver', {status: 'over'})
					break;
				case 'draw' || 'stop' || 'drawLine' || 'drawRect' || 'drawRect' || 'drawRound' || 'clear' || 'drawBorder' || 'drawRadius':
					this.$store.commit('gameOver', {status: 'over'})
					break;
				case 'changeTools':
					this.$store.commit('changeTool', msg.tool)
					break;
				case 'changeColor':
					this.$store.commit('changeColor', msg.color)
					break;
				case 'countDown':
					this.$store.commit('countDown', msg.duration)
					break;
				default:
					break;
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
