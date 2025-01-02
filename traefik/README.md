# Traefik

My reverse proxy that enables TLS and routing for all the different apps self-hosted on this server.

I'm using Let's Encrypt with Google Cloud Platform DNS challenge for the certificates. Also, I had to put some extra configurations in the `traefik.toml` file. I want to also have access to the TrueNAS webui using Traefik and did not find a way to do that using the CLI.

- https://traefik.io/traefik/
- https://github.com/traefik/traefik
- https://hub.docker.com/_/traefik
