import React, { ComponentType } from "react";
import ReactDOM from "react-dom";
import BaseReactCustomElement from "./BaseReactCustomElement";
import createReactCustomElement from "./ReactCustomElement";

const createReactCustomElementWithProps = (
  Component: ComponentType<any>,
  properties: string[],
  useShadowDOM = true
): typeof BaseReactCustomElement => {
  return class ReactCustomElementWithProps extends createReactCustomElement(
    Component,
    useShadowDOM
  ) {
    protected props: any;
    protected hasConnected: boolean;

    public constructor() {
      super();

      this.props = {};
      this.hasConnected = false;
    }

    public static get observedAttributes() {
      return properties || [];
    }

    public attributeChangedCallback(
      name: string,
      oldValue: any,
      newValue: any
    ) {
      if (oldValue === newValue) {
        return;
      }

      const propName = this.getPropName(name);
      this.props[propName] = newValue;

      // If already connected and prop changed, need to update the React App
      if (this.hasConnected) {
        Promise.resolve().then(() => {
          this.renderApp();
        });
      }
    }

    public connectedCallback() {
      this.hasConnected = true;
      super.connectedCallback();
    }

    public injectProps(props) {
      this.props = {
        ...this.props,
        ...props,
      };
      if (this.hasConnected) {
        Promise.resolve().then(() => {
          this.renderApp();
        });
      }
    }

    public renderApp() {
      ReactDOM.render(
        <Component
          renderRoot={this.renderRoot}
          {...this.props}
          children={this.innerHTML}
          element={this}
        />,
        this.renderRoot as Element
      );
    }

    protected getPropName(attrName: string) {
      return attrName.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    }
  };
};

export default createReactCustomElementWithProps;
