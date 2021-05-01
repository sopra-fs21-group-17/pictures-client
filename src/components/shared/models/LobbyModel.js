/**
 * Lobby model
 */
class LobbyModel {
    constructor(data = {}) {
        this.usersList = {};
        this.lobbyId = null;
        this.crationTime = null;
        this.timeDifference = null;
        this.playersCount= null;
        this.lobbyReady = null;
        Object.assign(this, data);
    }
}
export default LobbyModel;
