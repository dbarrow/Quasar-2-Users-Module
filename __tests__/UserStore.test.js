// stores/counter.spec.ts
import { setActivePinia, createPinia } from "pinia";
import { useUsersStore } from "../users.store";
import { assert, expectTypeOf } from "vitest";

describe("User Store", () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
  });

  it("increments", () => {
    const store = useUsersStore();
    console.log(store.users);
    assert(true);
  });
});
