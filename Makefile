APPS := $(patsubst %/compose.yaml,%,$(wildcard */compose.yaml))
DOCKER_CONTEXT_NAME ?= truenas

.DEFAULT_GOAL := all

.PHONY: all set-context $(APPS)

all: $(APPS)

set-context:
	@if docker context ls --format '{{.Name}}' | grep -Fxq '$(DOCKER_CONTEXT_NAME)'; then \
		docker context use '$(DOCKER_CONTEXT_NAME)'; \
	else \
		printf "\033[1;33mDocker context %s not found; using current context.\033[0m\n" "$(DOCKER_CONTEXT_NAME)"; \
	fi

$(APPS): set-context
	@printf "\033[1;34mDeploying %s...\033[0m\n" "$@" && \
	cd $@ && \
	no_start="$$(awk 'tolower($$1) == "x-no-start:" && tolower($$2) == "true" { found = 1 } END { print found ? "--no-start" : "" }' compose.yaml)" && \
	op run --env-file=../.env -- docker compose up -d $$no_start --remove-orphans
