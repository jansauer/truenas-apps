APPS := $(patsubst %/compose.yaml,%,$(wildcard */compose.yaml))

.DEFAULT_GOAL := all

.PHONY: all $(APPS)

all: $(APPS)

$(APPS):
	@printf "\033[1;34mDeploying %s...\033[0m\n" "$@" && \
	cd $@ && \
	no_start="$$(awk 'tolower($$1) == "x-no-start:" && tolower($$2) == "true" { found = 1 } END { print found ? "--no-start" : "" }' compose.yaml)" && \
	op run --env-file=../.env -- docker compose up -d $$no_start --remove-orphans
