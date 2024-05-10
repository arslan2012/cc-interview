"use client"

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useIsMounted } from "@/utils/usIsMounted";

export default function ConnectButton() {
  const { isConnected } = useAccount();
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();
  const isMounted = useIsMounted()

  if (!isMounted) return null

  return isConnected ? (
    <button onClick={() => disconnect()}>Disconnect Wallet</button>
  ) : (
    <div>
      {connectors.map((connector) => (
        <button key={connector.id} onClick={() => connect({ connector })}>
          Connect with {connector.name}
        </button>
      ))}
      {error && <p>{error.message}</p>}
    </div>
  );
}
