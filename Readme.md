# D3 chart test cases in an Angular2 component using Jasmine
  ## Introduction
Unit testing is a software development process in which the smallest testable parts of an application, called units, are individually and independently scrutinized for proper operation. Unit testing is often automated but it can also be done manually. Unit tests are typically written and run by software developers to ensure that code meets its design and behaves as intended
### D3
D3 (Data-Driven Documents or D3.js) is a JavaScript library for visualizing data using web standards. D3 helps you bring data to life using SVG, Canvas and HTML. D3 combines powerful visualization and interaction techniques with a data-driven approach to DOM manipulation, giving you the full capabilities of modern browsers and the freedom to design the right visual interface for your data.

### Angular

Angular JS is an open source framework built over JavaScript. It was built by the developers at Google. This framework was used to overcome obstacles encountered while working with Single Page applications. Also, testing was considered as a key aspect while building the framework. It comes with dependency injection built-in, which makes testing components much easier, because you can pass in a component's dependencies. Components that have their dependencies injected allow them to be easily mocked on a test by test basis, without having to mess with any global variables that could inadvertently affect another test.

### Karma
Karma is a JavaScript command line tool that can be used to spawn a web server which loads your application's source code and executes your tests. You can configure Karma to run against a number of browsers, which is useful for being confident that your application works on all browsers you need to support. Karma is executed on the command line and will display the results of your tests on the command line once they have run in the browser.

### Jasmine
Jasmine is a behavior driven development framework for JavaScript that has become the most popular choice for testing AngularJS applications. Jasmine provides functions to help with structuring your tests and also making assertions. As your tests grow, keeping them well structured and documented is vital, and Jasmine helps achieve this.

This article will give you basic understanding of writing unit testcases using jasmine for d3 charts in Angular2.

### Test cases types
Test cases are divided into 3 types.
1. UI Testing
2. Attribute Testing
3. Scenario's Testing

### UI Testing
  UI Testing will covers from below list.
  1. Html elements testing
  2. Style properties of a html element like color, width, positions(x,y), height , etc.
  3. Data binded to html elements
 
 #### 1. Html elements testing
 #### Example: Testing 6 rectangle bar colors in the chart
 ```
it('should contains the 6 different colors for 6 years display data', (() => {
    const firstGeographySelection = d3.select('#barChart').select('.geographySection').selectAll('rect').nodes();
    const colorsList = ["#98adc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"];
    firstGeographySelection.forEach((element: SVGRectElement, index) => {
      expect(element.getAttribute('fill')).toBe(colorsList[index]);
    });
  }));
```
  #### 2. Style properties of a html element like color, width, positions(x,y), height , etc.
  #### Example: Testing SVG element in the chart
  ```
  it('should have svg element', (() => {
    const element = d3.select('#barChart').select('svg').node();
    expect(element).toBeDefined();
  }));
  
  ```
  
   #### 3. Data binded to html elements
  #### Example: compare tooltip data to mockup data
  ```
 it('compare tooltip data to mockup data', (() => {
    let rectElement = d3.select('#barChart').selectAll('.geographySection').selectAll('rect').nodes()[0] as SVGTextElement;
    rectElement.dispatchEvent(new Event('mouseover'));
    expect(d3.select('#toolTipHeader').text()).toBe('India');
    expect(d3.select('#toolTipValue1').text()).toBe('Year: 2016');
    expect(d3.select('#toolTipValue2').text()).toBe('Value: 100.4');
    expect(d3.select('#toolTip').classed('displayNone')).toBe(false);
  }));
  
  ```
  
### Attribute Testing
  It includes testing of all kind of existed html attributes as well as custom attributes.
  Attributes like id, class, "data-any-custom-attribute-name" , etc.,
  #### Example: Testing class names for x-axis and y-axis in the chart
  ```
  it('should have x-axis and y-axis', (() => {
    const xAxiselement = d3.select('#barChart').selectAll('.x-axis').nodes();
    const yAxiselement = d3.select('#barChart').selectAll('.y-axis').nodes();
    expect(xAxiselement.length).toBe(1);
    expect(yAxiselement.length).toBe(1);
  }));
  ```
### Scenario's Testing
  It includes scenario wise testing of event actions like button click, mouseover, mouseout, foucsin, focusout events.
  
  ### Example: Displaying tooltip on mouseover of rectangle bars in the chart
  ```
  it('should show tooltip on mouse hover', (() => {

    let rectElements = d3.select('#barChart').selectAll('.geographySection').selectAll('rect').nodes();
    rectElements.forEach((rect: SVGTextElement) => {
      rect.dispatchEvent(new Event('mouseover'));
    });
    expect(d3.select('#toolTip').classed('displayNone')).toBe(false);
  }));
  ```
  
  #### Example: Hiding tooltip on mouseout of rectangle bars in the chart
  ```
  it('should hide tooltip on mouse-out', (() => {

    let rectElements = d3.select('#barChart').selectAll('.geographySection').selectAll('rect').nodes();
    rectElements.forEach((rect: SVGTextElement) => {
      rect.dispatchEvent(new Event('mouseout'));
    });
    expect(d3.select('#toolTip').classed('displayNone')).toBe(true);
  }));
  ```
  
### Requirements for this project
  1. Install nodeJS on your computer
  2. Install Angular-cli using the command "npm install -g @angular/cli"
  
 ### How to run the application
    Visual studio has used as en editor for this application.
  1. Run the command "npm install" for installing all node packages
  2. Run the command "ng s -o" for building and running the application
  
 
 ### References
  1. https://docs.angularjs.org/guide/unit-testing
  2. https://github.com/d3/d3/blob/master/API.md
  
 
  
  
  
  
  
  
  
  
  
  
  
