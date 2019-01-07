import { changeAppRoot } from 'DailyWallet/src/actions/app';
import ulSdk from 'DailyWallet/src/services/sdkService';


function configureStore(store) {  
    return () => {
	const state = store.getState();			
	console.log("in configture store")
	
	// set root screen (add wallet screen or home screen with tabs)
	let root;
 	if (state.data.keystore.pubKeyAddress === '') {
	    root = 'IntroScreen';
	// } else if (state.data.wallet.address === '') {
	//     root = 'ClaimScreen';
	} else { 
	    root = 'BalanceScreen';
	}
	//root = 'ReceiveScreen';
	console.log("Changing root", root)	
	store.dispatch(changeAppRoot(root));

	// start universal logins sdk
	ulSdk.start();
   };
}

export default configureStore;
