SKETCHFILE = prettier.sketch

all: icon.json wide.json

icon.svg wide.svg: $(SKETCHFILE)
	sketchtool export artboards $^

%.json: %.svg
	node from-svg.js < $< > $@
