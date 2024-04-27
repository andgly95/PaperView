import { Component, Input } from '@angular/core';
import { Result } from '../../interfaces';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { AuthorArrayPipe } from '../../pipes/author-array.pipe';

@Component({
  selector: 'pv-result-card',
  standalone: true,
  imports: [DatePipe, TitleCasePipe, AuthorArrayPipe],
  templateUrl: './result-card.component.html',
  styleUrl: './result-card.component.scss',
})
export class ResultCardComponent {
  @Input() paper?: Result;

  get thumbnailLink(): string | undefined {
    const thumbnailLink = this.paper?.links.find(
      (link) => link.type === 'thumbnail_m'
    );
    return thumbnailLink ? thumbnailLink.url : undefined;
  }
}
