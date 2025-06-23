import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
    appId: "com.pantrypal.app",
    appName: "PantryPal",
    webDir: "dist",
    server: {
        // You can remove this if you're not using live reload from a remote dev server
        // or replace with your own if needed
        // url: 'https://your-dev-server.com',
        cleartext: true,
    },
    plugins: {
        SplashScreen: {
            launchShowDuration: 3000,
            launchAutoHide: true,
            backgroundColor: "#22c55e",
            androidSplashResourceName: "splash",
            androidScaleType: "CENTER_CROP",
            showSpinner: false,
            splashFullScreen: true,
            splashImmersive: true,
            layoutName: "launch_screen",
            useDialog: true,
        },
    },
};

export default config;
