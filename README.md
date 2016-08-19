# Beefy
A small project to prove my competence with javascript, git, and unit testing.
Beefy shall exist on a 5x5 zero indexed field. Beefy shall accept five possible commands listed below.
Attempting to initiate a command which would place beefy beyond the allowed field shall fail.
## Usage
### CLI
1. npm install
2. gulp cli
3. node dist/beefycli.js

### Tests
1. npm install
2. gulp tests
3. jasmine

## Goals
Beefy shall act on the following commands.
#### PLACE
Moves beefy directly to any place on the board
#### MOVE
Drives beefy forward
#### LEFT
Turns beefy left
#### RIGHT
Turns beefy right
#### REPORT
Dumps beefy's position and facing to output

## Test Cases
We're going to try and use some barbaric form of TTD
### PLACE command
Test that a place, followed by a report, will place beefy at the correct position
#### Precondition
None, PLACE should work as described in all states the program may be in
#### Assumptions
N/A
#### Test Steps
1. Start software
2. Enter "PLACE 1,1,NORTH"
3. Enter "REPORT"

#### Expected result
Software states that beefy is in position 1,1, and facing north.

### PLACE edgetest
Test that place outside the boundaries of the table will fail
#### Precondition
None, PLACE may be initiated from any condition, and the boundaries of the table are static.
#### Assumptions
N/A
#### Test Steps
1. Start software
2. Enter "PLACE -1,-1,NORTH"
3. Enter "REPORT"
4. Enter "PLACE 5,5,NORTH"
5. Enter "REPORT"

#### Expected result
Software states that both operations are illegal, and report shall state that beefy is not on the table.

### REPORT command
Report shall describe Beefy's position and bearing.
#### Preconditions
Beefy is on the table
#### Assumptions
N/A
#### Test Steps
1. Start software
2. Enter "PLACE 1,1,NORTH"
3. Enter "REPORT"

#### Expected result
Software states that Beefy is in position 1,1, and facing north

### REPORT fail testing
Test that initiating a REPORT before beefy is on the board, will report that beefy is not on the board, instead of failing ungracefully.
#### Preconditions
Beefy is not on the table
#### Assumptions
N/A
#### Test Steps
1. Start software
2. Enter "REPORT"

#### Expected result
Software states that Beefy can not report his position, as he is not on the table

### MOVE command
MOVE shall have beefy move west,north,east, or south one tile depending on his bearing
#### Preconditions
Beefy is on the table
#### Assumptions
N/A
#### Test Steps
1. Start software
2. Enter "PLACE 2,2,NORTH"
3. Enter "MOVE"
4. Enter "REPORT"
5. Enter "PLACE 2,2,EAST"
6. Enter "MOVE"
7. Enter "REPORT"
8. Enter "PLACE 2,2,SOUTH"
9. Enter "MOVE"
10. Enter "REPORT"
11. Enter "PLACE 2,2,WEST"
12. Enter "MOVE"
13. Enter "REPORT"

#### Expected results
No commands should fail. In order, the reports should return 2,3,NORTH, 3,2,EAST, 1,2,SOUTH, and 1,2,WEST
### MOVE edgetest
MOVE shall fail and report that it failed if the MOVE command were to place it beyond the boundaries of the table, or if beefy is not on the board
#### Preconditions
Beefy is on the table, next to an edgetest
#### Assumptions
N/A
#### Test Steps
1. Start software
2. Enter "PLACE 0,0,SOUTH"
3. Enter "MOVE"
4. Enter "REPORT"

#### Expected results
Beefy shall complain that moving would place it over the boundary of the table, and report shall return 0,0
### MOVE tablecheck
MOVE shall fail if beefy is not on the table
#### Preconditions
None, test checks a command before base preconditions are meet
#### Assumptions
N/A
#### Test Steps
1. Start software
2. Enter "MOVE"
3. Enter "REPORT"

#### Expected results
Beefy shall complain that it can not move, as it is not on the board
### LEFT command
Beefy, when on the board, shall use LEFT to turn one quarter circle anti-clockwise
#### Preconditions
Beefy is on the board
#### Assumptions
N/A
#### Test Steps
1. Start software
2. Enter "PLACE 2,2,NORTH"
3. Enter "REPORT"
4. Enter "LEFT"
5. Enter "REPORT"
6. Enter "LEFT"
7. Enter "REPORT"
8. Enter "LEFT"
9. Enter "REPORT"

#### Expected results
All commands state position at 2,2, in order they state bearing as NORTH, WEST, SOUTH, EAST
### LEFT tablecheck
LEFT shall fail and report failure if beefy is not yet on the board
#### Preconditions
None, test checks for graceful failure if preconditions are not met
#### Assumptions
N/A
#### Test Steps
1. Start Software
2. Enter "LEFT"

#### Expected results
Beefy shall complain it can't turn right as it is not on the table
### RIGHT command
Beefy, when on the board, shall use RIGHT to turn one quarter circle clockwise
#### Preconditions
Beefy is on the board
#### Assumptions
N/A
#### Test Steps
1. Start software
2. Enter "PLACE 2,2,NORTH"
2. Enter "REPORT"
3. Enter "RIGHT"
4. Enter "REPORT"
5. Enter "RIGHT"
6. Enter "REPORT"
7. Enter "RIGHT"
8. Enter "REPORT"

#### Expected results
Reports shall return in order, NORTH, RIGHT, SOUTH, WEST
#### Expected results
All commands state position at 2,2, in order they state bearing as NORTH, WEST, SOUTH, EAST
### RIGHT tablecheck
RIGHT shall fail and report failure if beefy is not yet on the board
#### Preconditions
None, test checks for graceful failure if preconditions are not met
#### Assumptions
N/A
#### Test Steps
1. Start Software
2. Enter "RIGHT"
#### Expected results
Beefy shall complain it can't turn left as it is not on the table
