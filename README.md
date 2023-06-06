# Fleet Management - Subfolder Starter

This repository provides a basic example of how manage a multi-site repository using subfolders. Refer to the following example sites below:

1. https://sushi.yext.com.pagescdn.com/ny/new-york/yext-sushi-location1
1. https://tacos.yext.com.pagescdn.com/location3-upper-west-side

## Getting Started

### Prerequisites

1. Have the Yext CLI installed: https://hitchhikers.yext.com/guides/cli-getting-started-resources/01-install-cli/
1. Have Deno installed, version 1.21.0 or later: https://deno.land/manual/getting_started/installation
1. Have node installed, version 17 or later: https://nodejs.org/en/download/

   - It's recommend to use nvm: https://github.com/nvm-sh/nvm#installing-and-updating or via brew `brew install nvm`

1. Have a Yext account. This is necessary for production builds, deploying on Yext Pages, and pulling local stream document data via `yext pages generate-test-data`.

### Clone this repo and install dependencies

```shell
git clone https://github.com/YextSolutions/fleet-subfolder-starter
cd fleet-subfolder-starter
npm install
```

### Recommended Development Flow

While _developing locally_, run the following command:

```
npx pages build --scope REPLACE_ME
yext pages generate-test-data --hostname REPLACE_ME
npx pages dev --scope REPLACE_ME
```


## Repository Layout

```
root
└───sites-config
│   ├── sushi.yext.com
│   │   ├── ci.json
│   │   └── site-stream.json
│   └── tacos.yext.com
│       ├── ci.json
│       └── site-stream.json
└───src
│   └───assets
│   └───components
│   └───styles
│   └───templates
│       ├── sushi.yext.com
│       │   ├── index.tsx
│       │   └── location.tsx
│       └── tacos.yext.com
│           ├── index.tsx
│           └── location.tsx
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.js
```

### sites-config

Each site in your fleet must contain its own subfolder in this directory.

Each subfolder will contain a single `ci.json` file. This file defines how the Yext CI system will build your project. It is not used during local dev. However, it is used when running a local production build (i.e. `npx pages build --scope REPLACE_ME`).

NOTE: A `features.json` file will automatically be generated during CI build for you based on the template configs defined in your templates.

NOTE: After changing your stream definitions, you should rerun `npx pages build --scope REPLACE_ME` and `yext pages generate-text-data --hostname REPLACE_ME` to ensure your local build pulls in the required data from the Knowledge Graph

### src

#### templates

Each site in your fleet must contain its own subfolder in this directory.

Required. This is where your actual templates live. There are effectively two types of components:

1. stream-based templates: those that have an exported `config`
1. static templates: those that don't have an exported `config`.