<h1 align="center">Math Quiz game</h1>
<h3 align="center">
    <a href="https://slice312.github.io/math-quiz/">Visit the live app</a>
</h3>

## About
- A study project to learn how to build single page applications, spa routing, components approach without frameworks using common js.
- The structure of the application was developed by [Feature-Sliced Design methodology](https://feature-sliced.design)

## Features
- SPA, routing, components approach with common js
- ES6 modules, ES2022 classes
- Some CSS animations
- Feature-Sliced Design
- Custom webpack setup
- ESLint

## How to run
### Run server for development
```sh
npm install
npm start
```
This script run `webpack-dev-server` and auto open browser with `https://localhost:5007`.  
If no browser is opened, you must manually open this URL in the browser.  
Port `5007` specified in `webpack.config.json` in devConfig.

## For test
You can fill leaderboard with mock data, just open browser console and type:
```js
window.App.mockFillLeaderBoard();
```
