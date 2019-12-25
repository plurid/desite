import React from 'react';

import {
    IDesit,
    DesitOptions,
} from '../../interfaces';



class Desit implements IDesit {
    private options: DesitOptions;

    constructor(options: DesitOptions) {
        this.options = options;
    }
}


export default Desit;
