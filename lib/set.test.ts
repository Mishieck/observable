import { describe, it } from "@std/testing";
import { ObservableSet } from "./set.ts";
import { expect } from "@std/expect/expect";

describe("ObservableSet", () => {
  it("should observe add", () => {
    const set = new Set<boolean>();
    const oSet = new ObservableSet(set);
    let result = new Set<boolean>();

    oSet.addObserver("add", ({ payload }) => {
      result = payload;
    });

    oSet.add(true);
    expect(result).toBe(set);
  });

  it("should observe clear", () => {
    const set = new Set([true]);
    const oSet = new ObservableSet(set);
    let called = false;

    oSet.addObserver("clear", () => {
      called = true;
    });

    oSet.clear();
    expect(called).toEqual(true);
  });

  it("should observe delete", () => {
    const set = new Set([false, true]);
    const oSet = new ObservableSet(set);
    let result = false;

    oSet.addObserver("delete", ({ payload }) => {
      result = payload;
    });

    oSet.delete(true);
    expect(result).toBe(true);
  });
});
