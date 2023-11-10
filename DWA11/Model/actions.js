/**
 * @typedef {object} Subtract
 * @prop { 'SUBTRACT' } type
 */

/**
 * @typedef {object} Add
 * @prop { 'ADD' } type
 */

/**
 * @typedef {object}  Reset
 * @prop { 'RESET' } type
 */

/**
 * @typedef { Subtract | Add | Reset } Action
 */

export const Action = {};

/**
 * @returns {number}
 */
export const add = () => {
  return {
    type: "ADD",
  };
};

/**
 * @returns {number}
 */
export const subtract = () => {
  return {
    type: "SUBTRACT",
  };
};

/**
 * @returns {number}
 */
export const reset = () => {
  return {
    type: "RESET",
  };
};
