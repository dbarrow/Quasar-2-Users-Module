<template>
  <div>
    <div class="">
      <h5 class="no-margin q-py-sm q-pl-sm">User Managment</h5>
      <q-tabs
        v-model="tab"
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="left"
        narrow-indicator
      >
        <q-tab name="mails" label="Users" />
        <q-tab name="alarms" label="Roles" />
        <q-tab name="movies" label="Permissions" />
      </q-tabs>

      <q-separator class="q-mt-md" />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="mails">
          <div class="row reverse">
            <q-btn
              @click="addUser"
              size="md"
              round
              color="primary"
              icon="add"
              class="q-ml-md"
            />
          </div>
          <UserTable :users='store.state.users.users'></UserTable>
        </q-tab-panel>

        <q-tab-panel name="alarms">
          <div class="text-h6">Roles</div>
        </q-tab-panel>

        <q-tab-panel name="movies">
          <div class="text-h6">Permissions</div>
        </q-tab-panel>
      </q-tab-panels>
    </div>

    <div v-if="store.state.users.users && testing">
      {{ typeof store.state.users.users[1] }}
      <br /><br />
      {{ store.getters["users/getUser"](userID) }}
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import UserTable from "../components/UserTable.vue";
import AddUserDialog from "../components/AddUserDialog.vue";
import { useQuasar } from "quasar";
import AddUserDialogVue from "../components/AddUserDialog.vue";



export default {
  components: {
    UserTable,
  },
  setup() {
    const $q = useQuasar();

    const testing = ref(false);
    const store = useStore();
    const userID = ref(1);
    onMounted(() => {
      store.dispatch("users/index");
      //console.log("This user" ,store.state.user);
     // console.log("store get user: ", store.getters["users/getUser"])
    });

    function addUser() {

      $q.dialog({
        component: AddUserDialogVue,
        componentProps: {
          title: "Add User",
          // ...more..props...
        },
      })
        .onOk(() => {
          console.log("OK");
        })
        .onCancel(() => {
          // console.log('Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }

    return {
      store,
      userID,
      testing,
      addUser,

      tab: ref("mails"),
    };
  },
};
</script>

<style></style>
