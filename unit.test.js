"use strict";
const { expect } = require("@jest/globals");

const { SimpleRectangular, All_line } = require("./sketch");

const { DNA } = require("./DNA.js");

describe("Rectangular unit tests", () => {
  let rectangle;

  beforeEach(() => {
    var width = 100;
    var height = 100;
    var x = 0;
    var y = 0;
    var id = 0;

    rectangle = new SimpleRectangular(width, height, x, y, id);
  });

  it("Should be an object", () => {
    expect(rectangle).toBeDefined();
    expect(typeof rectangle).toBe("object");
  });
  it("Rectangular.Width Should be a number ", () => {
    expect(rectangle).toBeDefined();
    expect(typeof rectangle.width).toBe("number");
  });
  it("Rectangular.Width Should be a positive ", () => {
    expect(rectangle).toBeDefined();
    expect(rectangle.width).toBeGreaterThan(0);
  });
  it("Rectangular.Height Should be a number ", () => {
    expect(rectangle).toBeDefined();
    expect(typeof rectangle.height).toBe("number");
  });
  it("Rectangular.Height Should be a positive ", () => {
    expect(rectangle).toBeDefined();
    expect(rectangle.height).toBeGreaterThan(0);
  });
  it("Rectangular.X Should be a number ", () => {
    expect(rectangle).toBeDefined();
    expect(typeof rectangle.X).toBe("number");
  });
  it("Rectangular.Y Should be a number ", () => {
    expect(rectangle).toBeDefined();
    expect(typeof rectangle.Y).toBe("number");
  });
  it("Rectangular.id Should be a number ", () => {
    expect(rectangle).toBeDefined();
    expect(typeof rectangle.id).toBe("number");
  });
});

describe("Line unit tests", () => {
  let line;

  beforeEach(() => {
    line = new All_line(0, 100, 100);
  });
  it("Should be an object", () => {
    expect(line).toBeDefined();
    expect(typeof line).toBe("object");
  });
  it("Line.Start_Point_X Should be a number ", () => {
    expect(line).toBeDefined();
    expect(typeof line.Start_point_X).toBe("number");
  });
  it("Line.Start_Point_X Should be  0 or positive", () => {
    expect(line).toBeDefined();
    expect(line.Start_point_X).toBeGreaterThanOrEqual(0);
  });
  it("Line.End_Point_X Should be a number ", () => {
    expect(line).toBeDefined();
    expect(typeof line.End_point_X).toBe("number");
  });
  it("Line.End_Point_X Should be positive number ", () => {
    expect(line).toBeDefined();
    expect(line.End_point_X).toBeGreaterThan(0);
  });
  it("Line.Y Should be a number ", () => {
    expect(line).toBeDefined();
    expect(typeof line.Y).toBe("number");
  });
  it("Line.Y Should be positive number ", () => {
    expect(line).toBeDefined();
    expect(line.Y).toBeGreaterThan(0);
  });
});

describe("DNA unit tests", () => {
  let dna;

  beforeEach(() => {
    dna = new DNA([2, 5, 6, 4, 1, 3]);
  });
  it("Should be an object", () => {
    expect(dna).toBeDefined();
    expect(typeof dna).toBe("object");
  });
  it("DNA.genes should be an object ", () => {
    expect(dna).toBeDefined();
    expect(typeof dna.genes).toBe("object");
  });
  it("DNA.fitness should be an object ", () => {
    expect(dna).toBeDefined();
    expect(typeof dna.fitness).toBe("number");
  });
  it("DNA.fitness should be equal to 0", () => {
    expect(dna).toBeDefined();
    expect(dna.fitness).toEqual(0);
  });
});
