import express from 'express';
import App from "./Services/ExpressApp";
import DbCon from "./Services/Database";
import { PORT } from './config'

const StartServer = async () => {
    const app = express();
    await DbCon();
    await App(app);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}!!! NGON;)))`);
    })
}

StartServer();

































// import { registerRootComponent } from 'expo';

// import App from './App';

// // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// // It also ensures that whether you load the app in Expo Go or in a native build,
// // the environment is set up appropriately
// registerRootComponent(App);
