export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this.renderer = renderer;
    this._сontainer = containerSelector;
  }

  renderItems() {
    this._items.forEach((item) => this.renderer(item));
  }

  addItem(domElement) {
    this._сontainer.prepend(domElement);
  }
}
