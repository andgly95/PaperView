import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KeywordChartComponent } from './keyword-chart.component';

describe('KeywordChartComponent', () => {
  let component: KeywordChartComponent;
  let fixture: ComponentFixture<KeywordChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeywordChartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the chart when keywordData input changes', () => {
    spyOn(component as any, 'initializeChart');
    component.keywordData = [
      { keyword: 'keyword1', count: 5 },
      { keyword: 'keyword2', count: 3 },
    ];
    component.ngOnChanges({
      keywordData: {
        currentValue: component.keywordData,
        previousValue: [],
        firstChange: true,
        isFirstChange: () => true,
      },
    });
    expect((component as any).initializeChart).toHaveBeenCalled();
  });

  it('should update the chart when keywordData or selectedPaperKeywordData input changes', () => {
    spyOn(component as any, 'updateChart');
    component.keywordData = [
      { keyword: 'keyword1', count: 5 },
      { keyword: 'keyword2', count: 3 },
    ];
    component.selectedPaperKeywordData = [
      { keyword: 'keyword1', count: 2 },
      { keyword: 'keyword2', count: 1 },
    ];
    component.ngOnChanges({
      keywordData: {
        currentValue: component.keywordData,
        previousValue: [],
        firstChange: true,
        isFirstChange: () => true,
      },
      selectedPaperKeywordData: {
        currentValue: component.selectedPaperKeywordData,
        previousValue: [],
        firstChange: true,
        isFirstChange: () => true,
      },
    });
    expect((component as any).updateChart).toHaveBeenCalled();
  });

  it('should resize the chart on window resize event', () => {
    const chartMock = jasmine.createSpyObj('Chart', ['resize']);
    (component as any).chart = chartMock;
    component.onResize(new Event('resize'));
    expect(chartMock.resize).toHaveBeenCalledWith(0);
  });

  it('should update the chart data and labels correctly', () => {
    const updateSpy = jasmine.createSpy('update');
    const chartMock = jasmine.createSpyObj('Chart', ['update']);
    chartMock.data = {
      labels: [],
      datasets: [{ data: [] }, { data: [] }],
    };
    chartMock.update = updateSpy;
    (component as any).chart = chartMock;
    component.keywordData = [
      { keyword: 'keyword1', count: 5 },
      { keyword: 'keyword2', count: 3 },
    ];
    component.selectedPaperKeywordData = [
      { keyword: 'keyword1', count: 2 },
      { keyword: 'keyword2', count: 1 },
    ];
    (component as any).updateChart();
    expect(chartMock.data.labels).toEqual(['keyword1', 'keyword2']);
    expect(chartMock.data.datasets[0].data).toEqual([5, 3]);
    expect(chartMock.data.datasets[1].data).toEqual([2, 1]);
    expect(updateSpy).toHaveBeenCalled();
  });
});
