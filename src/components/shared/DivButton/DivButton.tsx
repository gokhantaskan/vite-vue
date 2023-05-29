type ClickHandler = (event?: MouseEvent | KeyboardEvent) => any;

const DivButton = defineComponent({
  props: {
    press: {
      type: Function as unknown as ClickHandler,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onPress(event: MouseEvent | KeyboardEvent) {
      if (this.disabled) return;
      this.press(event);
    },
  },
  render() {
    return (
      <div
        class={[this.disabled ? "opacity-75" : "cursor-pointer"]}
        role="button"
        tabindex="0"
        aria-disabled={this.disabled}
        onClick={this.onPress}
        onKeydown={(event: KeyboardEvent) => {
          if (event.key === "Enter" || event.key === " ") {
            this.onPress(event);
          }
        }}
      >
        {this.$slots.default?.()}
      </div>
    );
  },
});

export default DivButton;
