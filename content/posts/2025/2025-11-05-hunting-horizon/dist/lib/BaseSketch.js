import {
  Application,
  Container,
  Graphics,
  AdvancedBloomFilter,
} from "./bundles/pixi.js";

class BaseSketch extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.init();
  }

  async init() {
    const parentNode = this;
    const { clientWidth, clientHeight } = parentNode;

    const app = new Application();

    await app.init({
      width: clientWidth,
      height: clientHeight,
      antialias: true,
      autoDensity: true,
    });

    this.app = app;
    parentNode.appendChild(app.canvas);

    const filterStage = new Container();
    this.app.stage.addChild(filterStage);

    const bloom = new AdvancedBloomFilter({
      threshold: 0.2,
      bloomScale: 1.5,
      brightness: 1.0,
      blur: 1.5,
      quality: 5,
    });

    filterStage.filters = [bloom];

    const backgroundStage = new Container();
    const backgroundGraphics = new Graphics();
    backgroundStage.addChild(backgroundGraphics);
    filterStage.addChild(backgroundStage);

    const stage = new Container();
    stage.sortableChildren = true;
    filterStage.addChild(stage);

    const debugStage = new Container();
    debugStage.sortableChildren = true;
    const debugGraphics = new Graphics();
    debugStage.addChild(debugGraphics);
    filterStage.addChild(debugStage);

    Object.assign(this, {
      backgroundStage,
      backgroundGraphics,
      stage,
      debugStage,
      debugGraphics,
    });

    this.updateSizing(true);
    app.ticker.add((ticker) => {
      this.updateSizing();
      debugGraphics.clear();
    });

    app.ticker.add((ticker) => this.update(ticker));
  }

  update(ticker) {}

  updateSizing(force = false) {
    const { renderer } = this.app;
    const { stage, filterStage, debugStage, debugGraphics } = this;
    const { clientWidth, clientHeight } = this;
    const { width, height } = renderer;

    if (force || clientWidth !== width || clientHeight !== height) {
      renderer.resize(clientWidth, clientHeight);
      stage.x = clientWidth / 2;
      stage.y = clientHeight / 2;
      debugStage.x = clientWidth / 2;
      debugStage.y = clientHeight / 2;
    }
  }

  render() {}
}

export default BaseSketch;
