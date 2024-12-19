import { useState } from "react";

class Point {
  /** @type {number} */
  lat;
  /** @type {number} */
  long;
}

class Circle {
  /** @type {Point} */
  center;
  /** @type {number} */
  radius;
}

/**
 * @param  {Circle} circle
 * @param  {Point} point
 */
export function isInCircle(circle, point) {
  // (x - a)^2 - (y - b)^2 <= r^2
  return (
    distance(circle.center.lat, point.lat, circle.center.long, point.long) <=
    circle.radius
  );
}

export function distance(lat1, lat2, lon1, lon2) {
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
  lon1 = (lon1 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;

  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers. Use 3956
  // for miles
  let r = 6371;

  // calculate the result
  return c * r;
}

export async function getCoordinates(options) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}
