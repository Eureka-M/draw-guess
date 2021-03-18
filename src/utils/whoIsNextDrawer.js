export default function generateDrawer (lastDrawer, playerList) {
    var lastDrawerIndex = playerList.findIndex((item) => item.name == lastDrawer.name)

    var playerCount = playerList.length
    if ((lastDrawerIndex + 1 == playerCount) || (lastDrawerIndex == -1)) {
        return playerList[0]
    } else {
        return playerList[lastDrawerIndex + 1]
    }
}