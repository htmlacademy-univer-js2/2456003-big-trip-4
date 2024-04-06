import {
  render,
  RenderPosition
} from './render.js';
import TripInfoView from './view/create-trip.js';
import FiltersView from './view/create-filter.js';
import PointsPresenter from './presenter/board-presenter.js';

const tripMainContainer = document.querySelector('.trip-main');
const tripEventsContainer = document.querySelector('.trip-events');
const filtersContainer = tripMainContainer.querySelector('.trip-controls__filters');
const pointsPresenter = new PointsPresenter({
  tripEventsContainer
});

render(new TripInfoView(), tripMainContainer, RenderPosition.AFTERBEGIN);
render(new FiltersView(), filtersContainer);

pointsPresenter.init();
