/**
 * Clears database. Use it to avoid persistence between tests
 *
 * @example cy.resetDb()
 */
export const resetDb = () => {
    const request = indexedDB.deleteDatabase('detahard-suite');

    request.onerror = function () {
        return cy;
    };

    request.onsuccess = function () {
        return cy;
    };
};
