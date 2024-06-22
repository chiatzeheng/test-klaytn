import * as React from "react"; // import react into file
// import BaseError, and 2 hooks useWaitForTransactionReceipt, useWriteContract from wagmi library
import {
  type BaseError,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
// import the smart contract's abi file to get the function's interface
import { abi } from "./abi";

export function MintNFT() {
  const {
    data: hash, // assign the returned data to a variable named hash
    error, // assign error object to error variable
    isPending, // assign the isPending object to the isPending variable
    writeContract, // initialize the writeContract function for use
  } = useWriteContract();

  // function dùng để submit form
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const tokenId = formData.get("tokenId") as string;
    writeContract({
      address: "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2", // contract address
      abi, // abi of contract
      functionName: "mint", // function name you want to call
      args: [BigInt(tokenId)], // pass input to function
    });
  }

  // Call the useWaitForTransactionReceipt hook to initialize the isConfirming and isConfirmed states
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  // Return format of React
  return (
    <form onSubmit={submit}>
      <input name="address" placeholder="0xA0Cf…251e" required />
      <input name="value" placeholder="0.05" required />
      <button disabled={isPending} type="submit">
        {isPending ? "Confirming..." : "Mint"}
      </button>
      {hash && <div>Transaction Hash: {hash}</div>}

      {isConfirming && <div>Waiting for confirmation...</div>}

      {isConfirmed && <div>Transaction confirmed.</div>}
      {error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )}
    </form>
  );
}
