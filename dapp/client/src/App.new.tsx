import React, { useRef, useState } from 'react';
import Web3 from 'web3';

import SimpleStorageContract from './contracts/SimpleStorage.json';
import getWeb3 from './getWeb3';

function useWeb3() {
    const state = useRef<{ web3?: Web3; accounts: string[]; contract: any }>({ accounts: [], contract: {} });
    const [storage, setStorage] = useState(0);

    const runExample = async () => {
        const { accounts, contract } = state.current;

        // Stores a given value, 5 by default.
        await contract.methods.set(50).send({ from: accounts[0] });

        // Get the value from the contract to prove it worked.
        const response = await contract.methods.get().call();

        // Update state with the result.
        setStorage(response);
    };

    (async () => {
        try {
            // Get network provider and web3 instance.
            const web3: Web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            const deployedNetwork =
                SimpleStorageContract.networks[`${networkId}` as keyof typeof SimpleStorageContract.networks];

            const instance = new web3.eth.Contract(
                SimpleStorageContract.abi as any,
                deployedNetwork && deployedNetwork.address,
            );

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            state.current = { web3, accounts, contract: instance };
            runExample();
            // this.runExample);
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(`Failed to load web3, accounts, or contract. Check console for details.`);
            console.error(error);
        }
    })();

    return { ...state.current, storage };
}

function App() {
    const state = useWeb3();

    if (!state.web3) {
        return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
        <div className="App">
            <h1>Good to Go!</h1>
            <p>Your Truffle Box is installed and ready.</p>
            <h2>Smart Contract Example</h2>
            <p>
                If your contracts compiled and migrated successfully, below will show a stored value of 5 (by default).
            </p>
            <p>
                Try changing the value stored on
                <strong>line 40</strong>
                of App.js.
            </p>
            <div>
                The stored value is:
                {state.storage}
            </div>
        </div>
    );
}

export default App;
