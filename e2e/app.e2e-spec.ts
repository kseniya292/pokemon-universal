import { VocabUniversalPage } from './app.po';

describe('vocab-universal App', () => {
  let page: VocabUniversalPage;

  beforeEach(() => {
    page = new VocabUniversalPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
