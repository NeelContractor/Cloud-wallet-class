import { Transaction, Connection, LAMPORTS_PER_SOL, SystemProgram, PublicKey } from "@solana/web3.js"
import './App.css'
import axios from "axios";

const connection = new Connection("https://api.devnet.solana.com");
const fromPubkey = new PublicKey("3f2QVSxkrcGAmtTxGybzTKjzSarDV4j8CEPdkkAhJ18w");

function App() {


  async function sendSol() {
    const ix = SystemProgram.transfer({
      fromPubkey: fromPubkey,
      toPubkey: new PublicKey("NeeF4wurno255WqxWwgTsXK6EWkwNkZiRkxHZE919AD"),
      lamports: 0.001 * LAMPORTS_PER_SOL
    })
    const tx = new Transaction().add(ix)

    const { blockhash } = await connection.getLatestBlockhash();
    tx.recentBlockhash = blockhash;
    tx.feePayer = fromPubkey;

    // convert the transactioin to bunch of bytes
    const serializedTx = tx.serialize({
      requireAllSignatures: false,
      verifySignatures: false
    });

    console.log(serializedTx);

    await axios.post("http://localhost:3000/api/v1/txn/sign", {
      message: serializedTx,
      retry: false
    })
  }

  return (
    <>
      <div>
        <input type="text" placeholder='Address' />
        <input type="text" placeholder='Amount' />
        <button onClick={sendSol}>Submit</button>
      </div>
    </>
  )
}

export default App
