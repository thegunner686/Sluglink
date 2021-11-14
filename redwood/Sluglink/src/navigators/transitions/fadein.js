export const FadeInTransition = {
    transitionSpec: {
        open: {
            animation: "timing",
            config: { duration: 500 }
        },
        close: {
            animation: "timing",
            config: { duration: 500 }
        }
    },
    cardStyleInterpolator: ({ current: { progress }}) => {
        return {
            cardStyle: {
                opacity: progress,
            }
        }
    }
};
