import { Observable } from "./observable.ts";

export type SetMutationMethodName = "add" | "clear" | "delete";
export type SetEventName = SetMutationMethodName;
export type SetMutationMethods<Element> = Set<Element>[SetMutationMethodName];

export type SetMutationTrait<Element> = Pick<
  SetMethods<Element>,
  SetMutationMethodName
>;

export type SetEventRecord<Element> = {
  [Key in SetMutationMethodName]: ReturnType<
    SetMutationTrait<Element>[Key]
  >;
};

export type SetMethods<Element> = {
  [Key in keyof Set<Element>]: Set<Element>[Key] extends CallableFunction
    ? Set<Element>[Key]
    : void;
};

export class ObservableSet<Element>
  extends Observable<SetEventName, SetEventRecord<Element>>
  implements SetMutationTrait<Element> {
  #set: Set<Element>;
  constructor(set: Set<Element>) {
    super(["add", "clear", "delete"]);
    this.#set = set;
  }

  add(value: Element): Set<Element> {
    this.notifyObservers("add", this.#set.add(value));
    return this.#set;
  }

  clear(): void {
    this.notifyObservers("clear", this.#set.clear());
  }

  delete(value: Element): boolean {
    const result = this.#set.delete(value);
    this.notifyObservers("delete", result);
    return result;
  }
}
