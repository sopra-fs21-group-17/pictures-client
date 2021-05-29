/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.username = null;
    this.password = null;
    this.token = null;
    this.guesses = null;
    this.model = null;
    this.totalScore = null;
    this.isReady = null;
    this.assignedSet = null;
    this.assignedCoordinates = null;
    this.correctedGuesses = null;
    this.lobbyId = null;
    this.doneGuessing = null;
    this.isReadyBuildScreen = null;
    Object.assign(this, data);
  }
}
export default User;
