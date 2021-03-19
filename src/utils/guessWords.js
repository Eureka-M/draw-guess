export default function generateGuessWords () {
    // 随机生成一个词语 暂且就做这样的逻辑，后面可以每一轮把猜过的词语记起来，剔除掉这些词语后再随机选词
    let words = ["口红", "葡萄", "宝宝", "听", "油条", "马桶", "蚊子", "月亮", "银河", "玉米"]
    var random = Math.floor(Math.random()*10); 

    return words[random]


    /**
    取随机数：https://www.cnblogs.com/xiaonian8/p/13744892.html
    Math.ceil(Math.random()*10);     // 获取从 1 到 10 的随机整数，取 0 的概率极小。
    Math.round(Math.random());       // 可均衡获取 0 到 1 的随机整数。
    Math.floor(Math.random()*10);    // 可均衡获取 0 到 9 的随机整数。
    Math.round(Math.random()*10);    // 基本均衡获取 0 到 10 的随机整数，其中获取最小值 0 和最大值 10 的几率少一半。
     */
}