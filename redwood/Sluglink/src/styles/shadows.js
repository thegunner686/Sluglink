import { Colors } from './colors';

export const Shadow = {
    top: {
        shadowColor: Colors.Black.hex,
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: {
            width: 0,
            height: -1,
        },
    },
    bottom: {
        shadowColor: Colors.Black.hex,
        shadowOpacity: 0.4,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 1,
        },
    },
    standard: {
        shadowColor: Colors.Black.hex,
        shadowOpacity: 0.15,
        shadowRadius: 3,
        shadowOffset: {
            width: 1,
            height: 1,
        },
    },
};
