import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, TouchableOpacity, Text, Image, RefreshControl, Platform, ActionSheetIOS } from 'react-native';
import { deleteWallet, fetchBalance, onPressRedeemBtn } from './../../actions/wallet';
import styles from './styles';


class BalanceScreen extends React.Component {
    static navigatorStyle = {
        navBarTextColor: 'white',
        navBarBackgroundColor: '#302E2E',
        navBarButtonColor: 'white',
    }

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
	this.state = {
            fetchingBalance: false
	};
    }

    componentWillMount() {
        this.props.navigator.setTitle({ title: 'Daily' });
	let rightButtons = [];
	if (Platform.OS === 'ios') {
	    //
	    rightButtons = [
		{
		    id: 'settingsIOS',
		    icon: require('../../img/settings.png')
		}		
	    ]
	} else { // Action Bar on android
	    rightButtons = [
                {
		    id: 'deleteWallet',
		    title: 'Erase wallet',
                    showAsAction: 'withText'
                },
                {
                    id: 'infoButton',
                    title: 'Info',
                    showAsAction: 'withText'
                },		
	    ]
	}

	this.props.navigator.setButtons({
	    rightButtons
        });
    }

    onNavigatorEvent(event) {
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'deleteWallet') {
                this._deleteWallet();
            } else if (event.id == 'infoButton') {
		this.props.navigator.push({ screen: 'dailywallet.InfoScreen' });
            } else if (event.id == 'settingsIOS') {
		this._showActionSheetIOS();
            }	    
        }
    }

    _showActionSheetIOS() {
	ActionSheetIOS.showActionSheetWithOptions( {
	    options: ['Cancel', 'Info', 'Delete Wallet'],
	    destructiveButtonIndex: 2,
	    cancelButtonIndex: 0,
	},  (buttonIndex) => {
	    if (buttonIndex === 1) {
		this.props.navigator.push({ screen: 'dailywallet.InfoScreen' });		
	    } else if (buttonIndex === 2) {
		this._deleteWallet();
	    }
	});		
    }

    _deleteWallet() {
        this.props.deleteWallet();
        //this.props.navigator.push({ screen: 'dailywallet.IntroScreen' })
    }

    onRefresh() {
        this.setState({ fetchingBalance: true });
        setTimeout(async () => {
            try {
                await this.props.fetchBalance();
            } catch (err) {
                console.log(err);
                alert("Error")
            }
            this.setState({ fetchingBalance: false });
        });
    }

    _renderStatusBar() {
        if (this.props.isPendingTx) {
	    return (
                <View style={{...styles.statusBarContainer }}>
                  <Text style={{ ...styles.balance, fontSize: 28 / 1.5, marginTop: 7}}>
		    { this.props.pendingAmount ? 
			`+ $${this.props.pendingClaimTx.amount / 100} is pending` :
		     'Checking copied link...' }
                  </Text>
                </View>
	    );
        }
    }


    render() {
        return (
            <ScrollView contentContainerStyle={styles.screenContainer}
                refreshControl={<RefreshControl onRefresh={this.onRefresh.bind(this)} refreshing={this.state.fetchingBalance} />}
            >
                <View style={styles.balanceContainer}>
                    <Text style={{ ...styles.balance, fontSize: 28 / 1.5 }}>Your balance is</Text>
                    <Text style={{ ...styles.balance, fontSize: 60 / 1.5 }}>${this.props.balance}</Text>
                    {this._renderStatusBar()}
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <View style={{ alignItems: 'center', marginBottom: 50 }}>
                      <TouchableOpacity onPress={() => this.props.onPressRedeemBtn(this.props.navigator)}>
                            <Image source={require('./../../img/redeem_icon.png')}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center', marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => this.props.navigator.push({ screen: 'dailywallet.SendScreen' })}>
                            <Image source={require('./../../img/send_icon.png')}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
}


function mapStateToProps(state) {
    return {
        balance: state.data.wallet.balance,
	pendingClaimTx: state.data.pendingClaimTx,
	isPendingTx: state.data.pendingClaimTx.isPending,
	pendingAmount: state.data.pendingClaimTx.amount
    }
}

export default connect(mapStateToProps, { deleteWallet, fetchBalance, onPressRedeemBtn })(BalanceScreen);
