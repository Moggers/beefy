import "babel-polyfill";
export default class Beefy {
    // The constructor shall initialize the board to 5x5, and set the onboard property to false
    constructor() {
        this.boardwidth = 5;
        this.boardheight = 5;
        this.onboard = 0;
    }

    // bearingToString retrieves the bearing as a cardinal direction.
    // If the robot is not on the board yet it fails and returns -1
    // Otherwise it returns a string containing one of north, south, east, or west
    bearingToString() {
        if( this.onboard == 0 ) {
            return -1;
        }
        switch(this.bearing) {
            case 0:
                return "north";
            case 1:
                return "east";
            case 2:
                return "south";
            case 3:
                return "west";
        }
    }
    // Bearing sets the bearing of the robot based on one of four strings
    // If beefy is not on the board it fails and returns -1
    // Otherwise it returns 0
    setBearing(str) {
        if( this.onboard == 0 ) {
            return -1;
        }
        switch(str){
        case "north":
            this.bearing = 0;
            return 0;
        case "east":
            this.bearing = 1;
            return 0;
        case "south":
            this.bearing = 2;
            return 0;
        case "west":
            this.bearing = 3;
            return 0;
        }
    }

    // Place shall set the onboard flag and mark his position
    // If x or y are outside legal boundaries it shall fail and return 1
    // Otherwise it returns 0
    place( x,y,b ) {
        if( 0 <= x && x < this.boardwidth) {
            if( 0 <= y && y < this.boardheight) {
                this.x = x;
                this.y = y;
                this.onboard = 1;
                this.setBearing(b)
                return 0;
            }
        }
        return 1;
    }

    // Move tells beefy to move forward relative to its bearing
    // If beefy is not on the board it fails and returns -1
    // If the move were to push beefy off the board it fails and returns 1
    // Otherwie, it returns 0
    move(){
        if( this.onboard == 0 ) {
            return -1;
        }
        let nx = this.x;
        let ny = this.y;
        switch(this.bearing) {
        case 0:
            ny++;
            break;
        case 1:
            nx++;
            break;
        case 2:
            ny--;
            break;
        case 3:
            nx--;
            break;
        }
        if( 0 <= nx && nx < this.boardheight){
            if( 0 <= ny && ny < this.boardheight ) {
                this.x = nx;
                this.y = ny;
                return 0;
            }
        }
        return 1;
    }
    
    // Left turns beefy 90 degrees (one quartercircle) anti-clockwise.
    // If beefy is not on the board it fails and returns -1
    // Otherwise it returns 0
    left() {
        if( this.onboard == 1 ) {
            this.bearing = (this.bearing+3)%4;
            return 0;
        } else {
            return -1;
        }
    }

    // Right turns beefy 90 degrees (one quartercircle) clockwise
    // If beefy is not on the board it fails and returns -1
    // Otherwise it returns 0
    right() {
        if( this.onboard == 1 ) {
            this.bearing = (this.bearing+1)%4;
            return 0;
        } else {
            return -1;
        }
    }
    
    // Report retrieves a string containing beefy's current position and bearing
    // If beefy is not on the board it returns -1
    // Otherwise it returns a string containing beefy's status
    get report() {
        if(this.onboard == 1 ) {
            return "X: " + this.x + " Y: " + this.y + " Bearing: " + this.bearingToString();
        }
        else {
            return -1;
        }
    }

    // handleCommand takes a string representing and returns a string as a response
    handleCommand(str) {
        if( typeof(str) == 'undefined') {
            return "Nonexistant command string"
        } if( str == "" ) {
            return "Empty command string"
        }
        let strarr = str.split(" ")
        let rval = 0
        switch(strarr[0]){
        case "PLACE":
            let re = new RegExp("PLACE ([0-4])( |,)([0-4])( |,)(north|east|south|west)")
            let ret = str.search(re)
            if( ret == -1) {
                return "PLACE syntax is '/^PLACE [0-4](,| )[0-4](,| )(north|west|south|east)$/ e.g. PLACE 1 1 north"
            }
            let arr = re.exec(str)
            rval = this.place(arr[1], arr[3], arr[5])
            switch(rval) {
                case 1:
                    return "Tried to place outside of boundaries"
                case 0:
                    return "Successfully placed beefy"
                default:
                    return "CRITFAIL: Unknown status code from this.place"
            } 
        case "MOVE":
            rval = this.move()
            switch(rval) {
            case 1:
                return "Tried to drive beefy off the edge of the table"
            case -1:
                return "Beefy can't drive if he's not on the table yet"
            case 0:
                return "Beefy went for a drive"
            default:
                return "CRITFAIL: Unknown status code from this.move " + rval
            }
        case "LEFT":
            rval = this.left()
            switch(rval) {
            case -1:
                return "Beefy can't turn if he's not on the table yet"
            case 0:
                return "Turned beefy left"
            default:
                return "CRITFAIL: Unknown status code from this.left"
            }
        case "RIGHT":
            rval = this.right()
            switch(rval) {
            case -1:
                return "Beefy can't turn if he's not on the table yet"
            case 0:
                return "Turned beefy right"
            default:
                return "CRITFAIL: Unknown status code from this.right"
            }
        case "REPORT":
            rval = this.report
            switch(rval) {
            case -1:
                return "Beefy can't give a report if he's not on the table yet"
            default:
                return rval;
            }
        default:
            return "Unrecognized opcode, your options are PLACE, MOVE, LEFT, RIGHT, and REPORT. Check the docs for their syntax"
        }

    }
}