import { HighlightPipe } from './highlight.pipe';

describe('HighlightPipe', () => {
  let pipe: HighlightPipe;

  beforeEach(() => {
    pipe = new HighlightPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the original text when keywords are empty or not provided', () => {
    const text = 'This is a sample text';
    expect(pipe.transform(text, [])).toBe(text);
  });

  it('should highlight the keywords in the text', () => {
    const text = 'This is a sample text with keywords';
    const keywords = ['sample', 'keywords'];
    const expectedOutput =
      'This is a <mark>sample</mark> text with <mark>keywords</mark>';
    expect(pipe.transform(text, keywords)).toBe(expectedOutput);
  });

  it('should highlight the keywords case-insensitively', () => {
    const text = 'This is a Sample Text with Keywords';
    const keywords = ['sample', 'keywords'];
    const expectedOutput =
      'This is a <mark>Sample</mark> Text with <mark>Keywords</mark>';
    expect(pipe.transform(text, keywords)).toBe(expectedOutput);
  });

  it('should handle multiple occurrences of the same keyword', () => {
    const text = 'This is a sample text with sample keywords';
    const keywords = ['sample'];
    const expectedOutput =
      'This is a <mark>sample</mark> text with <mark>sample</mark> keywords';
    expect(pipe.transform(text, keywords)).toBe(expectedOutput);
  });
});
