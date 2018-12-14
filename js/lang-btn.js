/**
 * Autonomous custom element `SwitchButton` (see [spec][1])
 *
 * [1]: https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-autonomous-example
 */
class SwitchButton extends HTMLElement {
   connectedCallback() {
      const className = this.dataset.className;
      this.classList.add(className);

      const labelText = this.textContent.trim();
      const labelId = this.getInputId(labelText);
      const ariaChecked = `aria-checked="${String(this.hasAttribute('data-aria-checked'))}"`;

      const buttonTemplate = document.createElement('template');
      buttonTemplate.innerHTML = `
                <span class="${className}__label" id="${labelId}-label">
                    ${labelText}
                </span>
                <button
                    type="button"
                    role="switch"
                    class="button
                    ${className}__control"
                    ${ariaChecked}
                    aria-labelledby="${labelId}-label"
                >
                    <span class="state state--true">PL</span>
                    <span class="state state--false">ENG</span>
                </button>
                `;
      this.innerHTML = '';
      this.appendChild(buttonTemplate.content.cloneNode(true));

      this.querySelector('button').addEventListener('click', this.check);
   }

   getInputId(labelText) {
      return labelText
         // Remove all characters but
         // letters, numbers, whitespace and dash
         .replace(/[^\w\s-]/g, '')
         // Replace all whitespace characters with dash
         .replace(/\s/g, '-')
         .toLowerCase();
   }

   check(event) {
      const isPressed = event.currentTarget.getAttribute('aria-checked') === 'true';
      event.currentTarget.setAttribute('aria-checked', String(!isPressed));
   }
};

window.customElements.define('switch-button', SwitchButton);