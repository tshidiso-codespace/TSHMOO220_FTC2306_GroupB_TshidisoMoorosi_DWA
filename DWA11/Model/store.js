import { Action } from "./actions.js";
import { reducer } from "./reducers.js";

/**
 * @typedef {object} State
 * @prop { number } phase
 */

/**
 * @callback GetState
 * @returns {State}
 */

/**
 * @callback Dispatch
 * @param {Action} action
 */

/**
 * @callback EmptyFn
 */

/**
 * @callback Subscription
 * @param {State} prev
 * @param {State} next
 */

/**
 * @type {Array<Subscription>}
 */
const subscribers = [];

/**
 * @type {Array<State>}
 */
const states = [
  {
    phase: 0,
  },
];

/**
 * @returns {State}
 */
export const getState = () => {
  return Object.freeze({ ...states[0] });
};

/**
 * @param { Action } action
 */
export const dispatch = (action) => {
  const prev = getState();
  const next = reducer(prev, action);

  subscribers.forEach((item) => item(prev, next));
  states.unshift(next);
};

/**
 * @param {Subscription} subscription
 */
export const subscribe = (subscription) => {
  subscribers.push(subscription);
  const handler = (item) => item !== subscription;

  const unsubscribe = () => {
    const newSubscribers = subscribers.filter(handler);
    subscribers = newSubscribers;
  };

  return unsubscribe;
};

/**
 * @typedef {object} Store
 * @prop {GetState} getState
 * @prop {Subscribe} subscribe
 * @prop {Dispatch} dispatch
 */
