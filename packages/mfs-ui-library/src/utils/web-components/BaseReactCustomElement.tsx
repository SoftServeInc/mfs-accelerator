export default class BaseReactCustomElement extends HTMLElement {
  protected renderRoot: Element | DocumentFragment | undefined;

  public connectedCallback() {}
  public renderApp() {}
  public disconnectedCallback() {}
  protected createRenderRoot() {}
}
