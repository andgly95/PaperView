import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LogoComponent } from '../../components/logo/logo.component';
import { SearchIconComponent } from '../../components/icons/search-icon/search-icon.component';

@Component({
  selector: 'pv-home',
  standalone: true,
  imports: [FormsModule, RouterModule, LogoComponent, SearchIconComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private _router = inject(Router);

  searchInput = signal<string>('');

  navigateToSearch(): void {
    this._router.navigate(['/search'], {
      queryParams: { q: this.searchInput() },
    });
  }
}
