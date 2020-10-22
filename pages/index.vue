<template>
  <div>
    <v-container>
      <v-card>
        <v-row>
          <v-col class="d-flex justify-center">
            <img
              height="300"
              src="https://sv1.picz.in.th/images/2020/10/07/OJWUZD.png"
            />
          </v-col>
        </v-row>
        <v-form ref="form" v-model="valid" @submit.prevent="addData">
          <!--แบบฟอร์มให้กรอกข้อมูล-->
          <v-row class="mb-6" justify="center">
            <v-col lg="6">
              <v-text-field
                v-model="username"
                :rules="usernameRules"
                label="UserName"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mb-6" justify="center">
            <v-col lg="6">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mb-6" justify="center">
            <v-col lg="3">
              <v-text-field
                v-model="firstname"
                :rules="nameRules"
                :counter="10"
                label="First name"
                required
              ></v-text-field>
            </v-col>
            <v-col lg="3">
              <v-text-field
                v-model="lastname"
                :rules="nameRules"
                :counter="10"
                label="Last name"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mb-6" justify="center">
            <v-col lg="3">
              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Password"
                required
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>
            <v-col lg="3">
              <v-text-field
                v-model="confirm"
                block
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, passwordMatch]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Confirm Password"
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>
          </v-row>
          <!--ปุ่มฟังชั่นต่างๆ-->
          <v-row justify="center">
            <v-col lg="2" justify="center"
              ><v-select
                v-model="select"
                :items="sex"
                :rules="[(v) => !!v || 'sex is required']"
                label="Gender"
                required
              ></v-select
            ></v-col>
          </v-row>
          <v-row class="mb-6" justify="center">
            <v-col lg="6">
              <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-4"
                    v-bind="attrs"
                    @click="addData"
                    v-on="on"
                  >
                    Submit
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="headline grey lighten-2">
                    ยืนยันการสมัครสมาชิก
                  </v-card-title>

                  <v-card-text>
                    กดตกลงเพื่อยืนยันการสมัครสมาชิกกับเรา New Friend!!
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false">
                      ตกลง
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-btn color="error" class="mr-4" @click="reset">
                Reset Form
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import firebase from 'firebase/app'
import { db } from '~/plugins/firebaseConfig.js'

export default {
  data: () => ({
    valid: false,
    username: '',
    firstname: '',
    lastname: '',
    usernameRules: [
      (v) => !!v || 'Username is requried',
      (v) => v.length <= 12 || 'UserName must be less than 12 characters',
    ],
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => v.length <= 10 || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
    passwordRules: [(v) => !!v || 'Password is required'],
    confirm: '',
    select: null,
    sex: ['male', 'famale'],
    show1: false,
    checkbox: false,
    dialog: false,
  }),
  computed: {
    passwordMatch() {
      return () => this.password === this.confirm || 'Password must match'
    },
  },
  methods: {
    addData() {
      const data = {
        username: this.username,
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
        sex: this.select,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      }
      db.collection('register')
        .doc()
        .set(data)
        .then(function () {
          console.log('Document successfully written! -> MyForm')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    },
    reset() {
      this.$refs.form.reset()
    },
    rules: {
      required: (value) => !!value || 'Required.',
      min: (v) => (v && v.length >= 8) || 'Min 8 characters',
    },
  },
}
</script>
<style></style>
