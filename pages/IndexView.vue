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
        <q-tab name="users" label="Users" />
        <q-tab name="roles" label="Roles" />
        <q-tab name="permissions" label="Permissions" />
      </q-tabs>

      <q-separator class="q-mt-md" />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="users">
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
          <UserTable :users="store.users"></UserTable>
        </q-tab-panel>

        <q-tab-panel name="roles">
          <div class="text-h6">Roles</div>
        </q-tab-panel>

        <q-tab-panel name="permissions">
          <div class="text-h6">Permissions</div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useUsersStore } from "../users.store";
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
    const store = useUsersStore();
    const userID = ref(1);

    onMounted(() => {
      store.index();
      console.log("Store = " + store.users);
    });

    function addUser() {
      $q.dialog({
        component: AddUserDialogVue,
        componentProps: {
          title: "Add User",
        },
      })
        .onOk(() => {
          console.log("OK");
        })
        .onCancel(() => {
          console.log("Cancel");
        })
        .onDismiss(() => {
          console.log("I am triggered on both OK and Cancel");
        });
    }

    return {
      store,
      userID,
      testing,
      addUser,
      tab: ref("users"),
    };
  },
};
</script>

<style></style>
