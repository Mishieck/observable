/**
 * A JavaScript library that provides classes that implements the Observer
 * Pattern.
 *
 * @example
 * ```ts
 * import { type Event, Observable, type Observer } from "@mishieck/observable";
 * import { describe, it } from "@std/testing";
 * import { expect } from "@std/expect";
 *
 * type EventName = "change" | "submit";
 * type ChangeEvent = Event<"change", string>;
 * type SubmitEvent = Event<"submit", string>;
 * type InputEventRecord = Record<EventName, string>;
 *
 * describe("Observable", () => {
 *   it("should handle events", () => {
 *     const observableInput = new Observable<EventName, InputEventRecord>(
 *       ["change", "submit"],
 *     );
 *
 *     let changeEventName = "";
 *     let changedInput = "";
 *     let submitEventName = "";
 *     let submittedInput = "";
 *
 *     const observeChange: Observer<ChangeEvent> = ({ name, payload }) => {
 *       changeEventName = name;
 *       changedInput = payload;
 *     };
 *
 *     const observeSubmit: Observer<SubmitEvent> = ({ name, payload }) => {
 *       submitEventName = name;
 *       submittedInput = payload;
 *     };
 *
 *     observableInput.addObserver("change", observeChange);
 *     observableInput.addObserver("submit", observeSubmit);
 *
 *     observableInput.notifyObservers("change", "O");
 *     expect(changeEventName).toEqual("change");
 *     expect(changedInput).toEqual("O");
 *
 *     observableInput.notifyObservers("submit", "Observable");
 *     expect(submitEventName).toEqual("submit");
 *     expect(submittedInput).toEqual("Observable");
 *
 *     observableInput.removeObserver("change", observeChange);
 *     observableInput.notifyObservers("change", "Ob");
 *     expect(changedInput).toEqual("O"); // Not changed
 *   });
 * });
 *
 * ```
 *
 * @module
 */

export * from "./lib/observable.ts";
