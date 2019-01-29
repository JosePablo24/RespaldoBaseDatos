<template>
  <div style="margin-left:1.5%;margin-right:1.5%; margin-top:1%;">
    <div style="text-align:right">
        <v-dialog v-model="dialog" max-width="500px">   
          <v-btn slot="activator" color="primary" dark class="mb-2">
              Nuevo Respaldo
          </v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6>
                  <v-text-field v-model="name" label="Nombre"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field v-model="data" label="Base de datos"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 >
                  <v-text-field v-model="user" label="Usuario de Mysql"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    v-model="pass"
                    :append-icon="show1 ? 'visibility_off' : 'visibility'"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Contraseña"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 >
                        <v-text-field
                        slot="activator"
                        v-model="date"
                        label="Ingresa la fecha"
                        prepend-icon="event"
                        ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    label="Hora"
                    value="12:30:00"
                    type="time"
                    v-model="hora"
                    suffix="PST"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
    </div>
    
    <br/>
    <v-toolbar flat color="obsidian">
      <v-toolbar-title>Mis respaldos </v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.name_db }}</td>
        <td class="text-xs-left">{{ props.item.date_backup }}</td>
        <td class="text-xs-left">{{ props.item.time_backup }}</td>
        <td class="justify-center layout px-0">
          <v-icon 
            small
            class="mr-2"
            @click="ejec()"
            v-if="props.item.status == 'false'"
            >
            backup
          </v-icon>
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item.id)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item.id)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import { API } from '../Servicios/axios.js';
  export default {
    data: () => ({
      show1: false,
      password: 'Password',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => ('The email and password you entered don\'t match')
      },
      dates: new Date().toISOString().substr(0, 10),
      menu: false,
      editar: false,
      name: '',
      id:'',
      data: '',
      user: '',
      pass: '',
      hora: '',
      date:'',
      modal: false,
      menu2: false,
      dialog: false,
      headers: [
        {
          text: 'ID',
          align: 'left',
          value: 'id'
        },
        { text: 'Nombre', value: 'name' },
        { text: 'Base de datos', value: 'fat' },
        { text: 'fecha', value: 'carbs' },
        { text: 'Hora', value: 'protein' },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        data: '',
        user: '',
        pass: '',
        hora: '',
        date:''
      },
      defaultItem: {
        name: '',
        data: '',
        user: '',
        pass: '',
        hora: '',
        date:''
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      computedDateFormatted () {
        return this.formatDate(this.date)
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
        click () {
            this.dialog=true
        },
      initialize () {
        API.get('v1/settings').then((response) =>{
            this.desserts = response.data
        })
      },

      editItem (item) {
        API.get('v1/settings/'+item).then((response) =>{
            this.id=response.data.id
            this.name=response.data.name
            this.data=response.data.name_db
            this.user=response.data.user_db
            this.pass=response.data.password_db
            this.date=response.data.date_backup
            this.hora=response.data.time_backup
            this.editar=true
           })
        this.dialog = true
      },

      deleteItem (item) {
        API.delete('v1/settings/'+item).then(() =>{
            this.initialize()
           })
      },
      ejec(){
        console.log('soy un metodo we :c')
      },
      close () {
        this.dialog = false
      },

      save () {
          if(this.editar == false){
              API.post('v1/settings',{
                "name": this.name,
                "name_db": this.data,
                "user_db": this.user,
                "password_db": this.pass,
                "date_backup": this.date,
                "time_backup": this.hora,
                "status":"false"
              }).then(() =>{
                    this.initialize()
              })
          }else{
              API.put('v1/settings/'+this.id,{
                "name": this.name,
                "name_db": this.data,
                "user_db": this.user,
                "password_db": this.pass,
                "date_backup": this.date,
                "time_backup": this.hora
              }).then(() =>{
                  this.editar=false
                  this.initialize()
              })
          }
        this.close()
      }
    }
  }
</script>