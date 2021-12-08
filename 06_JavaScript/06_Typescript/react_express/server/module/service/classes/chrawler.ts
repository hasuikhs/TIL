import { Builder, By, Key, ThenableWebDriver, until } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import * as chromeDriver from 'chromedriver';
import ChrawlerInterface from '../interfaces/chrawler.interface';

class Chrawler implements ChrawlerInterface {

  private _options: chrome.Options;
  private _driver: ThenableWebDriver;

  constructor() {
    this._options = new chrome.Options();
    // this._options.headless(); // prod option
    this._options.addArguments('--no-sandbox');
    this._options.addArguments('--disabled-gpu');
    this._options.addArguments('--disabled-dev-shm-usage');
    this._options.addArguments('lang=ko_KR');
    this._options.addArguments('user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36');

    this._driver = new Builder().withCapabilities(chromeDriver.path).forBrowser('chrome').setChromeOptions(this._options).build();
  }

  async moveURL(siteURL: string): Promise<void> {
    await this._driver.get(siteURL);
  }

  async login(idCssQuery: string, id: string, pwCssQuery: string, pw: string): Promise<void> {
    await this._driver.findElement(By.css(idCssQuery)).sendKeys(id);
    await this._driver.findElement(By.css(pwCssQuery)).sendKeys(pw, Key.ENTER);
  }

  async getCookieValue(cookieName: string): Promise<any> {
    return await this._driver.manage().getCookie(cookieName);
  }

  async close(): Promise<void> {
    await this._driver.close();
  }
}

export default Chrawler;