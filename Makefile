SKETCHFILE = prettier.sketch
DATAFILES = icon.json wide.json
BIN = ./node_modules/.bin

.PHONY: build deploy watch watch-all watch-stylus watch-js serve clean

watch: $(DATAFILES)
	@$(MAKE) -j4 watch-all

build: dist/app.css dist/wide.css dist/icon.css dist/bundle.js dist/AnimatedLogo.js dist/index.js dist/index.html

deploy: build
	$(BIN)/gh-pages -d dist

watch-all: watch-stylus watch-bundle watch-babel serve

watch-stylus:
	@mkdir -p dist
	$(BIN)/stylus -w src -o dist

watch-bundle:
	@mkdir -p dist
	$(BIN)/watchify -t babelify src/index.js -o dist/bundle.js

watch-babel:
	@mkdir -p dist
	$(BIN)/babel src --out-dir dist

serve: dist/index.html dist/app.css dist/bundle.js
	$(BIN)/serve dist

dist/%.html: src/%.html
	@mkdir -p dist
	cp $< $@

icon.svg wide.svg: $(SKETCHFILE)
	sketchtool export artboards $^

dist/bundle.js: src/index.js
	@mkdir -p dist
	$(BIN)/browserify -t babelify $< > $@

dist/%.css: src/%.styl $(DATAFILES)
	@mkdir -p dist
	$(BIN)/stylus $< -o $@

dist/%.js: src/%.js
	@mkdir -p dist
	$(BIN)/babel $< -o $@

%.json: %.svg
	node from-svg.js < $< > $@

clean:
	$(RM) -r dist $(DATAFILES)
