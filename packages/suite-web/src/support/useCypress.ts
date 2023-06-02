import { useEffect } from 'react';
import detahardConnect from '@detahard/connect';
import { useStore } from 'react-redux';

/**
 * Utility for running tests in Cypress.
 * Used to augment window object with redux store and detahardConnect instance to make it accessible in tests
 */
export const useCypress = () => {
    const store = useStore();

    useEffect(() => {
        if (typeof window !== 'undefined' && window.Cypress) {
            window.store = store;
            window.detahardConnect = detahardConnect;
            return () => {
                delete window.store;
                delete window.detahardConnect;
            };
        }
    }, [store]);
};
