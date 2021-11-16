<template>
  <div class="lean-canvas pt-5">
    <div class="action-bar">
      <b-button variant="primary" size="sm" @click="logout">Logout</b-button>
      <span class="mx-3">User: {{user.name}}</span>
    </div>
    <b-row class="top-row" no-gutters>
      <!-- COl 1-->
      <b-col class="border-all full-col d-flex flex-column justify-content-between" md="2" offset-md="1">
        <div class="canvas-section p-1">
          <h5><strong>Problem:</strong></h5>
          <ul class="canvas-list">
            <TaskItem v-for="(item,i) in data.problems" :key="i" :item="item" @delete="deleteItem"/>
          </ul>
          <b-input-group size="sm">
            <template v-slot:append>
              <b-button
                  class="shadow-none"
                  variant="primary"
                  size="sm"
                  @click="(e) => {addNew('problem',inputs.newProblem)}"
              >+
              </b-button>
            </template>
            <b-input v-model="inputs.newProblem" placeholder="new problem ..."></b-input>
          </b-input-group>
        </div>
        <div class="canvas-section border-top p-1 pb-5">
          <h6><strong>Existing Alternatives:</strong></h6>
          <ul class="canvas-list">
            <TaskItem v-for="(item,i) in data.alternatives" :key="i" :item="item" @delete="deleteItem"/>
          </ul>
          <b-input-group size="sm">
            <template v-slot:append>
              <b-button
                  class="shadow-none"
                  variant="primary"
                  size="sm"
                  @click="(e) => {addNew('alternative',inputs.newAlternative)}"
              >+
              </b-button>
            </template>
            <b-input v-model="inputs.newAlternative" placeholder="new alternative ..."></b-input>
          </b-input-group>
        </div>
      </b-col>
      <!-- COl 2-->
      <b-col class="border-all full-col d-flex flex-column justify-content-between" md="2">
        <div class="canvas-section h-50 p-1">
          <h5><strong>Solution:</strong></h5>
          <ul class="canvas-list">
            <TaskItem v-for="(item,i) in data.solutions" :key="i" :item="item" @delete="deleteItem"/>
          </ul>
          <b-input-group size="sm">
            <template v-slot:append>
              <b-button
                  class="shadow-none"
                  variant="primary"
                  size="sm"
                  @click="(e) => {addNew('solution',inputs.newSolution)}"
              >+
              </b-button>
            </template>
            <b-input v-model="inputs.newSolution" placeholder="new solution ..."></b-input>
          </b-input-group>
        </div>
        <div class="canvas-section h-50 p-1 border-top">
          <h5><strong>Key Metrics:</strong></h5>
          <ul class="canvas-list">
            <TaskItem v-for="(item,i) in data.keyMetrics" :key="i" :item="item" @delete="deleteItem"/>
          </ul>
          <b-input-group size="sm">
            <template v-slot:append>
              <b-button
                  class="shadow-none"
                  variant="primary"
                  size="sm"
                  @click="(e) => {addNew('keyMetric',inputs.newKeyMetric)}"
              >+
              </b-button>
            </template>
            <b-input v-model="inputs.newKeyMetric" placeholder="new key ..."></b-input>
          </b-input-group>
        </div>
      </b-col>
      <!-- COl 3-->
      <b-col class="border-all full-col d-flex flex-column justify-content-between" md="2">
        <div class="canvas-section p-1">
          <h5><strong>Unique Value Proposition:</strong></h5>
          <ul class="canvas-list">
            <TaskItem v-for="(item,i) in data.propositions" :key="i" :item="item" @delete="deleteItem"/>
          </ul>
          <b-input-group size="sm">
            <template v-slot:append>
              <b-button
                  class="shadow-none"
                  variant="primary"
                  size="sm"
                  @click="(e) => {addNew('proposition',inputs.newProposition)}"
              >+
              </b-button>
            </template>
            <b-input v-model="inputs.newProposition" placeholder="new proposition ..."></b-input>
          </b-input-group>
        </div>
        <div class="canvas-section border-top p-1 pb-5">
          <h6><strong>High Level concepts:</strong></h6>
          <ul class="canvas-list">
            <TaskItem v-for="(item,i) in data.concepts" :key="i" :item="item" @delete="deleteItem"/>
          </ul>
          <b-input-group size="sm">
            <template v-slot:append>
              <b-button
                  class="shadow-none"
                  variant="primary"
                  size="sm"
                  @click="(e) => {addNew('concept',inputs.newConcept)}"
              >+
              </b-button>
            </template>
            <b-input v-model="inputs.newConcept" placeholder="new concept ..."></b-input>
          </b-input-group>
        </div>
      </b-col>
      <!-- COl 4-->
      <b-col class="border-all full-col" md="2">
        <div class="canvas-section h-50 p-1">
          <h5><strong>Unfaired Advantage:</strong></h5>
          <ul class="canvas-list">
            <TaskItem v-for="(item,i) in data.advantages" :key="i" :item="item" @delete="deleteItem"/>
          </ul>
          <b-input-group size="sm">
            <template v-slot:append>
              <b-button
                  class="shadow-none"
                  variant="primary"
                  size="sm"
                  @click="(e) => {addNew('advantage',inputs.newAdvantage)}"
              >+
              </b-button>
            </template>
            <b-input v-model="inputs.newAdvantage" placeholder="new advanrage ..."></b-input>
          </b-input-group>
        </div>
        <div class="canvas-section h-50 p-1 border-top">
          <h5><strong>Channels:</strong></h5>
          <ul class="canvas-list">
            <TaskItem v-for="(item,i) in data.channels" :key="i" :item="item" @delete="deleteItem"/>
          </ul>
          <b-input-group size="sm">
            <template v-slot:append>
              <b-button
                  class="shadow-none"
                  variant="primary"
                  size="sm"
                  @click="(e) => {addNew('channel',inputs.newChannel)}"
              >+
              </b-button>
            </template>
            <b-input v-model="inputs.newChannel" placeholder="new channel ..."></b-input>
          </b-input-group>
        </div>
      </b-col>
      <!-- COl 5-->
      <b-col class="border-all full-col d-flex flex-column justify-content-between" md="2">
        <div class="canvas-section p-1">
          <h5><strong>Customer Segments:</strong></h5>
          <ul class="canvas-list">
            <TaskItem v-for="(item,i) in data.customers" :key="i" :item="item" @delete="deleteItem"/>
          </ul>
          <b-input-group size="sm">
            <template v-slot:append>
              <b-button
                  class="shadow-none"
                  variant="primary"
                  size="sm"
                  @click="(e) => {addNew('customer',inputs.newCustomer)}"
              >+
              </b-button>
            </template>
            <b-input v-model="inputs.newCustomer" placeholder="new customer type ..."></b-input>
          </b-input-group>
        </div>
        <div class="canvas-section border-top p-1 pb-5">
          <h6><strong>Early Adopters:</strong></h6>
          <ul class="canvas-list">
            <TaskItem v-for="(item,i) in data.earlyAdopters" :key="i" :item="item" @delete="deleteItem"/>
          </ul>
          <b-input-group size="sm">
            <template v-slot:append>
              <b-button
                  class="shadow-none"
                  variant="primary"
                  size="sm"
                  @click="(e) => {addNew('earlyAdopter',inputs.newEarlyAdopter)}"
              >+
              </b-button>
            </template>
            <b-input v-model="inputs.newEarlyAdopter" placeholder="new customer ..."></b-input>
          </b-input-group>
        </div>
      </b-col>
    </b-row>
    <b-row class="bottom-row" no-gutters>
      <b-col offset-md="1" md="10">
        <b-row no-gutters>
          <b-col class="canvas-section full-col border-all p-1" md="6">
            <h5><strong>Cost Structure:</strong></h5>
            <ul class="canvas-list">
              <TaskItem v-for="(item,i) in data.costs" :key="i" :item="item" @delete="deleteItem"/>
            </ul>
            <b-input-group size="sm">
              <template v-slot:append>
                <b-button
                    class="shadow-none"
                    variant="primary"
                    size="sm"
                    @click="(e) => {addNew('cost',inputs.newCost)}"
                >+
                </b-button>
              </template>
              <b-input v-model="inputs.newCost" placeholder="new cost ..."></b-input>
            </b-input-group>
          </b-col>
          <b-col class="canvas-section full-col border-all p-1" md="6">
            <h5><strong>Revenue Streams:</strong></h5>
            <ul class="canvas-list">
              <TaskItem v-for="(item,i) in data.revenueStreams" :key="i" :item="item" @delete="deleteItem"/>
            </ul>
            <b-input-group size="sm">
              <template v-slot:append>
                <b-button
                    class="shadow-none"
                    variant="primary"
                    size="sm"
                    @click="(e) => {addNew('revenueStream',inputs.newRevunueStream)}"
                >+
                </b-button>
              </template>
              <b-input v-model="inputs.newRevunueStream" placeholder="new stream ..."></b-input>
            </b-input-group>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import axios from 'axios';
  import TaskItem from "./TaskItem";

  export default {
    name: 'LeanCanvas',
    components: {TaskItem},
    data() {
      return {
        user: {
          id: '',
          username: '',
          name: '',
        },
        data: {
          problems: [],
          alternatives: [],
          solutions: [],
          keyMetrics: [],
          propositions: [],
          concepts: [],
          advantages: [],
          channels: [],
          customers: [],
          earlyAdopters: [],
          revenueStreams: [],
          costs: []
        },
        inputs: {
          newProblem: '',
          newAlternative: '',
          newSolution: '',
          newKeyMetric: '',
          newProposition: '',
          newConcept: '',
          newAdvantage: '',
          newChannel: '',
          newCustomer: '',
          newEarlyAdopter: '',
          newCost: '',
          newRevunueStream: '',
        }
      }
    },
    mounted() {
      document.title = "Nova6 - Lean Canvas";
      this.user = this.$store.state.user;

      this.getAllData();
    },
    methods: {
      /**
       * get all tasks
       *
       * @return {void}
       */
      getAllData() {
        axios.get('/api/task/all')
          .then(res => {
            this.data.problems = res.data.filter(d => d.type === 'problem');
            this.data.alternatives = res.data.filter(d => d.type === 'alternative');
            this.data.solutions = res.data.filter(d => d.type === 'solution');
            this.data.keyMetrics = res.data.filter(d => d.type === 'keyMetric');
            this.data.propositions = res.data.filter(d => d.type === 'proposition');
            this.data.concepts = res.data.filter(d => d.type === 'concept');
            this.data.advantages = res.data.filter(d => d.type === 'advantage');
            this.data.channels = res.data.filter(d => d.type === 'channel');
            this.data.customers = res.data.filter(d => d.type === 'customer');
            this.data.earlyAdopters = res.data.filter(d => d.type === 'earlyAdopter');
            this.data.revenueStreams = res.data.filter(d => d.type === 'revenueStream');
            this.data.costs = res.data.filter(d => d.type === 'cost');
          })
          .catch(err => {
            this.$toasted.show("error fetching data", {
              position: 'top-left',
              duration: 4000,
              type: 'error'
            });
          })
      },
      /**
       * add new Task
       *
       * @return {void}
       */
      addNew(type, title) {
        if (title.trim() === '') {
          return this.$toasted.show("task cant be empty !", {
            position: 'top-left',
            duration: 2000,
            type: 'info'
          });
        }

        let postData = {
          title: title,
          type: type,
          note: ''
        };

        axios.post('/api/task/add', postData)
          .then(res => {
            if (res.data.success) {
              this.getAllData();

              this.inputs = {
                newProblem: '',
                newAlternative: '',
                newSolution: '',
                newKeyMetric: '',
                newProposition: '',
                newConcept: '',
                newAdvantage: '',
                newChannel: '',
                newCustomer: '',
                newEarlyAdopter: '',
                newCost: '',
                newRevunueStream: '',
              };

              this.$toasted.show("Task added!", {
                position: 'top-left',
                duration: 2000,
                type: 'success'
              });
            } else {
              this.$toasted.show("error adding data", {
                position: 'top-left',
                duration: 4000,
                type: 'error'
              });
            }
          })
          .catch(err => {
            this.$toasted.show("error adding data", {
              position: 'top-left',
              duration: 4000,
              type: 'error'
            });
          })
      },
      /**
       * delete task
       *
       * @return {void}
       */
      deleteItem(_id) {
        axios.delete(`/api/task/delete/${_id}`)
          .then(res => {
            if (res.data.success) {
              this.$toasted.show('task deleted !', {
                type: 'success',
                position: 'top-left',
                duration: 2000
              });

              this.getAllData();
            } else {
              this.$toasted.show('error deleting task', {
                type: 'error',
                position: 'top-left',
                duration: 4000
              });
            }
          })
          .catch(err => {
            this.$toasted.show('error deleting task', {
              type: 'error',
              position: 'top-left',
              duration: 4000
            });
          })
      },
      /**
       * logout user
       *
       * @return {void}
       */
      logout() {
        localStorage.removeItem('token');

        this.$toasted.show('logout Successfully !', {
          type: 'success',
          position: 'top-left',
          duration: 2000
        });

        this.$store.commit('clearUser');
        this.$router.push({name: 'Login'});
      }
    }
  }
</script>

<style scoped lang="scss">
  $border-color: black;

  .lean-canvas {

    .top-row {
      .full-col {
        min-height: 450px;
      }
    }

    .bottom-row {
      padding-bottom: 70px;

      .full-col {
        min-height: 150px;
      }
    }

    .border-all {
      border: 1px solid $border-color !important;
    }

    .border-left {
      border-left: 1px solid $border-color !important;
    }

    .border-right {
      border-right: 1px solid $border-color !important;
    }

    .border-top {
      border-top: 1px solid $border-color !important;
    }

    .border-bottom {
      border-bottom: 1px solid $border-color !important;
    }
  }

  .action-bar {
    background-color: #add5f8;
    z-index: 999;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 10px;
  }

  .canvas-section {
    .input-group {
      opacity: 0.2;

      transition: 200ms;
    }

    &:hover {
      .input-group {
        opacity: 1;
      }
    }
  }

  .canvas-list {
    list-style: none;
    padding: 0;
  }
</style>
