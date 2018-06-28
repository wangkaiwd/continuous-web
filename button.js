Vue.component('g-button', {
  props: {
    icon: {},
    iconPosition: {
      type: String,
      default: 'left',
      validator: function (value) {
        console.log('value', value);
        if (value !== 'left' && value !== 'right') {
          return false;
        }
      }
    }
  },
  template: `
    <button class="g-button">
      <svg 
        v-if="icon" 
        class="icon"
        :class="'icon-'+iconPosition"
        aria-hidden="true"
      >
        <use :xlink:href="'#i-'+ icon"></use>
      </svg>
      <slot></slot>
    </button> 
  `,
})
