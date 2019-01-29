<template>
<div>
  <div><h1 style="text-align:center">
    Backup
    </h1><br></div>  
  <div style="text-align:'left';">
    <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn slot="activator" color="primary" dark>Respaldar Base de Datos</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Ingreso de Datos</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="nombre" label="Nombre*" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="baseDatos" label="Base de Datos" hint="example of helper text only on focus"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="Usuario de Mysql*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                  v-model="Usuario"
                ></v-text-field>
              </v-flex>              
              <v-flex xs12>
                <v-text-field v-model="contrasena" label="Password*" type="password" required></v-text-field>
              </v-flex>              
      <v-flex xs12 lg6>
        <v-menu
          ref="menu1"
          :close-on-content-click="false"
          v-model="menu1"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="dateFormatted"
            label="Fecha"
            hint="MM/DD/YYYY format"
            persistent-hint
            prepend-icon="event"
            @blur="date = parseDate(dateFormatted)"
          ></v-text-field>
          <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
        </v-menu>
        <!-- <p>Date in ISO format: <strong>{{ date }}</strong></p> -->
      </v-flex>
              <v-flex xs11 sm5>
      <v-menu
        ref="menu"
        :close-on-content-click="false"
        v-model="menu2"
        :nudge-right="40"
        :return-value.sync="time"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="time"
          label="Hora"
          prepend-icon="access_time"
          readonly
        ></v-text-field>
        <v-time-picker
          v-if="menu2"
          v-model="time"
          full-width
          @change="$refs.menu.save(time)"
        ></v-time-picker>
      </v-menu>
    </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
  </div>
<br><br>
  <v-data-table
    :headers="headers"
    :items="desserts"
    class="elevation-1"
  >
    <template slot="headerCell" slot-scope="props">
      <v-tooltip bottom>
        <span slot="activator">
          {{ props.header.text }}
        </span>
        <span>
          {{ props.header.text }}
        </span>
      </v-tooltip>
    </template>
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.calories }}</td>
      <td class="text-xs-right">{{ props.item.fat }}</td>
      <td class="text-xs-right">{{ props.item.carbs }}</td>
      <td class="text-xs-right">{{ props.item.protein }}</td>
      <td class="text-xs-right"><div>
            <v-btn color="primary" fab small dark>
              <v-icon>backup</v-icon>
            </v-btn>
            <v-btn color="error" fab small dark>
              <v-icon @click="deleteItem(props.item.id)">delete</v-icon>
            </v-btn>
            <v-btn color="info" fab small dark>
              <v-icon @click="editItem(props.item.id)">edit</v-icon>
            </v-btn>
          </div>
          
          </td>
    </template>
  </v-data-table>
</div>
</template>

<script>

  export default {
    data: vm => ({
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      menu2: false,
       dialog: false,
        time: null,
        
        modal2: false,     
        headers: [
          {
            text: 'Nombre',
            align: 'center',
            sortable: false,
            value: 'name'
          },
          { text: 'Base de Datos',align: 'center', value: 'calories' },
          { text: 'Usuario',align: 'center', value: 'fat' },
          { text: 'Fecha',align: 'center', value: 'carbs' },
          { text: 'Hora', align: 'center',value: 'protein' },
          { text: 'Acciones', align: 'center', value: 'iron' }
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            
          },
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            
          }
          ]

    }),
     computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
      
    },

    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      }
    },
    methods: {
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      initialize () {
        API.get('v1/settings').then((response) =>{
            this.desserts = response.data
        })
      },

      editItem (item) {
        API.get('v1/settings/'+item).then((response) =>{            
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