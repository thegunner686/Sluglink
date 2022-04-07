import create from 'zustand';

/**
 * Holds state between creation pages (like redux but not redux)
 * @type {string} title
 * @type {Date} startDate
 * @type {Date} endDate
 * @type {Boolean} isVirtual -> {link & virtualInfo}
 * @type {Boolean} isPhysical -> {location & physicalInfo} 
 */
export const useNewEvent = create((set, get) => ({
    newEvent: {},
    setNewEvent: (nw) => set(state => ({ newEvent: { ...state.newEvent, ...nw } }))
}));