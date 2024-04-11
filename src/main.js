import PointsModel from './model/event-points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';

const pointsModel = new PointsModel(mockService);
const offersModel = new OffersModel(mockService);
const destinationsModel = new DestinationsModel(mockService);


import MockService from './service/mock-service.js';

const mockService = new MockService();


import PointsPresenter from './presenter/points-presenter.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import TripInfoPresenter from './presenter/trip-presenter.js';

const pointsContainer = document.querySelector('.trip-events');

const pointsPresenter = new PointsPresenter({
  pointsContainer,
  pointsModel,
  offersModel,
  destinationsModel
});

const filtersPresenter = new FiltersPresenter({pointsModel});
const tripInfoPresenter = new TripInfoPresenter();

pointsPresenter.init();
filtersPresenter.init();
tripInfoPresenter.init();
