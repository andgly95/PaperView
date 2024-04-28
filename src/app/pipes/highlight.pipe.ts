import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone: true,
})
export class HighlightPipe implements PipeTransform {
  transform(text: string, keywords: string[]): string {
    if (!text || !keywords || keywords.length === 0) {
      return text;
    }

    const regex = new RegExp(keywords.join('|'), 'gi');
    return text.replace(regex, '<mark>$&</mark>');
  }
}
