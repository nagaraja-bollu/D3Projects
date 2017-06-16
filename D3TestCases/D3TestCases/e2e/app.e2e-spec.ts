import { D3TestPage } from './app.po';

describe('d3-test App', () => {
  let page: D3TestPage;

  beforeEach(() => {
    page = new D3TestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
