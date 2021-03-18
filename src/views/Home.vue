<template>
    <div class="home-wrapper">
        <PlayerList />
		<div class="main-content">
			<div class="draw-place">
				<Paint v-if="drawer.name == user.name && gameStatus=='begin'"/>
				<DrawArea />
			</div>
			<Chat :class="{chat: (drawer.name == user.name && gameStatus=='begin')}"/>
		</div>
    </div>
</template>

<script>
export default {
    components: {
		Chat: () => import('../components/Chat'),
		DrawArea: () => import('../components/DrawArea'),
		PlayerList: () => import('../components/PlayerList'),
		Paint: () => import('../components/Paint')
	},
	computed: {
		drawer () {
            return this.$store.state.drawer
        },
        user () {
            return this.$store.state.user
        },
		gameStatus () {
			return this.$store.state.gameStatus
		}
	}
}
</script>

<style lang="less" scoped>
    .home-wrapper {
        display: flex;
        margin-top: 10px;

        .main-content {
			//display: flex;

			.draw-place {
				display: flex;

				.transparent {
					opacity: 0;
				}
			}
			.chat {
				margin-left: 140px;
			}
		}
    }
    
</style>