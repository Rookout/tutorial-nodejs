PUBLISH_VERSION=$(shell echo ${NEW_VERSION} | sed 's/inner-999/1/g')

build:
	docker build --tag rookout/tutorial-nodejs:latest --tag rookout/tutorial-nodejs:${PUBLISH_VERSION} .

upload-no-latest:
	docker push rookout/tutorial-nodejs:${PUBLISH_VERSION}

upload: upload-no-latest
	@if [ ${CIRCLE_BRANCH} = "master" ]; then \
		docker push rookout/tutorial-nodejs:latest; \
	fi

build-and-upload: build upload
