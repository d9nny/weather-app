import { WeatherDashboardPage } from './app.po';

describe('weather-dashboard App', () => {
  let page: WeatherDashboardPage;

  beforeEach(() => {
    page = new WeatherDashboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
