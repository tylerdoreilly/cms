<template>
    <div class="dropdown" v-bind:class="{'open':openSuggestion}">
      <input
        class="form-control"
        type="text"
        :value="value"
        @input="updateValue($event.target.value)"
        @keydown.enter="enter"
        @keydown.down="down"
        @keydown.up="up"
      />
      <ul class="dropdown-menu">
        <li v-for="(item, index) in matches" :key="item.city" 
          v-bind:class="{'active': isActive(index)}"
          @click="suggestionClick(index)">

          <a href="#">{{ item.city }} <small>{{ item.state }}</small></a>
        </li>
      </ul>
    </div>
  </template>

<script>
  export default {
    name: 'exai-autocomplete',

    props: {
      value: {
        type: String,
        required: true,
      },

      suggestions: {
        type: Array,
        required: true,
      },
    },

    data () {
        return {
            open: false,
            current: 0
        }
    },

    computed: {
        // Filtering the suggestion based on the input
        matches () {
            return this.suggestions.filter((obj) => {
            return obj.city.indexOf(this.value) >= 0
            })
        },

        openSuggestion () {
            return this.selection !== '' &&
                    this.matches.length !== 0 &&
                    this.open === true
             }
    },

    methods: {

        // Triggered the input event to cascade the updates to
        // parent component
        updateValue (value) {
        if (this.open === false) {
            this.open = true
            this.current = 0
        }
        this.$emit('input', value)
        },

        // When enter key pressed on the input
        enter () {
        this.$emit('input', this.matches[this.current].city)
        this.open = false
        },

        // When up arrow pressed while suggestions are open
        up () {
        if (this.current > 0) {
            this.current--
        }
        },

        // When down arrow pressed while suggestions are open
        down () {
        if (this.current < this.matches.length - 1) {
            this.current++
        }
        },

        // For highlighting element
        isActive (index) {
        return index === this.current
        },

        // When one of the suggestion is clicked
        suggestionClick (index) {
        this.$emit('input', this.matches[index].city)
        this.open = false
        }

    }
  };
</script>

<style lang="scss">
    .dropdown{
      position:relative;
    }
    .dropdown.open .dropdown-menu{
      display:block
    }
    .dropdown-menu{
      border:1px solid $border;
      display:none;
      width:auto;
      max-width:200px;
      z-index:50;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
      padding:10px;
    }

</style>