import gql from 'graphql-tag';



export const DESIT_VISIT = gql`
    mutation DesitVisit($input: InputDesitVisit!) {
        desitVisit(input: $input) {
            status
            errors {
                path
                message
                type
            }
        }
    }
`;


export const DESIT_INTERACT = gql`
    mutation DesitInteract($input: InputDesitInteract!) {
        desitInteract(input: $input) {
            status
            errors {
                path
                message
                type
            }
        }
    }
`;
