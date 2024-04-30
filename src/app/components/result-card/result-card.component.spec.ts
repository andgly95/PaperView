import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ResultCardComponent } from './result-card.component';
import { stubPaper } from '../../../testing/stubs';

describe('ResultCardComponent', () => {
  let component: ResultCardComponent;
  let fixture: ComponentFixture<ResultCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultCardComponent);
    component = fixture.componentInstance;
    component.paper = stubPaper;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit clicked event on click', () => {
    spyOn(component.clicked, 'emit');
    const element = fixture.nativeElement.querySelector('.header');
    element.click();
    expect(component.clicked.emit).toHaveBeenCalledWith(component.paper);
  });

  it('should render the paper title', () => {
    const titleElement = fixture.debugElement.query(By.css('h3 span'));
    expect(titleElement.nativeElement.textContent).toContain('Test Paper');
  });

  it('should render the paper authors', () => {
    const authorsElement = fixture.debugElement.query(By.css('.authors'));
    expect(authorsElement.nativeElement.textContent).toContain(
      'Author 1 and Author 2'
    );
  });

  it('should render the paper abstract', () => {
    const abstractElement = fixture.debugElement.query(By.css('.abstract'));
    expect(abstractElement.nativeElement.textContent).toContain(
      'This mock paper presents a novel approach'
    );
  });

  it('should render the published date and publisher', () => {
    const publishedDateElement = fixture.debugElement.query(
      By.css('.published-date')
    );
    expect(publishedDateElement.nativeElement.textContent).toContain(
      'Published by Test Publisher on '
    );
  });

  it('should render the download link', () => {
    const downloadLinkElement = fixture.debugElement.query(
      By.css('.download-btn')
    );
    expect(downloadLinkElement.nativeElement.getAttribute('href')).toBe(
      'https://example.com/download'
    );
  });
});
