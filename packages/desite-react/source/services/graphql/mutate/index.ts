// #region imports
    // #region libraries
    import {
        gql,
    } from '@apollo/client';
    // #endregion libraries
// #endregion imports



// #region module
export const DESITE_VISIT = gql`
    mutation DesiteVisit($input: InputDesiteVisit!) {
        desiteVisit(input: $input) {
            status
            errors {
                path
                message
                type
            }
        }
    }
`;


export const DESITE_INTERACT = gql`
    mutation DesiteInteract($input: InputDesiteInteract!) {
        desiteInteract(input: $input) {
            status
            errors {
                path
                message
                type
            }
        }
    }
`;
// #endregion module
