import React, { useState } from 'react'
import { CardHeader, AppFooter } from '../../Utilities/Cards';
import { Link } from 'react-router-dom';
import iconData from '../../Utilities/IconData';

const WalletListField = ({ walletInfo }) => {
	const { name, shortcut, price, diff, icon: Icon } = walletInfo;
	return (
		<div className="card" id="list-field">
			<div className="card-body">
				<div className="row justify-content-between">
					<div className="col">
						<h5 className="card-title"><Icon />{name}</h5>
						<h6 className="card-subtitle">{name}</h6>
					</div>
					<div className="col d-flex flex-column align-items-end">
						<span className="card-title">$ {price}</span>
						<span className="card-subtitle">{diff}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

const Wallet = (props) => {

	let storedWallets = window.localStorage.getItem('wallets') || JSON.stringify([{
		name: "JohnnyCoin",
		shortcut: "JHC",
		address: "0xa823a39d2d5d2b981a10ca8f0516e6eaff78bdcf",
		price: "24.32",
		diff: "+5.90%"
	}]);;

	const [wallets, setWallets] = useState(JSON.parse(storedWallets).map(wallet => ({ ...wallet, icon: iconData['default'] })));
	const [showModal, setShowModal] = useState(false);
	const [name, setName] = useState('');
	const [shortcut, setShortcut] = useState('');
	const [address, setAddress] = useState('0xa823a39d2d5d2b981a10ca8f0516e6eaff78bdcf');

	const _getWallets = () => {

		const walletsToSend = {};

		wallets.forEach(wallet => {
			if (wallet.shortcut === 'ZIL' || wallet.shortcut === 'ETH')
				walletsToSend[wallet.shortcut] = { "address": wallet.address };
		})

		return {
			"resolution": {
				"crypto": walletsToSend
			}
		};
	}

	console.log(JSON.stringify(_getWallets()));


	const _renderHeaderButtons = () => (
		<div className="row justify-content-end" id="buttons">
			<button type="button" className="btn btn-dark btn-md" onClick={(e) => setShowModal(true)}>Add new wallet</button>
			<button type="button" className="btn btn-dark btn-md" onClick={e => _reset()}>Reset</button>
		</div>
	);

	const _renderWalletList = () => (
		<div className="card">
			{wallets.map((wallet, index) => <WalletListField walletInfo={wallet} key={index} />)}
		</div>
	)

	const _reset = () => {
		window.localStorage.clear();
		window.location.reload();
	}

	const _addWallet = (e) => {
		console.log('add new wallet!', { name, shortcut, address });
		e.preventDefault();
		const update = [...wallets, { name, shortcut, address, diff: '-', icon: iconData['default'], price: 5 }]
		setWallets(update);
		window.localStorage.setItem('wallets', JSON.stringify(update));
		setShowModal(false);
	}

	const _renderForm = () => {
		return (<div className="card">
			<div className="card-body">
				<form onSubmit={_addWallet}>
					<div className="form-group">
						<label htmlFor="formGroupExampleInput">Wallet Name</label>
						<input
							type="text" className="form-control"
							id="formGroupExampleInput" placeholder="Wallet Name"
							value={name} onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="formGroupExampleInput">Shortcut</label>
						<input
							type="text" className="form-control"
							id="formGroupExampleInput" placeholder="Shortcut"
							value={shortcut} onChange={(e) => setShortcut(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="formGroupExampleInput">Address</label>
						<input
							type="text" className="form-control"
							id="formGroupExampleInput" placeholder="Address"
							value={address} onChange={(e) => setAddress(e.target.value)}
						/>
					</div>

				</form>
			</div>
		</div>);
	}


	const _renderAppScreen = () => (
		<div className="container-fluid">
			<div className="card" style={{ width: "30rem", minHeight: "40rem" }}>
				<CardHeader title="Wallets" secondLine={_renderHeaderButtons} />
				<div className="card-body">
					{showModal ? _renderForm() : _renderWalletList()}
					{showModal ?
						<div className="row justify-content-md-center">
							<button type="button" className="btn btn-primary btn-md" id="margin-top" onClick={_addWallet}>Create Wallet</button>
							<button type="button" className="btn btn-danger btn-md" id="margin-top" onClick={(e) => setShowModal(false)}>Cancel</button>

						</div>
						:
						<Link to={{
							pathname: '/search',
							state: {
								wallets: _getWallets()
							}

						}}>
							<button type="button" className="btn btn-primary btn-block" id="margin-top">Buy .ZIL domains</button>
						</Link>
					}
				</div>
				<AppFooter />
			</div>
		</div >
	);

	const _renderLeftHints = () => (
		<div className="container-fluid">
			<div className="card" style={{ width: "25rem", minHeight: "40rem" }}>
				<div className="card-body">
					<h5 className="card-title">Left Hints</h5>
					<div className="card">
						<div className="card-header">
							<p className="card-text">You need to have a ZIL or ETH wallet in your list to  buy a domain</p>
						</div>
						<div className="card-body">
							<ul style={{ paddingLeft: '15px' }}>
								<li>Click on the add new wallet button at the top</li>
								<li>Fill the form</li>
								<li>Don't change the address</li>
								<li>Submit is on the left</li>
							</ul>
						</div>
					</div>

				</div>
			</div>
		</div >
	)

	const _renderRightHints = () => (
		<div className="container-fluid">
			<div className="card" style={{ width: "25rem", minHeight: "40rem" }}>
				<div className="card-body">
					<h5 className="card-title">Right Hints</h5>
					<div className="card" id="list-field">
						<div className="card-header">
							<h5 className="card-title">Add new wallet</h5>
						</div>
						<div className="card-body">
							<p className="card-text">For testing purporses you can create a mock wallet by pressing plus button on top</p>
						</div>
					</div>
					<div className="card" id="list-field">
						<div className="card-header">
							<h5 className="card-title">Clean the list</h5>
						</div>
						<div className="card-body">
							<p className="card-text">You can erase all wallets created earlier by pressing reset button</p>
						</div>
					</div>

				</div>
			</div>
		</div >
	)

	return (
		<div className="row justify-content-md-center flex-nowrap">
			<div className="col-md-fluid hidden-md-down">
				<div className="container">
					{_renderLeftHints()}
				</div>
			</div>
			<div className="col-md-fluid">
				<div className="container">
					{_renderAppScreen()}
				</div>
			</div>
			<div className="col-lg-fluid hidden-md-down">
				<div className="container">
					{_renderRightHints()}
				</div>
			</div>
		</div>
	);
}

export default Wallet
