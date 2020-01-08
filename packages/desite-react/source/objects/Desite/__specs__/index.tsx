import React from 'react';

import Desite from '../';

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

describe('Desite', () => {
    const desitAppID = 'desite_18b70b77f4b1454b826ba0677240b9ac';

    it('visit', () => {
        const desit = new Desite({
            appID: desitAppID,
        });
        // desit.visit('/one');
        desit.visit('/two', { userID: 'foo', meta: { boo: 'coo'}});
        // desit.visit('/three');
        expect(true).toBeTruthy();
    });

    it('interact', () => {
        const desit = new Desite({
            appID: desitAppID,
        });
        // desit.interact(INTERACT_TYPES.click, ButtonJSX, {userID: 'one'});
        // desit.interact('click2', ButtonFC, {userID: 'one', meta: { boo: 'coo'}});
        desit.interact(
            'click2',
            'NamedComponent',
            {
                userID: 'one',
                path: '/foo',
                meta: { boo: 'coo' },
            },
        );
        // desit.interact('click3', ButtonClass, {userID: 'one'});
        expect(true).toBeTruthy();
    });
});
