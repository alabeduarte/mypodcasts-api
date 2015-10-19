# My Podcasts API

[![Build
Status](https://snap-ci.com/alabeduarte/mypodcasts-api/branch/master/build_image)](https://snap-ci.com/alabeduarte/mypodcasts-api/branch/master)

API for [mypodcasts-android](https://github.com/alabeduarte/mypodcasts-android)

## Pre-requisites:
  * Docker Toolbox
    * If you want to use [Docker](https://docs.docker.com/), install version 1.3 or greater:
    * [Getting started guide](https://www.docker.com/toolbox)
    * If you are cool and use brew cask:

    ```
      $ brew cask install dockertoolbox
    ```

## Install and run all containers

```
  $ make
```

## Run

```
  # Available at http://<docker_ip>:3000
```

## Tests

```
  $ make test
```
