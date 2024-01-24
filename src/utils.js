import * as nanoid from "nanoid/non-secure"
import { Temporal } from "@js-temporal/polyfill"

export function compose(...functions) {
  return (input) => {
    return functions.reduceRight((acc, fn) => {
      return fn(acc)
    }, input)
  }
}

export function pluralS(n) {
  return n === 1 ? "" : "s"
}

export function isPlainObject(thing) {
  return typeof thing === "object" && thing.constructor === Object
}

export function isString(thing) {
  return typeof thing === "string"
}

export function isEmpty(list) {
  return list.length === 0
}

export function isNumber(thing) {
  return typeof thing === "number"
}

export function preventDefault(action) {
  return (state, event) => [
    state,
    [(dispatch) => (event.preventDefault(), dispatch(action))],
  ]
}

function withPayload(filter) {
  return (_, payload) => filter(payload)
}

export function targetValue(action) {
  return withPayload((e) => [action, e.target.value])
}

export function daysSince(instant) {
  if (!instant) {
    return null
  }
  const hoursSince = now().since(Temporal.Instant.from(instant), {
    largestUnit: "hour",
  }).hours
  return Math.floor(hoursSince / 24)
}

export function days(n) {
  return Temporal.Duration.from({ hours: n * 24 })
}

export function now() {
  return Temporal.Now.instant()
}

export function uuid() {
  return nanoid.nanoid()
}
