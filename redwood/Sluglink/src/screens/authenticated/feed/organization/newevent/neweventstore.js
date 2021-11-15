import create from 'zustand';

export const useNewEvent = create((set, get) => ({
    newEvent: {},
    setNewEvent: (nw) => set(state => ({ newEvent: { ...state.newEvent, ...nw } }))
}));