import PointsModel from './model/event-points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import RoadPresenter from './presenter/road-presenter.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import TripInfoPresenter from './presenter/trip-presenter.js';
import CreatePointPresenter from './presenter/create-point-presenter.js';
import MainApiService from './service/points-api-service.js';
import FiltersModel from './model/filters-model.js';


const apiService = new MainApiService();
const pointsModel = new PointsModel(apiService);
const offersModel = new OffersModel(apiService);
const destinationsModel = new DestinationsModel(apiService);
const filtersModel = new FiltersModel();

const pointsContainer = document.querySelector('.trip-events');
const filtersContainer = document.querySelector('.trip-controls__filters');
const tripMainContainer = document.querySelector('.trip-main');

const tripInfoPresenter = new TripInfoPresenter({
  container: tripMainContainer,
  destinationsModel,
  offersModel,
  pointsModel,
});

const createPointPresenter = new CreatePointPresenter({
  container: tripMainContainer,
  editorContainer: pointsContainer,
  pointsModel,
  offersModel,
  destinationsModel,
});

const roadPresenter = new RoadPresenter({
  container: pointsContainer,
  createPointPresenter,
  pointsModel,
  offersModel,
  destinationsModel,
  filtersModel,
});

const filtersPresenter = new FiltersPresenter({ container: filtersContainer, pointsModel, filtersModel });

const bootstrap = async () => {
  await Promise.all([
    offersModel.init(),
    destinationsModel.init(),
  ]);
  pointsModel.init();
  roadPresenter.init();
  filtersPresenter.init();
  tripInfoPresenter.init();
};

bootstrap();
