<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <!--
        ...content
        ... use q-card-section for it?
      -->
      <q-card-actions class="justify-between">
        <h6 class="no-margin">Edit User</h6>
        <q-btn
          size="16px"
          padding="none"
          round
          flat
          icon="close"
          @click="onCancelClick"
        />
      </q-card-actions>
      <q-form class="q-ma-lg q-gutter-md">
       <q-input
       autofocus
          v-model="name"
          ref="nameRef"
          label="Name"
          v-bind:value="name">
        </q-input>
       <q-input
          v-model="email"
          ref="emailRef"
          label="Email">
        </q-input>
        <q-input
          v-model="password"
          ref="passwordRef"
          type="password"
          autocomplete="new-password"
          label="Password"
          name="password"
        ></q-input>
        <q-select label="Role"></q-select>
      </q-form>

      <q-card-actions align="right">
        <q-btn color="primary" label="Save" @click="saveUser" />
      </q-card-actions>

      <!-- buttons example -->
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from "quasar";
import { useStore } from "vuex";
import { ref } from "vue";

export default {
  props: {
    title: String,
    user: Object,
  },

  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits,
  ],

  setup(props) {
    // REQUIRED; must be called inside of setup()
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();
    // dialogRef      - Vue ref to be applied to QDialog
    // onDialogHide   - Function to be used as handler for @hide on QDialog
    // onDialogOK     - Function to call to settle dialog with "ok" outcome
    //                    example: onDialogOK() - no payload
    //                    example: onDialogOK({ /*.../* }) - with payload
    // onDialogCancel - Function to call to settle dialog with "cancel" outcome
    const $store = useStore();

    const name = ref(props.user.name);
    const nameRef = ref("");

    const email = ref(props.user.email);
    const emailRef = ref("");

    const password = ref(props.user.password);
    const passwordRef = ref("");

    const id = ref(props.user.id);
    const idRef = ref("");

    return {
      name,
            email,
      password,
      
      // This is REQUIRED;
      // Need to inject these (from useDialogPluginComponent() call)
      // into the vue scope for the vue html template
      dialogRef,
      onDialogHide,

      // other methods that we used in our vue html template;
      // these are part of our example (so not required)
      onOKClick() {
        console.log("clicked");
        // on OK, it is REQUIRED to
        // call onDialogOK (with optional payload)
        onDialogOK();
        // or with payload: onDialogOK({ ... })
        // ...and it will also hide the dialog automatically
      },

      saveUser() {

        let user = {
          name: name.value,
          email: email.value,
          // companyName: companyName.value,
          password: password.value,
          id: id.value,
        };
                              console.log(user)

        $store.dispatch("users/update", user).then(
          () => {
            console.log("this.index = " + user.index)
            name.value = '';
            nameRef.value = '';

            email.value = '';
            emailRef.value = '';
             id.value = '';
           idRef.value = '';

            password.value = '';
            passwordRef.value = '';
onDialogOK();
            //$router.push("/app");
          },
          (error) => {
            loading = false;
            this.message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            // console.log(this.message.password[0]);
            // loginError.value = this.message.password[0];
          }
        );
        console.log();
      },

      // we can passthrough onDialogCancel directly
      onCancelClick: onDialogCancel,
    };
  },
};
</script>

<style scoped></style>
