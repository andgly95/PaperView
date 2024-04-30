import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'pv-logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
})
export class LogoComponent {
  @Input() @HostBinding('class') size?: 'sm' | 'lg' = 'lg';

  get src(): string {
    return `assets/images/logo-${this.size}.png`;
  }
}
