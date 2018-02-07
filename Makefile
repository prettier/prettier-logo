SKETCHFILE = prettier.sketch
DATAFILES = icon.json wide.json
BIN = ./node_modules/.bin

EXPORT_DIR = images
EXPORTS = banner avatar logo icon wide

DARK_EXPORTS = $(EXPORTS:%=prettier-%-dark)
LIGHT_EXPORTS = $(EXPORTS:%=prettier-%-light)
ALL_EXPORTS = $(DARK_EXPORTS) $(LIGHT_EXPORTS)
PNG_EXPORTS = $(ALL_EXPORTS:%=$(EXPORT_DIR)/%.png)
SVG_EXPORTS = $(ALL_EXPORTS:%=$(EXPORT_DIR)/%.svg)
EXPORT_FILES = $(PNG_EXPORTS) $(SVG_EXPORTS)

.PHONY: build deploy watch watch-all watch-stylus watch-js serve clean exports

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
	$(BIN)/watchify -t babelify src/app.js -o dist/bundle.js

watch-babel:
	@mkdir -p dist
	$(BIN)/babel src --out-dir dist

serve: dist/index.html dist/app.css dist/bundle.js
	$(BIN)/serve dist

dist/%.html: src/%.html
	@mkdir -p dist
	cp $< $@

exports: $(EXPORT_FILES) $(EXPORT_DIR)/key.png

$(EXPORT_FILES): $(SKETCHFILE)
	sketchtool export artboards --output=$(EXPORT_DIR) $^

$(EXPORT_DIR)/key.png: $(SKETCHFILE)
	sketchtool export pages --item=key --output=$(EXPORT_DIR) $^

dist/bundle.js: src/app.js
	@mkdir -p dist
	$(BIN)/browserify -t babelify $< > $@

dist/%.css: src/%.styl $(DATAFILES)
	@mkdir -p dist
	$(BIN)/stylus $< -o $@

dist/%.js: src/%.js
	@mkdir -p dist
	$(BIN)/babel $< -o $@

%.json: $(EXPORT_DIR)/prettier-%-light.svg
	node from-svg.js < $< > $@

clean:
	$(RM) -r dist $(DATAFILES)

clean-exports:
	$(RM) $(EXPORT_FILES) $(EXPORT_DIR)/key.png
