# TrueNAS Apps

Cool app's that I self-host on my TrueNAS server.

- [Audiobookshelf](./audiobookshelf)
- [HabitSync](./habitsync)
- [Immich](./immich)
- [Karakeep](./karakeep)
- [Mealie](./mealie)
- [Newt](./newt))
- [Paperless-ngx](./paperless-ngx)
- [Plex](./plex)

## Things I tried but no longer use

- [Actual](https://forgejo.jansauer.dev/jansauer/truenas-apps/src/commit/1ce62290ce37d7fb7fa412fb5cb2499ff879b238/actual)
- [Beaver Habit Tracker](https://forgejo.jansauer.dev/jansauer/truenas-apps/src/commit/31c6358ba1e2fd37eee60d5b949e0d0ec769c7be/beaverhabits)
- [Dockge](https://forgejo.jansauer.dev/jansauer/truenas-apps/src/commit/85c5082a5e24f5dd7842b9361773f322ffc7c057/dockge)
- [Readeck](https://forgejo.jansauer.dev/jansauer/truenas-apps/src/commit/038f03369f001b2aa98e3bec9a15fc84fa0be5a0/readeck)
- [Mealie](https://forgejo.jansauer.dev/jansauer/truenas-apps/src/commit/17f722b8c501190b401289c0d03d4a3916b354a8/mealie)
- [Traefik](https://forgejo.jansauer.dev/jansauer/truenas-apps/src/commit/03aca843f85c5819abc36bddcfb86e48df1e30fb/traefik)
- [Bright Sky](https://forgejo.jansauer.dev/jansauer/truenas-apps/src/commit/7552d2d74d24debd4fc3096343638fe65d27d6b8/brightsky)
- [Jellyfin](https://forgejo.jansauer.dev/jansauer/truenas-apps/src/commit/7552d2d74d24debd4fc3096343638fe65d27d6b8/jellyfin)
- [Overpass](https://forgejo.jansauer.dev/jansauer/truenas-apps/src/commit/7552d2d74d24debd4fc3096343638fe65d27d6b8/overpass)

## Quickstart 

```
$ docker context create truenas \
    --description "TrueNAS" \
    --docker "host=ssh://truenas"
```

```
$ cd app
$ docker context use truenas
$ docker compose --env-file=.env up -d
```

```
$ docker ps -a --format 'table {{ .Names }}\t{{ .ID }}\t{{ .Image }}\t{{ .Status }}' | sort
```
