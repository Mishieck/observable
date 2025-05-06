import { describe, it } from "@std/testing";
import { expect } from "@std/expect";
import { type Event, Observable, type Observer } from "./observable.ts";

describe("Observable", () => {
  it("should add observers", () => {
    const observable = new Observable<"update", { update: boolean }>([
      "update",
    ]);

    type BooleanEvent = Event<"update", boolean>;
    let value = false;

    const observer: Observer<BooleanEvent> = ({ payload }) => value = payload;
    observable.addObserver("update", observer);

    observable.notifyObservers("update", true);
    expect(value).toEqual(true);

    observable.notifyObservers("update", false);
    expect(value).toEqual(false);
  });

  it("should remove observers", () => {
    const observable = new Observable<"update", { update: boolean }>([
      "update",
    ]);

    type BooleanEvent = Event<"update", boolean>;
    let value = false;
    const observer: Observer<BooleanEvent> = ({ payload }) => value = payload;

    observable.addObserver("update", observer);
    observable.notifyObservers("update", true);
    expect(value).toEqual(true);

    observable.removeObserver("update", observer);
    observable.notifyObservers("update", false);
    expect(value).toEqual(true);
  });
});
