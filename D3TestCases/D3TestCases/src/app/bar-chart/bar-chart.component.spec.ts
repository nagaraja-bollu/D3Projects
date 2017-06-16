import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as d3 from 'd3';
import { BarChartComponent } from './bar-chart.component';

describe('BarChartComponent', () => {
  let component: BarChartComponent;
  let fixture: ComponentFixture<BarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BarChartComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have svg element', (() => {
    const element = d3.select('#barChart').select('svg').node();
    expect(element).toBeDefined();
  }));

  it('should have legend selection', (() => {
    const element = d3.select('#barChart').selectAll('g').select('#legendSection').node();
    expect(element).toBeDefined();
  }));

  it('should have 4 geography Sections', (() => {
    const element = d3.select('#barChart').selectAll('.geographySection').nodes();
    expect(element.length).toBe(4);
  }));

  it('should have x-axis and y-axis', (() => {
    const xAxiselement = d3.select('#barChart').selectAll('.x-axis').nodes();
    const yAxiselement = d3.select('#barChart').selectAll('.y-axis').nodes();
    expect(xAxiselement.length).toBe(1);
    expect(yAxiselement.length).toBe(1);
  }));

  it('should show tooltip on mouse hover', (() => {

    let rectElements = d3.select('#barChart').selectAll('.geographySection').selectAll('rect').nodes();
    rectElements.forEach((rect: SVGTextElement) => {
      rect.dispatchEvent(new Event('mouseover'));
    });
    expect(d3.select('#toolTip').classed('displayNone')).toBe(false);
  }));

  it('compare tooltip data to mockup data', (() => {

    let rectElement = d3.select('#barChart').selectAll('.geographySection').selectAll('rect').nodes()[0] as SVGTextElement;
    rectElement.dispatchEvent(new Event('mouseover'));
    expect(d3.select('#toolTipHeader').text()).toBe('India');
    expect(d3.select('#toolTipValue1').text()).toBe('Year: 2016');
    expect(d3.select('#toolTipValue2').text()).toBe('Value: 100.4');
    expect(d3.select('#toolTip').classed('displayNone')).toBe(false);
  }));

  it('should hide tooltip on mouse-out', (() => {

    let rectElements = d3.select('#barChart').selectAll('.geographySection').selectAll('rect').nodes();
    rectElements.forEach((rect: SVGTextElement) => {
      rect.dispatchEvent(new Event('mouseout'));
    });
    expect(d3.select('#toolTip').classed('displayNone')).toBe(true);
  }));

  it('should contains the 6 different colors for 6 years display data', (() => {
    const firstGeographySelection = d3.select('#barChart').select('.geographySection').selectAll('rect').nodes();
    const colorsList = ["#98adc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"];
    firstGeographySelection.forEach((element: SVGRectElement, index) => {
      expect(element.getAttribute('fill')).toBe(colorsList[index]);
    });
  }));
});
