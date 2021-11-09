import create from 'zustand';

export const useSignUp = create((set, get) => ({
    organization: {},
    setOrganization: (org) => set(state => ({ organization: { ...state.organization, ...org } }))
}));
