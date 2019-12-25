import React from 'react';

import Desit from '../';

import {
    INTERACT_TYPES,
} from '../../../constants'



const ButtonJSX = (<button>Click Me</button>);

const ButtonFC: React.FC<any> = () => {
    return (
        <button>
            Click Me
        </button>
    );
}

class ButtonClass extends React.Component {
    render() {
        return (
            <button>
                Click Me
            </button>
        );
    }
}

describe('Desit', () => {
    const desitAppID = 'desitAppID';

    it('visit', () => {
        const desit = new Desit({
            appID: desitAppID,
        });
        desit.visit('/one');
        desit.visit('/two');
        desit.visit('/three');
        expect(true).toBeTruthy();
    });

    it('interact', () => {
        const desit = new Desit({
            appID: desitAppID,
        });
        desit.interact(INTERACT_TYPES.click, ButtonJSX, {userID: 'one'});
        desit.interact('click2', ButtonFC, {userID: 'one'});
        desit.interact('click3', ButtonClass, {userID: 'one'});
        expect(true).toBeTruthy();
    });
});
