// #region module
const environment: any = {
    production: String(process.env.ENV_MODE) === 'production',
    development: String(process.env.ENV_MODE) === 'development',
    local: String(process.env.ENV_MODE) === 'local',
    localExternal: String(process.env.ENV_MODE) === 'localexternal',
};
// #endregion module



// #region exports
export default environment;
// #endregion exports
