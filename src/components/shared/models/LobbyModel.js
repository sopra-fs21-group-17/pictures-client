/**
 * Lobby model
 */
class LobbyModel {
    constructor(data = {}) {
        this.usersList = {};
        this.lobbyId = null;
        this.creationTime = null;
        this.timeDifference = null;
        this.playersCount= null;
        this.lobbyReady = null;
        this.lobbyReadyBuildScreen = null;
        Object.assign(this, data);
    }
}
export default LobbyModel;
