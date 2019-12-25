import React from 'react';

import Desit from '../';



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

    it('basic', () => {
        const desit = new Desit({
            appID: desitAppID,
        });
        // desit.visit('/one');
        // desit.visit('/two');
        desit.interact('click', ButtonFC, {userID: 'one'});
        expect(true).toBeTruthy();
    });
});
