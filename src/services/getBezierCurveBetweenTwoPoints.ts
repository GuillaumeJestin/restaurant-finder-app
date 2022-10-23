import { Bezier } from "bezier-js";

/**
 * Helper function that returns an array of points describing a quadratic bezier curve generated from the two input points.
 * Used to draw the line between the user location and the restaurant location
 * 
 * @param p1 First point for the curve
 * @param p2 Second point for the curve
 * @returns Array of points describing the bezier curve
 */
const getBezierCurveBetweenTwoPoints = (p1: [number, number], p2: [number, number], offsetAmount = 0.3) => {
  // Computing middle point between p1 and p2
  const middlePoint = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];

  // Offsetting the middle point 90° compared to the vector (p1, p2)
  // This will give us the p3 to describe a quadratic bezier curve
  // p3 is the control point is this case
  // A 90° rotation is really simple: (x, y) => (-y, x)
  const offsetDirection = [-(p2[1] - p1[1]) * offsetAmount, (p2[0] - p1[0]) * offsetAmount];

  // Computing p3 (= middlePoint + offsetDirection)
  const p3 = [middlePoint[0] + offsetDirection[0], middlePoint[1] + offsetDirection[1]] as const;

  // Generating the curve using bezier-js
  const bezier = new Bezier(...p1, ...p3, ...p2);

  const lookUpTable = bezier.getLUT(16);

  return lookUpTable.map(point => [point.x, point.y]);
}

export default getBezierCurveBetweenTwoPoints;