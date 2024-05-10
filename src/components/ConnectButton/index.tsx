"use client"
import Image from "next/image";
import { useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import { useIsMounted } from "@/utils/usIsMounted";
import { SignInButton } from "@/components/SignInButton";

export default function ConnectButton() {
  const isMounted = useIsMounted()
  const { address, connector, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName ?? undefined })
  const { connect, connectors, error } =
    useConnect()
  const { disconnect } = useDisconnect()

  if (!isMounted) return null;

  if (isConnected) {
    return (
      <div>
        {ensAvatar && <Image src={ensAvatar} alt="ENS Avatar"/>}
        <div>{ensName ? `${ensName} (${address})` : address}</div>
        <div>Connected to {connector?.name}</div>
        <button onClick={() => disconnect()}>Disconnect Wallet</button>
        <SignInButton/>
      </div>
    )
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
        </button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  )
}
