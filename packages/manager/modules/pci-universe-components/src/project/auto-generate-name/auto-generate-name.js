export default class AutoGenerateNameService {
  constructor() {
    this.maxRandomNumber = 9999;
  }

  static getDate() {
    const date = new Date();
    return `${date.getDate()}${date.getMonth() + 1}`;
  }

  getRandomNumber() {
    return (
      (Math.floor(Math.random() * this.maxRandomNumber) *
        new Date().getMilliseconds()) %
      this.maxRandomNumber
    );
  }

  getAutoGeneratedName(prefix = '') {
    return `${
      prefix ? `${prefix}-` : ''
    }${AutoGenerateNameService.getDate()}-${this.getRandomNumber()}`;
  }
}