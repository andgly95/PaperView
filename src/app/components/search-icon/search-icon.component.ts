import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'pv-search-icon',
  standalone: true,
  imports: [],
  templateUrl: './search-icon.component.html',
  styleUrl: './search-icon.component.scss',
})
export class SearchIconComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @HostBinding('class') get hostClass(): string {
    return `size-${this.size}`;
  }
}
