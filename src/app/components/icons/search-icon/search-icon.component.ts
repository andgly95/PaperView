import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'pv-search-icon',
  standalone: true,
  imports: [],
  template: `<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="#333"
  >
    <path
      fill-rule="evenodd"
      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
      clip-rule="evenodd"
    />
  </svg>`,
  styles: [
    `
      :host {
        &.size-large svg {
          width: 48px;
          height: 48px;
        }
        &.size-medium svg {
          width: 32px;
          height: 32px;
        }
        &.size-small svg {
          width: 24px;
          height: 24px;
        }
      }
    `,
  ],
})
export class SearchIconComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @HostBinding('class') get hostClass(): string {
    return `size-${this.size}`;
  }
}
