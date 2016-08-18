import Beefy from "../../dist/beefy.js"
global.Beefy = Beefy
describe("PLACE command", function() {
    it("places a robot on the table", function() {
        var Beefy = new global.Beefy();
        expect(Beefy.place(1, 1, "north")).toBe(0);
        expect(Beefy.report).toBe("X: 1 Y: 1 Bearing: north");
    })
    it("will fail if given a position outside the table", function() {
        var Beefy = new global.Beefy();
        expect(Beefy.place(-1,-1, "north")).toBe(1);
        expect(Beefy.report).toBe(-1);
    })
})
describe("REPORT command", function() {
    it("returns beefy's position and bearing", function() {
        var Beefy = new global.Beefy();
        Beefy.place(1, 1, "north")
        expect( Beefy.report).toBe("X: 1 Y: 1 Bearing: north")
    })
    it("fails if beefy is not on the table", function() {
        var Beefy = new global.Beefy();
        expect(Beefy.report).toBe(-1)
    })
})
describe("MOVE command", function() {
    it("drives beefy one tile in the direction of his facing", function() {
        var Beefy = new global.Beefy()
        Beefy.place(1,1,"north")
        expect(Beefy.move()).toBe(0)
        expect(Beefy.report).toBe("X: 1 Y: 2 Bearing: north")
        Beefy.place(1,1,"east")
        expect(Beefy.move()).toBe(0)
        expect(Beefy.report).toBe("X: 2 Y: 1 Bearing: east")
        Beefy.place(1,1,"south")
        expect(Beefy.move()).toBe(0)
        expect(Beefy.report).toBe("X: 1 Y: 0 Bearing: south")
        Beefy.place(1,1,"west")
        expect(Beefy.move()).toBe(0)
        expect(Beefy.report).toBe("X: 0 Y: 1 Bearing: west")
    })
    it("fails if beefy is not on the table", function() {
        var Beefy = new global.Beefy()
        expect(Beefy.move()).toBe(-1)
    })
    it("fails if the move were to push beefy over the table", function() {
        var Beefy = new global.Beefy()
        Beefy.place(4, 4, "north")
        expect(Beefy.move()).toBe(1)
        expect(Beefy.report).toBe("X: 4 Y: 4 Bearing: north")
        Beefy.place(4,4,"east")
        expect(Beefy.move()).toBe(1)
        expect(Beefy.report).toBe("X: 4 Y: 4 Bearing: east")
        Beefy.place(0,0,"south")
        expect(Beefy.move()).toBe(1)
        expect(Beefy.report).toBe("X: 0 Y: 0 Bearing: south")
        Beefy.place(0,0,"west")
        expect(Beefy.move()).toBe(1)
        expect(Beefy.report).toBe("X: 0 Y: 0 Bearing: west")
    })
})
describe("RIGHT command", function() {
    it("turns beefy one quarter circle clockwise", function() {
        var Beefy = new global.Beefy();
        Beefy.place(1, 1, "north")
        expect(Beefy.right()).toBe(0)
        expect(Beefy.report).toBe("X: 1 Y: 1 Bearing: east")
        expect(Beefy.right()).toBe(0)
        expect(Beefy.report).toBe("X: 1 Y: 1 Bearing: south")
        expect(Beefy.right()).toBe(0)
        expect(Beefy.report).toBe("X: 1 Y: 1 Bearing: west")
        expect(Beefy.right()).toBe(0)
        expect(Beefy.report).toBe("X: 1 Y: 1 Bearing: north")
    })
    it("fails if beefy is not on the table", function() {
        var Beefy = new global.Beefy()
        expect(Beefy.right()).toBe(-1)
    })
})
describe("LEFT command", function() {
    it("turns beefy one quarter circle anti-clockwise", function() {
        var Beefy = new global.Beefy();
        Beefy.place(1, 1, "north")
        expect(Beefy.left()).toBe(0)
        expect(Beefy.report).toBe("X: 1 Y: 1 Bearing: west")
        expect(Beefy.left()).toBe(0)
        expect(Beefy.report).toBe("X: 1 Y: 1 Bearing: south")
        expect(Beefy.left()).toBe(0)
        expect(Beefy.report).toBe("X: 1 Y: 1 Bearing: east")
        expect(Beefy.left()).toBe(0)
        expect(Beefy.report).toBe("X: 1 Y: 1 Bearing: north")
    })
    it("fails if beefy is not on the table", function() {
        var Beefy = new global.Beefy()
        expect(Beefy.left()).toBe(-1)
    })
})