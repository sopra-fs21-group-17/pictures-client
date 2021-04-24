/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.name = null;
    this.username = null;
    this.token = null;
    this.status = null;
    this.set = null;          // assigned set for that round
    this.coordinates = null;  // assigned coordinates for that round
    Object.assign(this, data);
  }
}
export default User;
