install:
	npm ci

test:
	npm test

publish:
	npm publish --dry-run

develop:
	npx webpack serve

lint:
	npx eslint .
