import { EnvEnum } from "./webpack.main.config";

const ENV: EnvEnum = process.env.APP_ENV as EnvEnum;

import { FuseV1Options, FuseVersion } from "@electron/fuses";

const fuseSettings: Record<
  EnvEnum,
  { version: FuseVersion; [key: number]: boolean }
> = {
  [EnvEnum.Development]: {
    version: FuseVersion.V1,
    [FuseV1Options.RunAsNode]: true,
    [FuseV1Options.EnableCookieEncryption]: false,
    [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: true,
    [FuseV1Options.EnableNodeCliInspectArguments]: true,
    [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: false,
    [FuseV1Options.OnlyLoadAppFromAsar]: false,
  },
  [EnvEnum.Staging]: {
    version: FuseVersion.V1,
    [FuseV1Options.RunAsNode]: false,
    [FuseV1Options.EnableCookieEncryption]: true,
    [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
    [FuseV1Options.EnableNodeCliInspectArguments]: true,
    [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
    [FuseV1Options.OnlyLoadAppFromAsar]: true,
  },
  [EnvEnum.Production]: {
    version: FuseVersion.V1,
    [FuseV1Options.RunAsNode]: false,
    [FuseV1Options.EnableCookieEncryption]: true,
    [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
    [FuseV1Options.EnableNodeCliInspectArguments]: false,
    [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
    [FuseV1Options.OnlyLoadAppFromAsar]: true,
  },
};

export const selectedFuseConfig = fuseSettings[ENV];
