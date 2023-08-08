import UsersService from "./users.service";
import { defineStore } from "pinia";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [ ],
  }),

  actions: {
    async index() {
      return await UsersService.index().then((response) => {
        this.users = response.users;
      });
    },

    async store(user) {
      return await UsersService.store(user).then((response) => {
        this.users.push(response.user);
        return response;
      });
    },

    async update(user) {
      return await UsersService.update(user).then((response) => {
        var index = this.users.findIndex((item) => item.id === user.id);
        this.users.splice(index, 1, response.user);
        return response;
      });
    },

    async delete(user) {
      UsersService.delete(user).then((response) => {
        var index = this.users.findIndex((item) => item.id === user.id);
        this.users.splice(index, 1);
        return response;
      });
    },
  },

  getters: {
    getUserById: (state, id) => {
      return state.users.find((user) => user.id === id);
    },
  },
});

function getUserIndex(user) {
  return this.users.findIndex((c) => c.id === user.id);
}
