import { remove, render } from '../framework/render.js';
import EventsListView from '../view/events-list-view.js';
import EventsListEmptyView from '../view/events-list-empty-view.js';
import { SORTING_COLUMNS, SortType, UpdateType } from '../const.js';
import PointPresenter from './points-presenter.js';
import { sortByType } from '../utils.js';
import SortingView from '../view/create-sort-view.js';

export default class RoadPresenter {
  #container = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #currentSortType = SortType.DAY;
  #listComponent = new EventsListView();
  #sortingComponent = null;
  #pointsPresenters = new Map();

  constructor({ container, pointsModel, offersModel, destinationsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#pointsModel.addObserver(this.#modelEventHandler);
  }

  get points() {
    return sortByType[this.#currentSortType]([...this.#pointsModel.get()]);
  }

  init() {
    this.#renderRoad();
  }

  destroy() {
    remove(this.#sortingComponent);
    remove(this.#listComponent);
    this.#clearRoad();
  }

  #renderStub() {
    render(new EventsListEmptyView(), this.#container);
  }

  #renderSort() {
    this.#sortingComponent = new SortingView({
      items: SORTING_COLUMNS,
      selectedSortType: this.#currentSortType,
      onSortChange: this.#sortChangeHandler,
    });

    render(this.#sortingComponent, this.#container);
  }

  #renderRoad() {
    if (!this.points.length) {
      this.#renderStub();
      return;
    }

    this.#renderSort();
    this.#renderPoints();
  }

  #renderPoints() {
    render(this.#listComponent, this.#container);

    this.points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #clearRoad() {
    this.#pointsPresenters.forEach((presenter) => presenter.destroy());
    this.#pointsPresenters.clear();
    remove(this.#sortingComponent);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      container: this.#listComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onPointChange: this.#pointChangeHandler,
      onEditorOpen: this.#pointEditHandler,
      onPointDelete: this.#pointDeleteHandler,
    });

    pointPresenter.init(point);
    this.#pointsPresenters.set(point.id, pointPresenter);
  }

  #pointEditHandler = () => {
    this.#pointsPresenters.forEach((presenter) => presenter.resetView());
  };

  #pointChangeHandler = (updatedPoint) => {
    this.#pointsModel.update(UpdateType.MINOR, updatedPoint);
  };

  #pointDeleteHandler = (deletedPoint) => {
    this.#pointsModel.delete(UpdateType.MAJOR, deletedPoint);
  };

  #sortChangeHandler = (sortType) => {
    this.#currentSortType = sortType;

    this.#clearRoad();
    this.#renderRoad();
  };

  #modelEventHandler = (type, data) => {
    switch (type) {
      case UpdateType.PATCH:
        this.#pointsPresenters.get(data.id)?.init(data);
        break;

      case UpdateType.MINOR:
      case UpdateType.MAJOR:
      default:
        this.#clearRoad();
        this.#renderRoad();
        break;
    }
  };
}
