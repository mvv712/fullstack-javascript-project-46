install:
	npm install
	npm ci

lint:
	npx eslint .

publish:
	npm publish --dry-run

test:
	npm test

gendiff:
	node bin/gendiff.js