declare module 'single-spa-react' {
  import type * as React from 'react';
  import type * as ReactDOMClient from 'react-dom/client';

  export default function singleSpaReact<P = Record<string, unknown>>(config: {
    React: typeof React;
    ReactDOMClient: typeof ReactDOMClient;
    rootComponent: React.ComponentType<P>;
    errorBoundary?: (
      err: unknown,
      info: { componentStack: string },
      props: P
    ) => React.ReactNode;
  }): {
    bootstrap: (props?: P) => Promise<void>;
    mount: (props?: P) => Promise<void>;
    unmount: (props?: P) => Promise<void>;
    update?: (props?: P) => Promise<void>;
  };
}
