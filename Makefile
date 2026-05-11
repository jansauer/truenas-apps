APPS := $(patsubst %/compose.yaml,%,$(wildcard */compose.yaml))

.DEFAULT_GOAL := all

.PHONY: all $(APPS)

all: $(APPS)

$(APPS):
	@printf "\033[1;34mDeploying %s...\033[0m\n" "$@" && \
	cd $@ && \
	op run --env-file=../.env -- docker compose up -d --remove-orphans
