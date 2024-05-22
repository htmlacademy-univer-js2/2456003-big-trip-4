import { remove, render } from '../framework/render.js';
import EventsListView from '../view/events-list-view.js';
import EventsListEmptyView from '../view/events-list-empty-view.js';
import { SORTING_COLUMNS, SortType } from '../const.js';
import PointPresenter from './points-presenter.js';
import { sortByType, updateItem } from '../utils.js';
import SortingView from '../view/create-sort-view.js';

export default class RoadPresenter {
  #container = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #points = [];
  #currentSortType = SortType.DAY;
  #listComponent = new EventsListView();
  #sortingComponent = null;
  #pointsPresenters = new Map();

  constructor({ container, pointsModel, offersModel, destinationsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#points = sortByType[this.#currentSortType]([
      ...this.#pointsModel.get(),
    ]);
  }

  init() {
    if (!this.#points.length) {
      this.#renderStub();
      return;
    }

    this.#renderSort();
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
      onSortChange: this.#sortChangeHandler,
    });

    render(this.#sortingComponent, this.#container);
  }

  #renderRoad() {
    render(this.#listComponent, this.#container);

    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #clearRoad() {
    this.#pointsPresenters.forEach((presenter) => presenter.destroy());
    this.#pointsPresenters.clear();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      container: this.#listComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onPointChange: this.#pointChangeHandler,
      onEditorOpen: this.#pointEditHandler,
    });

    pointPresenter.init(point);
    this.#pointsPresenters.set(point.id, pointPresenter);
  }

  #pointEditHandler = () => {
    this.#pointsPresenters.forEach((presenter) => presenter.resetView());
  };

  #pointChangeHandler = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointsPresenters.get(updatedPoint.id).update(updatedPoint);
  };

  #sortChangeHandler = (sortType) => {
    this.#currentSortType = sortType;

    this.#points = sortByType[this.#currentSortType](this.#points);
    this.#clearRoad();
    this.#renderRoad();
  };
}
