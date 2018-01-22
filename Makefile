SKETCHFILE = prettier.sketch
DATAFILES = icon.json wide.json
BIN = ./node_modules/.bin

.PHONY: build watch watch-all watch-stylus watch-js serve clean

watch:
	@$(MAKE) -j3 watch-all

build: dist/style.css dist/bundle.js

watch-all: watch-stylus watch-js serve

watch-stylus:
	@mkdir -p dist
	$(BIN)/stylus -w style.styl -o dist

watch-js:
	@mkdir -p dist
	$(BIN)/watchify -t babelify index.js -o dist/bundle.js

serve: dist/index.html dist/style.css dist/bundle.js
	$(BIN)/serve dist

dist/index.html: index.html
	@mkdir -p dist
	cp $< $@

icon.svg wide.svg: $(SKETCHFILE)
	sketchtool export artboards $^

dist/bundle.js: index.js
	@mkdir -p dist
	$(BIN)/browserify -t babelify $< > $@

dist/style.css: style.styl $(DATAFILES)
	@mkdir -p dist
	$(BIN)/stylus < $< > $@

%.json: %.svg
	node from-svg.js < $< > $@

clean:
	$(RM) -r dist
