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
          <span class="headline">Ingreo de Datos</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Nombre*" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Base de Datos" hint="example of helper text only on focus"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="Usuario de Mysql*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-flex>              
              <v-flex xs12>
                <v-text-field label="Password*" type="password" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password*" type="password" required></v-text-field>
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
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
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
              <v-icon>delete</v-icon>
            </v-btn>
            <v-btn color="info" fab small dark>
              <v-icon>edit</v-icon>
            </v-btn>
          </div>
          
          </td>
    </template>
  </v-data-table>
</div>
</template>

<script>
  export default {
    // data () {
    //   return {
    //     dialog: false,        
    //     headers: [
    //       {
    //         text: 'Dessert (100g serving)',
    //         align: 'left',
    //         sortable: false,
    //         value: 'name'
    //       },
    //       { text: 'Calories', value: 'calories' },
    //       { text: 'Fat (g)', value: 'fat' },
    //       { text: 'Carbs (g)', value: 'carbs' },
    //       { text: 'Protein (g)', value: 'protein' },
    //       { text: 'Iron (%)', value: 'iron' }
    //     ],
       
    //   }
    // },
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
      }
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
      }
    }
  }
</script>