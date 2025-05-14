import { describe, it } from "@std/testing";
import { type ArrayEventRecord, ObservableArray } from "./array.ts";
import { expect } from "@std/expect/expect";

describe("ObservableArray", () => {
  it("should observe copyWithin operations", () => {
    const oArray = new ObservableArray<boolean>([false, true, false]);
    let payload: ArrayEventRecord<boolean>["copyWithin"] = [];

    oArray.addObserver("copyWithin", ({ payload: p }) => {
      payload = p;
    });

    oArray.copyWithin(1, 0, 1);
    expect(payload).toEqual([false, false, false]);
  });

  it("should observe length", () => {
    const oArray = new ObservableArray([true]);
    let length = oArray.length;
    expect(length).toEqual(1);

    oArray.addObserver("length", ({ payload }) => length = payload);
    oArray.length = 0;
    expect(length).toEqual(0);
    expect(oArray.current).toEqual([]);
  });

  it("should observe fill operations", () => {
    const oArray = new ObservableArray<boolean>([false, false, false]);
    let payload: ArrayEventRecord<boolean>["fill"] = [];

    oArray.addObserver("fill", ({ payload: p }) => {
      payload = p;
    });

    oArray.fill(true);
    expect(payload).toEqual([true, true, true]);

    oArray.fill(false, 1);
    expect(payload).toEqual([true, false, false]);
  });

  it("should observe pop operations", () => {
    const oArray = new ObservableArray<boolean>([false]);
    let payload: ArrayEventRecord<boolean>["pop"] = undefined;

    oArray.addObserver("pop", ({ payload: p }) => {
      payload = p;
    });

    oArray.pop();
    expect(payload).toEqual(false);
  });

  it("should observe push operations", () => {
    let payload: ArrayEventRecord<number>["push"] = 1;
    const oArray = new ObservableArray<number>([payload]);

    oArray.addObserver("push", ({ payload: p }) => {
      payload = p;
    });

    oArray.push(2);
    expect(payload).toEqual(2);
    expect(oArray.current).toEqual([1, 2]);
  });

  it("should observe reverse operations", () => {
    let payload: ArrayEventRecord<number>["reverse"] = [];
    const oArray = new ObservableArray<number>([1, 2]);

    oArray.addObserver("reverse", ({ payload: p }) => {
      payload = p;
    });

    oArray.reverse();
    expect(payload).toEqual([2, 1]);
  });

  it("should observe shift operations", () => {
    let payload: ArrayEventRecord<number>["shift"] = undefined;
    const oArray = new ObservableArray<number>([1, 2]);

    oArray.addObserver("shift", ({ payload: p }) => {
      payload = p;
    });

    oArray.shift();
    expect(payload).toEqual(1);
    expect(oArray.current).toEqual([2]);
  });

  it("should observe splice operations", () => {
    let payload: ArrayEventRecord<number>["splice"] = [];
    const oArray = new ObservableArray<number>([1, 0, 3]);

    oArray.addObserver("splice", ({ payload: p }) => {
      payload = p;
    });

    oArray.splice(1, 1, 2);
    expect(payload).toEqual([0]);
  });

  it("should observe sort operations", () => {
    let payload: ArrayEventRecord<number>["sort"] = [];
    const oArray = new ObservableArray<number>([1, 3, 2]);

    oArray.addObserver("sort", ({ payload: p }) => {
      payload = p;
    });

    oArray.sort();
    expect(payload).toEqual([1, 2, 3]);
  });

  it("should observe unshift operations", () => {
    let payload: ArrayEventRecord<number>["unshift"] = 1;
    const oArray = new ObservableArray<number>([1]);

    oArray.addObserver("unshift", ({ payload: p }) => {
      payload = p;
    });

    oArray.unshift(0);
    expect(payload).toEqual(2);
    expect(oArray.current).toEqual([0, 1]);
  });
});
