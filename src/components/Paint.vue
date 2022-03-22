<template>
    <div class="paint-wrapper">
        <div class="paint">
            <div class="tool">
                <div class="tool-item" 
                    v-for="(item, index) in tools" 
                    :key="index" 
                    :class="[`icon-${item.toolName}`, {'tool-active': toolIndex==index}]"
                    @click="handleTools(index)"
                    >
                </div>
            </div>
            <div class="color">
                <div class="color-item" 
                    v-for="(item, index) in colors" 
                    :key="index" 
                    :class="{'color-active': colorIndex==index}"
                    @click="handleColors(index)">
                </div>
            </div>
            <div class="paint-width">
                <Slider v-model="paintWidth" style="margin-top: 25px;" @on-change="changeWidth"></Slider>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            tools: [
                {"toolName": "brush"},
                {"toolName": "eraser"},
                {"toolName": "square"},
                {"toolName": "border"},
                {"toolName": "circle"},
                {"toolName": "radius"},
                {"toolName": "line"},
                {"toolName": ""}
            ],
            colors: new Array(12),
            toolIndex: 0,
            colorIndex: 0,
            paintWidth: 25,
            colors: ['#000', '#fff', '#1E90FF', '#008B00', '#FFD700', '#CD5555', '#836FFF', '#FFBBFF', '#BCD2EE', '#90EE90', '#f4631a', '#778899'],
            ws: this.$store.state.ws
        }
    },
    methods: {
        handleTools (index) {
            this.toolIndex = index
            let tool = this.tools[index].toolName
            this.ws.send(JSON.stringify({type: 'changeTools', tool: tool}))
        },
        handleColors (index) {
            this.colorIndex = index
            let color = this.colors[index]
            //
            this.ws.send(JSON.stringify({type: 'changeColor', color: color}))
        },
        changeWidth () {
            this.$store.commit('changePaintWidth', this.paintWidth)
        }

    }
}
</script>

<style lang="less" scoped>
    .paint-wrapper {
        width: 120px;
        height: 400px;
        background: rgba(0, 0, 0, 0.3);
        margin-left: 10px;
        border-radius: 6px;

        .paint {
            width: 100%;
            height: 100%;
            padding: 15px;

            .tool {
                margin-bottom: 30px;
                .tool-item {
                    width: 32px;
                    height: 32px;
                    display: inline-block;
                    margin-bottom: 5px;
                    &:hover {
                        cursor: pointer;
                    }
                }

                .icon-brush {
                    background: url(../assets/brush.png);
                    background-size: 100% 100%;
                    
                    &:active, &.tool-active {
                        background: url(../assets/brush-active.png);
                        background-size: 100% 100%;
                    }
                }
                .icon-eraser {
                    background: url(../assets/eraser.png);
                    background-size: 100% 100%;

                    &:active, &.tool-active {
                        background: url(../assets/eraser-active.png);
                        background-size: 100% 100%;
                    }
                }
                .icon-square {
                    background: url(../assets/square.png);
                    background-size: 100% 100%;

                    &:active, &.tool-active {
                        background: url(../assets/square-active.png);
                        background-size: 100% 100%;
                    }
                }
                .icon-border {
                    background: url(../assets/border.png);
                    background-size: 100% 100%;

                    &:active, &.tool-active {
                        background: url(../assets/border-active.png);
                        background-size: 100% 100%;
                    }
                }
                .icon-circle {
                    background: url(../assets/circle.png);
                    background-size: 100% 100%;

                    &:active, &.tool-active {
                        background: url(../assets/circle-active.png);
                        background-size: 100% 100%;
                    }
                }
                .icon-radius {
                    background: url(../assets/radius.png);
                    background-size: 100% 100%;

                    &:active, &.tool-active {
                        background: url(../assets/radius-active.png);
                        background-size: 100% 100%;
                    }
                }
                .icon-line {
                    background: url(../assets/line.png);
                    background-size: 100% 100%;

                    &:active, &.tool-active {
                        background: url(../assets/line-active.png);
                        background-size: 100% 100%;
                    }
                }
                .icon-arc {
                    background: url(../assets/arc.png);
                    background-size: 100% 100%;

                    &:active, &.tool-active {
                        background: url(../assets/arc-active.png);
                        background-size: 100% 100%;
                    }
                }

                .tool-item:nth-child(odd) {
                    margin-right: 10px;
                }
               
            }

            .color {
                .color-item {
                    width: 24px;
                    height: 24px;
                    display: inline-block;
                    margin-right: 4px;

                    &.color-active {
                        border: 1px solid #FFFF00;
                    }

                    &:nth-child(1) {
                        background: #000;
                    }
                    &:nth-child(2) {
                        background: #fff;
                    }
                    &:nth-child(3) {
                        background: #1E90FF;
                    }
                    &:nth-child(4) {
                        background: #008B00;
                    }
                    &:nth-child(5) {
                        background: #FFD700;
                    }
                    &:nth-child(6) {
                        background: #CD5555;
                    }
                    &:nth-child(7) {
                        background: #836FFF;
                    }
                    &:nth-child(8) {
                        background: #FFBBFF;
                    }
                    &:nth-child(9) {
                        background: #BCD2EE;
                    }
                    &:nth-child(10) {
                        background: #90EE90;
                    }
                    &:nth-child(11) {
                        background: #f4631a;
                    }
                    &:nth-child(12) {
                        background: #778899;
                    }
                }
            }
        }
    }
</style>