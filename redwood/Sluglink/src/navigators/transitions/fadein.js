export const FadeInTransition = {
    transitionSpec: {
        open: {
            animation: "timing",
            config: { duration: 200 }
        },
        close: {
            animation: "timing",
            config: { duration: 200 }
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
