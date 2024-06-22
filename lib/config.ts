import { getDefaultWallets, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { trustWallet, ledgerWallet } from "@rainbow-me/rainbowkit/wallets";
import {
  klaytn, // import klaytn mainnet
  klaytnBaobab, // import klaytn testnet
} from "wagmi/chains";
import { http } from "wagmi";
// import according to docs

const { wallets } = getDefaultWallets();
// initialize and destructure wallets object

export const config = getDefaultConfig({
  appName: "MY_APP", // Name your app
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID!, // Enter your WalletConnect Project ID here
  wallets: [
    ...wallets,
    {
      groupName: "Other",
      wallets: [trustWallet, ledgerWallet],
    },
  ],
  chains: [klaytn, klaytnBaobab],
  transports: {
    [klaytn.id]: http("https://rpc.ankr.com/klaytn"), // Select RPC provider Ankr instead of the default
    [klaytnBaobab.id]: http("https://rpc.ankr.com/klaytn_testnet"), // Select RPC provider Ankr instead of the default
  },
  ssr: true, // Because it is Nextjs's App router, you need to declare ssr as true
});
