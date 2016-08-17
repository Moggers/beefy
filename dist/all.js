"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require("babel-polyfill");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Beefy = function () {
    // The constructor shall initialize the board to 5x5, and set the onboard property to false
    function Beefy() {
        _classCallCheck(this, Beefy);

        this.boardwidth = 5;
        this.boardheight = 5;
        this.onboard = 0;
    }

    // bearingToString retrieves the bearing as a cardinal direction.
    // If the robot is not on the board yet it fails and returns -1
    // Otherwise it returns a string containing one of north, south, east, or west


    _createClass(Beefy, [{
        key: "bearingToString",
        value: function bearingToString() {
            if (this.onboard == 0) {
                return -1;
            }
            switch (this.bearing) {
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

    }, {
        key: "setBearing",
        value: function setBearing(str) {
            if (this.onboard == 0) {
                return -1;
            }
            switch (str) {
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

    }, {
        key: "place",
        value: function place(x, y, b) {
            if (0 < x < this.boardwidth) {
                if (0 < y < this.boardheight) {
                    this.x = x;
                    this.y = y;
                    this.onboard = 1;
                    this.setBearing(b);
                    return 0;
                }
            }
            return 1;
        }

        // Move tells beefy to move forward relative to its bearing
        // If beefy is not on the board it fails and returns -1
        // If the move were to push beefy off the board it fails and returns 1
        // Otherwie, it returns 0

    }, {
        key: "move",
        value: function move() {
            if (this.onboard == 0) {
                return -1;
            }
            var nx = this.x;
            var ny = this.y;
            switch (this.bearing) {
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
            if (0 <= nx && nx < this.boardheight) {
                if (0 <= ny && nx < this.boardheight) {
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

    }, {
        key: "left",
        value: function left() {
            if (this.onboard == 1) {
                this.bearing--;
                return 0;
            } else {
                return -1;
            }
        }

        // Right turns beefy 90 degrees (one quartercircle) clockwise
        // If beefy is not on the board it fails and returns -1
        // Otherwise it returns 0

    }, {
        key: "right",
        value: function right() {
            if (this.onboard == 1) {
                this.bearing++;
                return 0;
            } else {
                return -1;
            }
        }

        // Report retrieves a string containing beefy's current position and bearing
        // If beefy is not on the board it returns -1
        // Otherwise it returns a string containing beefy's status

    }, {
        key: "handleCommand",


        // handleCommand takes a string representing and returns a string as a response
        value: function handleCommand(str) {
            if (typeof str == 'undefined') {
                return "Nonexistant command string";
            }if (str == "") {
                return "Empty command string";
            }
            var strarr = str.split(" ");
            var rval = 0;
            switch (strarr[0]) {
                case "PLACE":
                    var re = new RegExp("PLACE [0-4] [0-4] (north|east|south|west)");
                    var ret = str.search(re);
                    if (ret == -1) {
                        return "PLACE syntax is '/^PLACE [0-4] [0-4] (north|west|south|east)$/";
                    }
                    rval = this.place(strarr[1], strarr[2], strarr[3]);
                    switch (rval) {
                        case 1:
                            return "Tried to place outside of boundaries";
                        case 0:
                            return "Successfully placed beefy";
                        default:
                            return "CRITFAIL: Unknown status code from this.place";
                    }
                case "MOVE":
                    rval = this.move();
                    switch (rval) {
                        case 1:
                            return "Tried to drive beefy off the edge of the table";
                        case -1:
                            return "Beefy can't drive if he's not on the table yet";
                        case 0:
                            return "Beefy went for a drive";
                        default:
                            return "CRITFAIL: Unknown status code from this.move " + rval;
                    }
                case "LEFT":
                    rval = this.left();
                    switch (rval) {
                        case -1:
                            return "Beefy can't turn if he's not on the table yet";
                        case 0:
                            return "Turned beefy left";
                        default:
                            return "CRITFAIL: Unknown status code from this.left";
                    }
                case "RIGHT":
                    rval = this.right();
                    switch (rval) {
                        case -1:
                            return "Beefy can't turn if he's not on the table yet";
                        case 0:
                            return "Turned beefy right";
                        default:
                            return "CRITFAIL: Unknown status code from this.right";
                    }
                case "REPORT":
                    rval = this.report;
                    switch (rval) {
                        case -1:
                            return "Beefy can't give a report if he's not on the table yet";
                        default:
                            return rval;
                    }
                default:
                    return "Unrecognized opcode, your options are PLACE, MOVE, LEFT, RIGHT, and REPORT. Check the docs for their syntax";
            }
        }
    }, {
        key: "report",
        get: function get() {
            if (this.onboard == 1) {
                return "X: " + this.x + " Y: " + this.y + " Bearing: " + this.bearingToString();
            } else {
                return -1;
            }
        }
    }]);

    return Beefy;
}();

exports.default = Beefy;
"use strict";

var _readline = require("readline");

var _readline2 = _interopRequireDefault(_readline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var beefy = new Beefy();

var rl = _readline2.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
function pollinput() {
    rl.question("Enter command: ", function (answer) {
        console.log(beefy.handleCommand(answer));
        pollinput();
    });
}
pollinput();
//# sourceMappingURL=all.js.map
