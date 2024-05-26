<template>
    <div>
      <label :for="name">{{ label }}</label>
      <input :type="type" :name="name" v-bind="$attrs" v-on="$listeners" v-model="model">
    </div>
  </template>
  
  <script>
  export default {
    props: {
      name: {
        type: String,
        required: true
      },
      label: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'text'
      },
      value: [String, Number]
    },
    computed: {
      model: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit('input', value);
        }
      }
    }
  };
  </script>
  
  <style>
  </style>
  