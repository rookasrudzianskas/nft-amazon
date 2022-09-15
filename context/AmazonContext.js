import { createContext, useState, useEffect } from 'react'
import { useMoralis, useMoralisQuery } from 'react-moralis'
// import { amazonAbi, amazonCoinAddress } from '../lib/constants'
import { ethers } from 'ethers'

export const AmazonContext = createContext();

export const AmazonProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('')
    const [formattedAccount, setFormattedAccount] = useState('')
    const [balance, setBalance] = useState('')
    const [tokenAmount, setTokenAmount] = useState('')
    const [amountDue, setAmountDue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [etherscanLink, setEtherscanLink] = useState('')
    const [nickname, setNickname] = useState('')
    const [username, setUsername] = useState('')
    const [assets, setAssets] = useState([])
    const [recentTransactions, setRecentTransactions] = useState([])
    const [ownedItems, setOwnedItems] = useState([])

    const {
        authenticate,
        isAuthenticated,
        enableWeb3,
        Moralis,
        user,
        isWeb3Enabled,
    } = useMoralis();

    const {
        data: userData,
        error: userDataError,
        isLoading: userDataIsLoading,
    } = useMoralisQuery('_User');

    const {
        data: assetsData,
        error: assetsDataError,
        isLoading: assetsDataIsLoading,
    } = useMoralisQuery('assets');

    useEffect(() => {
        ;(async () => {
            if (isAuthenticated) {
                const currentUsername = await user?.get('username');
                setUsername(currentUsername);
            }
        })()
    }, [isAuthenticated]);

    const getAssets = async () => {
        try {
            await enableWeb3()
            // const query = new Moralis.Query('Assets')
            // const results = await query.find()
            setAssets(assetsData)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        ;(async () => {
            if(isWeb3Enabled) {
                await getAssets();
            }
        })();
    }, [getAssets, isWeb3Enabled, assetsData, assetsDataIsLoading]);



    const handleSetUsername = () => {
        if (user) {
            if (nickname) {
                user.set('nickname', nickname)
                user.save()
                setNickname('')
            } else {
                console.log("Can't set empty nickname")
            }
        } else {
            console.log('No user')
        }
    }




    return (
        <AmazonContext.Provider
            value={{
                // formattedAccount,
                isAuthenticated,
                // buyTokens,
                // getBalance,
                // balance,
                // setTokenAmount,
                // tokenAmount,
                // amountDue,
                // setAmountDue,
                // isLoading,
                // setIsLoading,
                // setEtherscanLink,
                // etherscanLink,
                // buyAsset,
                // currentAccount,
                nickname,
                setNickname,
                username,
                setUsername,
                handleSetUsername,
                assets,
                // recentTransactions,
                // ownedItems,
            }}
        >
            {children}
        </AmazonContext.Provider>
    )
}



