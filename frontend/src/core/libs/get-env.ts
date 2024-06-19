export function getEnv( envVariableValue: string | undefined ) {
    if ( typeof envVariableValue !== "string" ) {
        throw new Error( "Unset env variable" );
    }
    return (envVariableValue);
}
