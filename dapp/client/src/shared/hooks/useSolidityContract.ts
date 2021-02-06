/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import getWeb3 from 'getWeb3';

import Adoption from 'contracts/Adoption.json';
import PlayerToken from 'contracts/PlayerToken.json';
import SimpleStorage from 'contracts/SimpleStorage.json';

const CONTRACTS = { Adoption, PlayerToken, SimpleStorage };

export default (contractKey: keyof typeof CONTRACTS) => {
    const [web3, setWeb3] = useState<Web3>();
    const [account, setAccount] = useState('');
    const [contract, setContract] = useState<any>();

    useEffect(() => {
        const rawContract = CONTRACTS[contractKey];
        (async () => {
            try {
                // Get network provider and web3 instance.
                const web3Instance: Web3 = await getWeb3();

                // Use web3 to get the user's accounts.
                const [ethAccount] = await web3Instance.eth.getAccounts();

                // Get the contract instance.
                const networkId = await web3Instance.eth.net.getId();
                const deployedNetwork: any = rawContract.networks[`${networkId}` as keyof typeof rawContract.networks];
                const instance = new web3Instance.eth.Contract(
                    rawContract.abi as any,
                    deployedNetwork && deployedNetwork.address,
                );

                // Set web3, accounts, and contract to the state, and then proceed with an
                // example of interacting with the contract's methods.
                setWeb3(web3Instance);
                setAccount(ethAccount);
                setContract(instance);
            } catch (error) {
                // Catch any errors for any of the above operations.
                alert(`Failed to load web3, accounts, or contract. Check console for details.`);
                console.error(error);
            }
        })();
    }, [contractKey]);

    return { account, web3, contract };
};
