// stores/counter.spec.ts
import { setActivePinia, createPinia } from "pinia";
import { useUsersStore } from "../users.store";
import { assert, expectTypeOf } from "vitest";

describe("User Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("increments", () => {
    const store = useUsersStore();
    console.log(store.users);
    assert(true);
  });
});
