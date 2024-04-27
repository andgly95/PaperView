import { Pipe, PipeTransform } from '@angular/core';
import { Author } from '../interfaces';

@Pipe({
  name: 'authorArray',
  standalone: true,
})
export class AuthorArrayPipe implements PipeTransform {
  transform(value: Author[]): string {
    if (!value || value.length === 0) {
      return '';
    }

    if (value.length === 1) {
      return `By ${value[0].name}`;
    }

    const lastItem = value.pop()?.name;
    return `By ${value
      .map((author) => author.name)
      .join(', ')} and ${lastItem}`;
  }
}
