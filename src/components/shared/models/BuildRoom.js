/**
 * BuildRoom model
 */
class BuildRoom {
    constructor(data = {}) {

        this.roomId = null;
        this.creationTime = null;
        this.timeDifference = null;
        Object.assign(this, data);
    }
}
export default BuildRoom;
