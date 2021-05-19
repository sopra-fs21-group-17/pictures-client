/**
 * BuildRoom model
 */
class BuildRoom {
    constructor(data = {}) {

        this.roomId = null;
        this.creationTime = null;
        this.timeDifference = null;
        this.creationTimeGuessing = null;
        this.timeDifferenceGuessing = null;
        Object.assign(this, data);
    }
}
export default BuildRoom;
