const production = !process.env.ROLLUP_WATCH;

module.exports = {
    mode: production ? undefined : "jit",
    future: {
        purgeLayersByDefault: true,
        removeDeprecatedGapUtilities: true,
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            screens: {
                "3xl": "1600px",
            },
        },
    },
    variants: {
        extend: {},
    },
    purge: {
        content: ["./src/**/*.svelte", "./public/index.html"],
        enabled: production,
    },
    plugins: [],
};
