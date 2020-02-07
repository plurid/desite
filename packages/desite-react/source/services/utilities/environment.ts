const environment: any = {
    production: String(process.env.MODE_ENV) === 'production',
    development: String(process.env.MODE_ENV) === 'development',
    local: String(process.env.MODE_ENV) === 'local',
    localExternal: String(process.env.MODE_ENV) === 'localexternal',
}

export default environment;
