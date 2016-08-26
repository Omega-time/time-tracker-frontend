import { PaysafeInternsTimeTrackingPage } from './app.po';

describe('paysafe-interns-time-tracking App', function() {
  let page: PaysafeInternsTimeTrackingPage;

  beforeEach(() => {
    page = new PaysafeInternsTimeTrackingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
