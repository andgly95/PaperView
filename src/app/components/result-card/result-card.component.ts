import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { Result } from '../../interfaces';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { AuthorArrayPipe } from '../../pipes/author-array.pipe';
import { HighlightPipe } from '../../pipes/highlight.pipe';
import { DownloadIconComponent } from '../icons/download-icon/download-icon.component';

@Component({
  selector: 'pv-result-card',
  standalone: true,
  imports: [
    DatePipe,
    TitleCasePipe,
    AuthorArrayPipe,
    HighlightPipe,
    DownloadIconComponent,
  ],
  templateUrl: './result-card.component.html',
  styleUrl: './result-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultCardComponent {
  @Input() paper!: Result;
  @Input() keywords: string[] = [];
  @Output() hovered = new EventEmitter<Result>();
  @Output() clicked = new EventEmitter<Result>();

  @HostListener('mouseover')
  onHover() {
    this.hovered.emit(this.paper);
  }

  @HostListener('click')
  onClick() {
    this.clicked.emit(this.paper);
  }

  public getLinkUrl(type: string): string | undefined {
    const link = this.paper?.links.find((link) => link.type === type);
    return link ? link.url : undefined;
  }
}
