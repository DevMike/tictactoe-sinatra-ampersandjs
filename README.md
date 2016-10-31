# TicTacToe

A small app based on Sinatra+AmpersandJS allowing to play TicTacToe game and view statistics.

## How to run it

1. `bundle install`
2. `rackup -p 4567`
3. Open http://0.0.0.0:4567 in a browser
4. Enjoy it! ;-)

## How it's structured

* `app.rb` is the main Sinatra-based application
* `/public` contains 2 files responsible for the ui part:
    * `index.html` that is the main webpage
    * `app.bundle.js` compiled js/css file included into the `index.html` described above
* `/ui` is not compiled ui part
* `tests` is tests for sinatra app

## How to run ruby tests

* `cd /tests`
* `ruby app_test.rb`

## How to run UI tests

* `cd /ui`
* `npm install`
* `grunt specs`

## How to get compiled UI file

* `cd /ui`
* `npm install`
* `./node_modules/.bin/browserify -t browserify-css client/compileable.js > app.bundle.js && mv app.bundle.js ../public`