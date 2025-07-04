import React from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import metamaskLogo from '../../assets/Ethereum/metamask.png'
import { useNavigate } from 'react-router-dom'
import { connectAndCheckSubscription } from '../../utils/connectAndCheck'
import { ethers } from "ethers"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../../constants/contract'
import spinner from '../../assets/spinner.webp'

const Login = () => {
  const [signState, setSignState] = React.useState("Sign In")
  const [selectedPlan, setSelectedPlan] = React.useState("yearly")
  const [buttonState, setButtonState] = React.useState('Buy NFT')
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault()

    if (signState === "Sign In") {
      const result = await connectAndCheckSubscription()

      if (!result.success) {
        alert(result.message)
        return
      }

      if (result.subscribed) {
        navigate('/')
      } else {
        alert("❌ Account not subscribed.")
      }
    } else {
      // Sign Up: Mint NFT
      await buySubscriptionNFT()
    }
  }

  const buySubscriptionNFT = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask")
      return
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

      let tx
      if (selectedPlan === "weekly") {
        tx = await contract.mintWeekly({ value: ethers.parseEther("0.005") })
      } else if (selectedPlan === "monthly") {
        tx = await contract.mintMonthly({ value: ethers.parseEther("0.01") })
      } else if (selectedPlan === "yearly") {
        tx = await contract.mintYearly({ value: ethers.parseEther("0.1") })
      }

      setButtonState(<img src={spinner} width={20} />)

      await tx.wait()
      setSignState("Sign In")
      setButtonState('Buy NFT')
      alert("✅ NFT Subscription Minted Successfully!")
    } catch (err) {
      console.error(err)
      alert("❌ Failed to mint NFT.")
    }
  }

  return (
    <div className='login'>
      <img src={logo} alt="" className='login-logo' />
      <div className="login-form">
        <h1>{signState === "Sign Up" ? "Purchase Pass" : signState}</h1>

        <form onSubmit={handleSignIn}>
          {signState === "Sign Up" ? (
            <>
              <div className="plan-cards">
                <div
                  className={`plan-card ${selectedPlan === "weekly" ? "selected" : ""}`}
                  onClick={() => setSelectedPlan("weekly")}
                >
                  <h3>Weekly</h3>
                  <p>0.005 ETH</p>
                </div>

                <div
                  className={`plan-card ${selectedPlan === "monthly" ? "selected" : ""}`}
                  onClick={() => setSelectedPlan("monthly")}
                >
                  <h3>Monthly</h3>
                  <p>0.01 ETH</p>
                </div>

                <div
                  className={`plan-card ${selectedPlan === "yearly" ? "selected" : ""}`}
                  onClick={() => setSelectedPlan("yearly")}
                >
                  <h3>Yearly</h3>
                  <p>0.1 ETH</p>
                </div>
              </div>
              <button type="submit">{buttonState}</button>
            </>
          ) : (
            <>
              <h3>with</h3>
              <img
                src={metamaskLogo}
                alt="MetaMask"
                style={{
                  width: '300px',
                  marginBottom: '50px',
                  marginTop: '50px'
                }}
              />
              <button type="submit">Sign In</button>
            </>
          )}

          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>

        <div className="form-switch">
          {signState === "Sign Up" ? (
            <p>Already have NFT Pass? <span onClick={() => setSignState("Sign In")}>Sign In</span></p>
          ) : (
            <p>New to Netflix? <span onClick={() => setSignState("Sign Up")}>Buy NFT Pass Now</span></p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
