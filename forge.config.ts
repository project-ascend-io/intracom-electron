import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { MakerDeb } from "@electron-forge/maker-deb";
import { MakerRpm } from "@electron-forge/maker-rpm";
import { AutoUnpackNativesPlugin } from "@electron-forge/plugin-auto-unpack-natives";
import { WebpackPlugin } from "@electron-forge/plugin-webpack";
import { FusesPlugin } from "@electron-forge/plugin-fuses";

import { EnvEnum, mainConfig } from "./webpack.main.config";
import { rendererConfig } from "./webpack.renderer.config";
import { selectedFuseConfig } from "./fuse.config";

const APP_ENV: EnvEnum = process.env.APP_ENV as EnvEnum;
const API_URL: EnvEnum = process.env.API_URL as EnvEnum;
const WS_URL: EnvEnum = process.env.WS_URL as EnvEnum;
const AUTH_TOKEN: string = process.env.AUTH_TOKEN as string;

const csPolicyConfig: Record<EnvEnum, string> = {
  [EnvEnum.Development]: `default-src 'self' 'unsafe-inline' data:; script-src 'self' 'unsafe-eval' 'unsafe-inline' data:; connect-src 'self' ${WS_URL} ${API_URL}`,
  [EnvEnum.Staging]: `default-src 'self'; script-src 'self'; connect-src 'self' ws://localhost:3000 ${WS_URL} ${API_URL}`,
  [EnvEnum.Production]: `default-src 'self'; script-src 'self'; connect-src 'self' ws://localhost:3000 ${WS_URL} ${API_URL}`,
};

const config: ForgeConfig = {
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "project-ascend-io",
          name: "intracom-electron",
        },
        authToken: AUTH_TOKEN,
        prerelease: APP_ENV !== EnvEnum.Production,
        draft: APP_ENV === EnvEnum.Development,
        generateReleaseNotes: true,
      },
    },
  ],
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({}),
    new MakerZIP({}, ["darwin"]),
    new MakerRpm({}),
    new MakerDeb({}),
  ],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      devContentSecurityPolicy: csPolicyConfig[APP_ENV],
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: "./src/index.html",
            js: "./src/renderer.ts",
            name: "main_window",
            preload: {
              js: "./src/preload.ts",
            },
          },
        ],
      },
    }),
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin(selectedFuseConfig),
  ],
};

export default config;
