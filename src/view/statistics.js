import AbstractView from './abstract.js';


const createStatisticsTemplate = () => (
  `<p>130 291 movies inside</p>
`);

export default class Statistics extends AbstractView {
  getTemplate() {
    return createStatisticsTemplate();
  }
}
