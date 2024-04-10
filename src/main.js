import {
  render,
  RenderPosition
} from './render.js';
import TripInfoView from './view/create-trip.js';
import FiltersView from './view/create-filter.js';
import PointsPresenter from './presenter/trip-presenter.js';

const tripMainContainer = document.querySelector('.trip-main');
const tripEventsContainer = document.querySelector('.trip-events');
const filtersContainer = tripMainContainer.querySelector('.trip-controls__filters');

import PointsModel from './model/event-points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

const pointsPresenter = new PointsPresenter({
  tripEventsContainer,
  pointsModel,
  offersModel,
  destinationsModel
});

render(new TripInfoView(), tripMainContainer, RenderPosition.AFTERBEGIN);
render(new FiltersView(), filtersContainer);

pointsPresenter.init();
