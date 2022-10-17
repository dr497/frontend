import React, { FC, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
  useConnection,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  SolletWalletAdapter,
  PhantomWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { Buffer } from "buffer";

window.Buffer = Buffer;

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";

export const App = () => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Mainnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [new SolletWalletAdapter(), new PhantomWalletAdapter()],
    [endpoint]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Component />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

const Component = () => {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();

  return (
    <div>
      {connected ? <WalletDisconnectButton /> : <WalletMultiButton />}
      {publicKey?.toBase58()}
    </div>
  );
};

export default App;
