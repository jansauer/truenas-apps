# AirSane

Share a USB Fujitsu ScanSnap iX500 as an AirScan/eSCL network scanner.

- https://github.com/SimulPiscator/AirSane
- https://github.com/aguslr/docker-airsane
- https://hub.docker.com/r/aguslr/airsane

The scanner is connected to the TrueNAS server over USB and shared on the LAN with host networking so Bonjour discovery works from macOS Image Capture, Preview, and other AirScan-compatible clients.

The image is built locally from the `aguslr/docker-airsane` Dockerfile using AirSane v0.4.12. The published `aguslr/airsane` image currently contains AirSane v0.4.5, which predates improvements to duplex ADF handling and advertisement.

The image includes an AirSane device configuration that sets the iX500 media size to A4 (210 x 297 mm). The SANE Fujitsu backend otherwise defaults to US Letter dimensions (215.872 x 279.364 mm). The Letter height causes macOS to omit A4 from the paper-size menu, while its wider media width can include the feeder background beside a centered A4 page. The `swcrop` backend option is also enabled so `sane-fujitsu` detects the sheet edges and digitally removes any remaining border. Baking the configuration into the image allows it to work with the remote TrueNAS Docker context without a host bind mount.

After changing the configuration, redeploy from the repository root and reopen Preview or Image Capture so macOS fetches the updated scanner capabilities:

```sh
make airsane
```

## Verification

Check that TrueNAS sees the scanner:

```sh
lsusb
```

Check that SANE sees the scanner inside the container:

```sh
docker compose exec airsane scanimage -L
```

The result should list a Fujitsu ScanSnap iX500 device. If the scanner appears in SANE but not on macOS, investigate mDNS, firewall, VLAN, or multicast filtering rather than USB permissions.

Confirm that both A4 dimension overrides are active:

```sh
docker compose exec airsane sh -c \
  "scanimage -A 2>/dev/null | grep -E 'page-(width|height)'"
```

The current values in square brackets should be approximately `210` mm for width and `297` mm for height.

The dimensions advertised by the running AirSane service can be checked without
opening the scanner device:

```sh
curl -s http://TRUENAS-IP:8090/eSCL/ScannerCapabilities \
  | grep -E 'Max(Physical)?(Width|Height)'
```

At 300 dpi, A4 is advertised as approximately `2480` by `3508`. A width of
`2550` means the running container still has the 215.9 mm US Letter default.
The active options dumped in the AirSane log when a scan starts should also show
`page-width = 210mm`, `page-height = 297mm`, and `swcrop = 1`.

AirSane also serves a local web interface. Check the container logs for the listening address:

```sh
docker compose logs airsane
```

Keep the scanner reachable only on trusted internal networks.
