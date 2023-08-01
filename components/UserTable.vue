<template>
  <div>
    <q-table
      class="table"
      card-class="table"
      binary-state-sort
      :rows="users"
      :columns="columns"
      row-key="name"
      :filter="filter"
      virtual-scroll
      :virtual-scroll-item-size="48"
      :virtual-scroll-sticky-size-start="48"
      flat
    >
      <template v-slot:body-cell-edit="props">
        <q-td :props="props">
          <q-btn
            icon-right="edit"
            no-caps
            flat
            dense
            @click="EditUser(props.row)"
          />
          <q-btn
            icon-right="delete"
            no-caps
            flat
            dense
            @click="DeleteUser(props.row)"
          />
        </q-td>
      </template>
      <template v-slot:top-left> </template>

      <template v-slot:top-right>
        <q-input dense debounce="100" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useUsersStore } from "../users.store";
import UserTable from "../components/UserTable.vue";
import UserCard from "../components/UserCard.vue";
import { useQuasar } from "quasar";
import AddUserDialogVue from "../components/AddUserDialog.vue";
import { Platform } from "quasar";

const columns = [
  {
    name: "desc",
    required: true,
    label: "Name",
    align: "left",
    field: (row) => row.name,
    sortable: true,
  },
  {
    name: "email",
    align: "center",
    label: "Email",
    field: "email",
    sortable: true,
    mobileHide: true,
  },
  {
    name: "edit",
    align: "left",
    label: "Actions",
    field: "edit",
  },
];

export default {
  props: {
    users: Array,
  },
  setup() {
    const $q = useQuasar();

    const testing = ref(false);
    const store = useUsersStore();
    const userID = ref(1);
    const isMobile = $q.platform.is.mobile;

    function EditUser(user) {
      // console.log(user)
      $q.dialog({
        component: UserCard,
        componentProps: {
          title: "Edit User",
          user: user,
          content: "Content",
          maximized: isMobile,
          editMode: user !== null,
        },
      })
        .onOk(() => {
          console.log("OKh");
        })
        .onCancel(() => {
          // console.log('Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }

    function DeleteUser(user) {
      // console.log(user)
      $q.dialog({
        component: UserCard,
        componentProps: {
          title: "Delete User",
          content: "Content",

          user: user,
        },
      })
        .onOk(() => {
          store.delete(user).then(() => {
            console.log("delete dispatched");
          });
        })

        .onCancel(() => {
          // console.log('Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }
    return {
      EditUser,
      DeleteUser,
      filter: ref(""),
      columns,
    };
  },
};
</script>

<style lang="scss">
.q-table th {
  font-size: 14px !important;
}
.q-table td {
  font-size: 14px !important;
}
.title {
  vertical-align: middle;
  font-size: 20px;
  font-weight: 500;
  margin-top: 50px;
}

.table {
  height: calc(100vh - 250px);
}

.my-sticky-dynamic
  /* height or max-height is important */ {
  height: 410px;
}

.q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */ {
  background-color: #fff;
}

thead tr th {
  position: sticky;
  z-index: 1;
}
/* this will be the loading indicator */
thead tr:last-child th {
  /* height of all previous header rows */
  top: 48px;
}
thead tr:first-child th {
  top: 0;
}
</style>
