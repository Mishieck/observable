import { describe, it } from "@std/testing";
import {
  DerivedPrimitive,
  Deriver,
  Primitive,
  type PrimitiveObserver,
} from "./primitive.ts";
import { expect } from "@std/expect";

describe("Primitive", () => {
  it("should handle observation", () => {
    let value = false;
    const primitive = new Primitive(value);

    const setValue: PrimitiveObserver<boolean> = (payload) => {
      value = payload;
    };

    primitive.observe(setValue);

    primitive.current = true;
    expect(value).toEqual(true);
    expect(primitive.current).toEqual(true);
    expect(primitive.current).toEqual(true);

    primitive.current = false;
    expect(value).toEqual(false);
    expect(primitive.current).toEqual(false);
    expect(primitive.current).toEqual(false);
  });
});

describe("DerivedPrimitive", () => {
  it("should handle observation", () => {
    const primitive = new Primitive(0);

    const isEven: Deriver<number, boolean> = (value): boolean =>
      value % 2 === 0;

    const parityPrimitive = new DerivedPrimitive(primitive, isEven);

    expect(parityPrimitive.current).toEqual(true);
    primitive.current = 1;
    expect(parityPrimitive.current).toEqual(false);
    primitive.current = 2;
    expect(parityPrimitive.current).toEqual(true);
    parityPrimitive.current = false;
    expect(parityPrimitive.current).toEqual(true);
  });
});
