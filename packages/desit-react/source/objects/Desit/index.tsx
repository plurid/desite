import React from 'react';

import {
    IDesit,
    DesitOptions,
    DesitInteractOptions,
} from '../../interfaces';



class Desit implements IDesit {
    private options: DesitOptions;

    constructor(options: DesitOptions) {
        this.options = options;
    }

    visit(
        path: string,
    ) {
        // record page visit
    }

    interact(
        type: string,
        element: React.FC,
        options?: DesitInteractOptions,
    ) {
        // record page interaction
    }
}


export default Desit;
