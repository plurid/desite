// #region imports
    // #region libraries
    import React from 'react';
    // #endregion libraries


    // #region external
    import Desite from '../';

    import {
        INTERACT_TYPES,
    } from '../../../data/constants'
    // #endregion external
// #endregion imports



// #region module
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
    const desitAppID = 'desite_4577163a365549909762bee3dc3d3956';

    it.only('visit', () => {
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
// #endregion module
