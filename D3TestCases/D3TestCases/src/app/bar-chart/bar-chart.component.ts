import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.createBarChart();
  }

  createBarChart() {
    let width = 1160, height = 600;
    let margin = { top: 100, right: 20, bottom: 30, left: 40 },
      svg = d3.select('#barChart').append('svg')
        .attr('width', width)
        .attr('height', height);
    width = +svg.attr("width") - margin.left - margin.right;
    height = +svg.attr("height") - margin.top - margin.bottom;
    let g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    const data = this.getMockData();
    //const minValue = d3.min(data, x => x);

    let keys = Object.keys(data[0]).slice(0, 6);
    let x0 = d3.scaleBand().rangeRound([0, width]);
    let x1 = d3.scaleBand();
    let y = d3.scaleLinear().rangeRound([height, 0]);
    let z = d3.scaleOrdinal()
      .range(["#98adc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);


    x0.domain(data.map(x => x.Geography));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    y.domain([0, d3.max(data, (d) => d3.max(keys, y => d[y]))]).nice();


    g.append("g")
      .selectAll("g")
      .data(data)
      .enter().append("g")
      .attr('class','geographySection')
      .attr("transform", (d) => { return "translate(" + x0(d.Geography) + ",0)"; })
      .selectAll("rect")
      .data((d) => { return keys.map((key) => { return { key: key, value: d[key], geography: d.Geography }; }); })
      .enter().append("rect")
      .attr("x", (d) => { return x1(d.key); })
      .attr("y", (d) => {
        return y(d.value);
      })
      .attr("width", x1.bandwidth())
      .attr("height", (d) => {
        return height - y(d.value);
      })
      .attr("fill", (d) => { return z(d.key).toString(); })
      .on('mouseover', (d) => {
        d3.select('#toolTip').classed('displayNone', false);

        const xPosition = d3.event.pageX + 25;
        const yPosition = d3.event.pageY - 25;
        d3.event.currentTarget.style.opacity = 0.7;
        d3.select('#toolTip')
          .style('left', xPosition + 'px')
          .style('top', yPosition + 'px')
          .select('#toolTipHeader')
          .text(d.geography);
        d3.select('#toolTip')
          .style('left', xPosition + 'px')
          .style('top', yPosition + 'px')
          .select('#toolTipValue1')
          .text(`Year: ${d.key}`);
        d3.select('#toolTip')
          .style('left', xPosition + 'px')
          .style('top', yPosition + 'px')
          .select('#toolTipValue2')
          .text(`Value: ${d.value}`);
        
      }).on('mouseout', (d) => {
        d3.event.currentTarget.style.opacity = 1;
        d3.select('#toolTip').selectAll('div').text('');
        d3.select('#toolTip').classed('displayNone', true);
      });

    g.append("g")
      .attr("class", "axis x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x0));

    g.append("g")
      .attr("class", "axis y-axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
      .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start");

    let legend = g.append("g")
      .attr('id','legendSection')
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(keys.slice().reverse())
      .enter().append("g")
      .attr("transform", (d, i) => { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", d => {
        return z(d).toString();
      });

    legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text((d) => { return d; });


  }

  getMockData() {
    return [
      {
        '2016': "100.4"
        , '2017': "103.9"
        , '2018': "80.6"
        , '2019': "222.1"
        , '2020': "200.9"
        , '2021': "50.2"
        , 'Category': "Beer"
        , 'DataType': "Total Volume"
        , 'Geography': "India"
        , 'StatsType': ""
        , 'Unit': "000 litres"
      },
      {
        '2016': "400.4"
        , '2017': "222.9"
        , '2018': "800.6"
        , '2019': "1000.1"
        , '2020': "400.9"
        , '2021': "122.2"
        , 'Category': "Beer"
        , 'DataType': "Total Volume"
        , 'Geography': "US"
        , 'StatsType': ""
        , 'Unit': "000 litres"
      },
      {
        '2016': "500.4"
        , '2017': "300.9"
        , '2018': "200.6"
        , '2019': "1000.1"
        , '2020': "100.9"
        , '2021': "70.2"
        , 'Category': "Beer"
        , 'DataType': "Total Volume"
        , 'Geography': "Australia"
        , 'StatsType': ""
        , 'Unit': "000 litres"
      },
      {
        '2016': "200.4"
        , '2017': "300.9"
        , '2018': "500.6"
        , '2019': "100.1"
        , '2020': "500.9"
        , '2021': "400.2"
        , 'Category': "Beer"
        , 'DataType': "Total Volume"
        , 'Geography': "UK"
        , 'StatsType': ""
        , 'Unit': "000 litres"
      }
    ];
  }



}
