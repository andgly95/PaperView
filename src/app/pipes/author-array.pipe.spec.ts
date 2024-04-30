import { AuthorArrayPipe } from './author-array.pipe';
import { Author } from '../interfaces/api.interfaces';

describe('AuthorArrayPipe', () => {
  let pipe: AuthorArrayPipe;

  beforeEach(() => {
    pipe = new AuthorArrayPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return an empty string when the input is an empty array', () => {
    expect(pipe.transform([])).toBe('');
  });

  it('should return the author name when the input has only one author', () => {
    const authors: Author[] = [{ name: 'John Doe' }];
    expect(pipe.transform(authors)).toBe('By John Doe');
  });

  it('should return the author names joined by "and" when the input has multiple authors', () => {
    const authors: Author[] = [
      { name: 'John Doe' },
      { name: 'Jane Smith' },
      { name: 'Mike Johnson' },
    ];
    expect(pipe.transform(authors)).toBe(
      'By John Doe, Jane Smith and Mike Johnson'
    );
  });
});
