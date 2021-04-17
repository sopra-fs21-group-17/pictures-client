/**
 * User model
 */
class User {
  constructor(data = {}) {
    //this.id = null;
    this.username = null;
    this.password = null;
    this.birthdate = null;
    this.token = null;
    this.guess = null;
    this.model = null;
    this.totalScore = null;
    this.isReady = null;
    //this.status = null;
    Object.assign(this, data);
  }
}
export default User;
