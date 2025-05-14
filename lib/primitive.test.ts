import { describe, it } from "@std/testing";
import { Primitive, type PrimitiveObserver } from "./primitive.ts";
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
