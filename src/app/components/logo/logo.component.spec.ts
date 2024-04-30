import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoComponent } from './logo.component';

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default size of "lg"', () => {
    expect(component.size).toBe('lg');
  });

  it('should apply the size class to the host element', () => {
    expect(fixture.nativeElement.classList).toContain('lg');
  });

  it('should set the correct src for the logo image', () => {
    expect(component.src).toBe('assets/logo-lg.png');
  });

  it('should update the size and src when input changes', () => {
    component.size = 'sm';
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).toContain('sm');
    expect(component.src).toBe('assets/logo-sm.png');
  });

  it('should have an img element with the correct src and alt attributes', () => {
    const imgElement = fixture.nativeElement.querySelector('img');
    expect(imgElement).toBeTruthy();
    expect(imgElement.getAttribute('src')).toBe('assets/logo-lg.png');
    expect(imgElement.getAttribute('alt')).toBe('PaperView logo');
  });
});
