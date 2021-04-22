REPO = repo.devpack.cc
NS = anta_hsiao
VERSION := 1.0
COMMIT := $(shell git rev-parse HEAD | cut -c1-6)
CONTEXT = ../

.PHONY: build push

docker-build:
	sudo docker build --no-cache -t $(REPO)/$(NS)/document:$(VERSION)-$(COMMIT) -f Dockerfile $(CONTEXT)

docker-push:
	# 底下這一行是登入到repo.devpack.cc才可以將docker image放上去，而帳號密碼是你的OA帳密
	# sudo docker login repo.devpack.cc --username=anta_hsiao@wistron.com --password=xxxxbbbbHHHH
	sudo docker tag $(REPO)/$(NS)/document:$(VERSION)-$(COMMIT) $(REPO)/$(NS)/document:latest
	sudo docker push $(REPO)/$(NS)/document:$(VERSION)-$(COMMIT)
	sudo docker push $(REPO)/$(NS)/document:latest
