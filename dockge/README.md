# Dockge

Simple UI for Docker Compose stacks. Allows me to easily start and stop complete apps and view logs.

I'm pulling the stacks from this git repo using a deploy key directly onto my TrueNAS server.

```
$ cd /mnt/applications/dockge/stacks
$ sudo ssh-keygen -t ed25519 -f /root/.ssh/dockge_ed25519 -C dockge
$ sudo git clone git@github.com-dockge:jansauer/truenas-apps.git .
```

- https://dockge.kuma.pet/
- https://github.com/louislam/dockge
- https://hub.docker.com/r/louislam/dockge
