import {
    IDesit,
    DesitOptions,
    DesitVisitOptions,
    DesitInteractOptions,

    ReactElement,
} from '../../interfaces';



class Desit implements IDesit {
    private options: DesitOptions;

    constructor(options: DesitOptions) {
        this.options = options;
    }

    visit(
        path: string,
        options?: DesitVisitOptions,
    ) {
        // record page visit
    }

    interact(
        type: string,
        element: ReactElement,
        options?: DesitInteractOptions,
    ) {
        // record page interaction
    }
}


export default Desit;
