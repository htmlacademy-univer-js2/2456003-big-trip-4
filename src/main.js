import PointsModel from './model/event-points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import RoadPresenter from './presenter/road-presenter.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import TripInfoPresenter from './presenter/trip-presenter.js';
import MockService from './service/mock-service.js';

const mockService = new MockService();
const pointsModel = new PointsModel(mockService);
const offersModel = new OffersModel(mockService);
const destinationsModel = new DestinationsModel(mockService);

const container = document.querySelector('.trip-events');

const roadPresenter = new RoadPresenter({
  container,
  pointsModel,
  offersModel,
  destinationsModel
});

const filtersPresenter = new FiltersPresenter({pointsModel});
const tripInfoPresenter = new TripInfoPresenter();

roadPresenter.init();
filtersPresenter.init();
tripInfoPresenter.init();

