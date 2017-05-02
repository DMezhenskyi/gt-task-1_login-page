import { GreentubeTask1Page } from './app.po';

describe('greentube-task1 App', () => {
  let page: GreentubeTask1Page;

  beforeEach(() => {
    page = new GreentubeTask1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
