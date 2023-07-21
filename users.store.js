import UserService from "./users.service";
export const users = {
  namespaced: true,

  state: {
    users: [],
  },

  actions: {
    index({ commit }) {
      UserService.index().then((response) => {
          console.log(response.users)
        commit("storeUsers", response.users);
      });
    },

    store( {commit} , user) {
      console.log("Store", user)
      UserService.store(user).then((response) => {
        console.log(response.users)
        commit('addUser', user);
      })
    },

    update( {commit}, user)
    {
      UserService.update(user).then((response) => {
        console.log(response.users)
        commit('updateUser', user);
      })
    }
  },

  mutations: {
    storeUsers(state, users) {
      state.users = users;
      console.log("USER_STATE: ",state.users[0].email);
      // state.user = user;
    },

    addUser(state, user) {
      state.users.push(user)
    },

    updateUser(state, user) {
     // state.users.push(user)//trying to update the user and not add another to the stoere
     var index =  getUserIndex (state, user);
     state.users[index] = user;
     console.log("user index = " + index);

    }
  },

  getters: {
    getUser: (state) => (id) => {
        if(state.users) {
            return state.users.find(user => user.id == id)
        }
    },

    getUsers: (state) => {
      return state.users;
    }

  },


};

function getUserIndex(state, user)
{
       return state.users.findIndex(c => c.id === user.id)       

}
