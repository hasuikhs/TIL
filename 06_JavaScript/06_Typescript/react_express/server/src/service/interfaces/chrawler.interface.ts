interface ChrawlerInterface {
  moveURL(siteURL: string): Promise<void>;
  login(idCssQuery: string, id: string, pwCssQuery: string, pw: string): Promise<void>;
  getCookieValue(cookieName: string): Promise<any>;
  close(): Promise<void>;
}

export default ChrawlerInterface;