Vue.component('g-button', {
  props: ['icon', 'iconPosition'],
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
