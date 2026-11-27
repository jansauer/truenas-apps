ARG BASE_IMAGE=library/debian:stable-slim@sha256:a64d9dbf633e2a2503afac76be521dc25d9b5765150b30d31a3914d4ae969cab

FROM docker.io/${BASE_IMAGE} AS builder

ARG AIRSANE_REPO=https://github.com/SimulPiscator/AirSane
# renovate: datasource=github-tags depName=SimulPiscator/AirSane
ARG AIRSANE_VERSION=v0.4.12

WORKDIR /opt/AirSane

RUN <<-EOT sh
	set -eu

	apt-get update
	env DEBIAN_FRONTEND=noninteractive \
		apt-get install -y --no-install-recommends \
		wget ca-certificates build-essential cmake g++ \
		libsane-dev libjpeg-dev libpng-dev libavahi-client-dev libusb-1.*-dev \
		-o Dpkg::Options::="--force-confdef" -o Dpkg::Options::="--force-confold"
	apt-get clean && rm -rf /var/lib/apt/lists/* /var/lib/apt/lists/*

	wget ${AIRSANE_REPO}/archive/refs/tags/${AIRSANE_VERSION}.tar.gz -O - \
		| tar -xzv --strip-components=1
	mkdir ./build && cd ./build && cmake .. && make
EOT


FROM docker.io/${BASE_IMAGE}

RUN <<-EOT sh
	set -eu

	apt-get update
	env DEBIAN_FRONTEND=noninteractive \
		apt-get install -y --no-install-recommends sane-utils \
		libsane1 libjpeg62-turbo libpng16-16t64 libavahi-client3 libusb-1.0-0 \
		-o Dpkg::Options::="--force-confdef" -o Dpkg::Options::="--force-confold"
	apt-get clean && rm -rf /var/lib/apt/lists/* /var/lib/apt/lists/*
	mkdir -p /etc/airsane
EOT

COPY --from=builder /opt/AirSane/etc/* /etc/airsane/
COPY --from=builder /opt/AirSane/build/airsaned /usr/local/bin
COPY rootfs/ /

EXPOSE 8090/tcp

VOLUME /dev/bus/usb /run/dbus /opt/drivers

HEALTHCHECK --interval=1m --timeout=3s \
  CMD timeout 2 bash -c 'cat < /dev/null > /dev/tcp/127.0.0.1/8090'

ENTRYPOINT ["/entrypoint.sh"]
CMD ["--access-log=-", "--disclose-version=false", "--debug=true"]
