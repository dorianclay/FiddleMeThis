import { createRoot } from "react-dom/client";

const container = document.getElementById("app");
const root = createRoot(container); // createRoot(container!) if you use TypeScript

const App = () => {
  return (
    <>
      <head>
        <meta charSet="UTF-8" />
        <title>Hello World!</title>
      </head>
      <body>
        <h1>💖 Hello World!</h1>
        <p>Welcome to your Electron application.</p>
        <p id="info"></p>
      </body>
    </>
  );
};

root.render(<App />);
