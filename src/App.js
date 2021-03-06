console.log("in App.jsx")
import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import store from './data/store';
console.log("registered store")
import registerScreens from './views/screens';

console.log("registered screens")

registerScreens(store, Provider);


export default class App extends React.Component {
    constructor(props) {
	console.log("constructor start")
        super(props);
        store.subscribe(this.onStoreUpdate.bind(this));
	console.log("constructor enddzxs")
	const state = store.getState();
	console.log("state: ", state);
        //this.startApp(state.appRoot);	
        // LINKING.getInitialURL().then(url => {		
        //     console.log({url});
        //     if (url) {	
        //     }
        // });

        // Linking.addEventListener('url', this.handleOpenURL);
        //this.startApp('IntroScreen');
    }

    // handleOpenURL = (event) => {
    // 	if (event && event.url) {
    // 	    //
    // 	    // redirect here
    // 	    console.log({event})
    // 	    store.dispatch(claimTokens(event.url));
    // 	}
    // }


    onStoreUpdate() {
	console.log("on store updated")
        const state = store.getState();
        const root = state.appRoot;
        // handle a root change
        if (this.currentRoot !== root) {
            this.currentRoot = root;
            this.startApp(root);
        }
    }

    startApp(root, params = null) {
        //root = 'ReceiveScreen'

	console.log("Start App")
        switch (root) {
            case 'IntroScreen':
                Navigation.startSingleScreenApp({
                    screen: {
                        screen: 'dailywallet.IntroScreen', // unique ID registered with Navigation.registerScreen
                        navigatorStyle: {
                            orientation: 'portrait',
                            //screenBackgroundColor: '#242836',
                            // navBarHidden: true,
                        }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
                        navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
                    },
                });
                return;
            case 'BalanceScreen':
                Navigation.startSingleScreenApp({
                    screen: {
                        screen: 'dailywallet.BalanceScreen', // unique ID registered with Navigation.registerScreen
                        navigatorStyle: {
                            orientation: 'portrait',
                            //screenBackgroundColor: '#242836',
                            // navBarHidden: true,
                        }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
                        navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
                    },
                });
            return;
            // case 'ClaimScreen':
            //     Navigation.startSingleScreenApp({
            //         screen: {
            //             screen: 'dailywallet.ClaimScreen', // unique ID registered with Navigation.registerScreen
            //             navigatorStyle: {
            //                 orientation: 'portrait',
            //                 //screenBackgroundColor: '#242836',
            //                 // navBarHidden: true,
            //             }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
            //             navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
            //         },
            //     });
            //     return;	    
            // case 'ReceiveScreen':
            //     Navigation.startSingleScreenApp({
            //         screen: {
            //             screen: 'dailywallet.ReceiveScreen', // unique ID registered with Navigation.registerScreen
            //             navigatorStyle: {
            //                 orientation: 'portrait',
            //                 //screenBackgroundColor: '#242836',
            //                 // navBarHidden: true,
            //             }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
            //             navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
            //         },
	    // 	    passProps: {}
            //     });
            //     return;
            // 	tabsStyle: { // optional, add this if you want to style the tab bar beyond the defaults
            // 	    tabBarButtonColor: '#999999', // optional, change the color of the tab icons and text (also unselected). On Android, add this to appStyle
            // 	    tabBarSelectedButtonColor: '#02BF19', // optional, change the color of the selected tab icon and text (only selected). On Android, add this to appStyle
            // 	    tabBarBackgroundColor: '#f8f8f8', // optional, change the background color of the tab bar
            // 	    tabBarTranslucent: false,
            // 	    initialTabIndex: 0, // optional, the default selected bottom tab. Default: 0. On Android, add this to appStyle
            // 	},
            // 	appStyle: {
            // 	    orientation: 'portrait',
            // 	    tabBarButtonColor: '#999999', // optional, change the color of the tab icons and text (also unselected). On Android, add this to appStyle
            // 	    tabBarSelectedButtonColor: '#fff', // optional, change the color of the selected tab icon and text (only selected). On Android, add this to appStyle
            // 	    tabBarBackgroundColor: '#242836', // optional, change the background color of the tab bar
            // 	    initialTabIndex: 0, // optional, the default selected bottom tab. Default: 0. On Android, add this to appStyle
            // 	},
            // 	animationType: 'fade'
            //     });	    
            default:
            // pass
        }
    }
}

