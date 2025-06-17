import { useRef, useState, useEffect } from 'react'
import { ethers } from 'ethers'
import abi from './abi.json'
import { create } from 'ipfs-http-client'

// ipfs configuration
const ipfs = create('/ip4/127.0.0.1/tcp/5001')

// Environment variables with fallbacks
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '0x6800a1055325FCf2f776397d8Ea7e7F736123F75'
const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY || '0x6e3d98414db1e8af6d5a3c478a1bdcbadc74421aac406abeced180614b2dd850'
const NFT_STORAGE_TOKEN = import.meta.env.VITE_NFT_STORAGE_TOKEN || '3088f00f.60dd7540e5a942a890dad6a15be9668e'


function App() {
  const [recording, setRecording] = useState(false)
  const [videoUrl, setVideoUrl] = useState(null)
  const [recordedVideoUrl, setRecordedVideoUrl] = useState(null)
  const [status, setStatus] = useState('')
  const [timestamp, setTimestamp] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [apiToken, setApiToken] = useState(NFT_STORAGE_TOKEN)
  const [showTokenInput, setShowTokenInput] = useState(false)
  const [recordedBlob, setRecordedBlob] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [hasBlockchainError, setHasBlockchainError] = useState(false)

  const mediaRecorder = useRef(null)
  const recordedChunks = useRef([])
  const videoRef = useRef()
  const recordedVideoRef = useRef()
  const streamRef = useRef(null)

  // Check if we have access to MediaRecorder
  useEffect(() => {
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      setStatus("❌ Your browser doesn't support video recording. Please use Chrome, Firefox, or Edge.")
    }
  }, [])

  // Clean up stream when component unmounts
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const startRecording = async () => {
    try {
      // Reset previous recording state
      setVideoUrl(null)
      setRecordedVideoUrl(null)
      setTimestamp(null)
      setRecordedBlob(null)
      setUploadProgress(0)
      setHasBlockchainError(false)
      recordedChunks.current = []
      
      // Request camera and microphone permissions
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        }, 
        audio: true 
      })
      
      streamRef.current = stream
      videoRef.current.srcObject = stream
      videoRef.current.play()

      // Try to use WebM with VP9 codec if available
      let mimeType = 'video/webm;codecs=vp9'
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm' // Fallback to standard WebM
      }

      mediaRecorder.current = new MediaRecorder(stream, {
        mimeType: mimeType,
        videoBitsPerSecond: 2500000 // 2.5 Mbps
      })
      
      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) recordedChunks.current.push(e.data)
      }

      mediaRecorder.current.onstop = async () => {
        if (recordedChunks.current.length === 0) {
          setStatus("❌ Recording failed. No video data.")
          return
        }

        const blob = new Blob(recordedChunks.current, { type: 'video/webm' })
        setRecordedBlob(blob)
        const localVideoUrl = URL.createObjectURL(blob)
        setRecordedVideoUrl(localVideoUrl)
        
        // Show the recorded video in the video element
        if (recordedVideoRef.current) {
          recordedVideoRef.current.src = localVideoUrl
          recordedVideoRef.current.controls = true
        }

        setStatus(`✅ Recording complete! (${(blob.size / (1024 * 1024)).toFixed(2)} MB)`)
      }

      // Start recording with 1 second data intervals
      mediaRecorder.current.start(1000)
      setRecording(true)
      setStatus("🔴 Recording in progress... (audio and video)")
    } catch (err) {
      console.error("Media access error:", err)
      setStatus(`❌ Camera/microphone access failed: ${err.message}`)
    }
  }
  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
      mediaRecorder.current.stop()
      
      // Stop all tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
        streamRef.current = null
      }
      
      videoRef.current.srcObject = null
      setRecording(false)
    }
  }

  // Direct upload to Web3.Storage
  const uploadToIPFS = async () => {
    if (!recordedBlob) {
      setStatus("❌ No recording available to upload.")
      return
    }

    try {
      setIsUploading(true)
      setUploadProgress(5)
      setStatus("📤 Preparing to upload to IPFS...")
      
      // Create a File object from the Blob
      const fileName = `hersafe_recording_${new Date().toISOString().replace(/:/g, '-')}.webm`
      const file = new File([recordedBlob], fileName, { type: 'video/webm' })
      
      const result = await ipfs.add(
        {path: fileName, content: file},
        {wrapWithDirectory: true, progress: (prog) => setUploadProgress(prog)}
      )

      alert("result: " + JSON.stringify(result));

      // setStatus(`📤 Uploading video (${(file.size / (1024 * 1024)).toFixed(2)} MB) to IPFS...`)
      // // setUploadProgress(15)
      
      // // Using the Pinata API for more reliable uploads
      // // (This is an alternative to NFT.storage that has more consistent results)
      // const formData = new FormData()
      // formData.append('file', file)
      
      // const pinataMetadata = JSON.stringify({
      //   name: fileName,
      //   keyvalues: {
      //     app: "HerSafe",
      //     timestamp: Date.now()
      //   }
      // })
      // formData.append('pinataMetadata', pinataMetadata)
      
      // Using a backup/proxy service that handles IPFS uploads
      // We're using a mock URL here - replace with your actual IPFS upload endpoint
      // const mockid = "k51qzi5uqu5dhkxaq3gywq4pb3uc0ftzt31kobzujoqm5dqjiq4aan03plye8z"
      // const response = await fetch(`http://127.0.0.1:8081/ipns/${mockid}`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${apiToken}`
      //   },
      //   body: formData
      // }).catch(err => {
      //   console.error("Network error during upload:", err)
        
      //   // Simulate successful upload for demo purposes since we're calling a mock endpoint
      //   // In a real app, this would be removed and error handling would be implemented
      //   return { 
      //     ok: true, 
      //     json: () => Promise.resolve({ 
      //       success: true, 
      //       value: { cid: "Qm" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) }
      //     })
      //   }
      // })
      
      // setUploadProgress(70)
      
      // if (!response.ok) {
      //   // Handle error but continue for demo purposes
      //   console.error("Upload service error:", response.status)
      //   setStatus("⚠️ Upload service error, but continuing for demo...")
      // }

      // try {
      //   const data = await response.json()
      //   console.log("IPFS upload response:", data)
        
      //   // For demo purposes, generate a CID if the response doesn't have one
      //   const cid = "k51qzi5uqu5dhkxaq3gywq4pb3uc0ftzt31kobzujoqm5dqjiq4aan03plye8z"
      //   const ipfsGatewayUrl = `http://127.0.0.1:8081/ipns/${cid}`
        
      //   setVideoUrl(ipfsGatewayUrl)
      //   setUploadProgress(90)
      //   setStatus("✅ Uploaded to IPFS! Storing on blockchain...")
        
      //   // Save to blockchain
      //   await saveToBlockchain(ipfsGatewayUrl)
      // } catch (jsonError) {
      //   console.error("Error parsing response:", jsonError)
        
      //   // For demo purposes, generate a fake CID
      //   const mockCid = "k51qzi5uqu5dhkxaq3gywq4pb3uc0ftzt31kobzujoqm5dqjiq4aan03plye8z"
      //   const ipfsGatewayUrl = `http://127.0.0.1:8081/ipns/${mockCid}`
        
      //   setVideoUrl(ipfsGatewayUrl)
      //   setStatus("✅ Uploaded to IPFS! Storing on blockchain...")
        
      //   // Save to blockchain
      //   await saveToBlockchain(ipfsGatewayUrl)
      // }
      
    } catch (uploadError) {
      console.error("Upload error:", uploadError)
      setStatus(`❌ Upload failed: ${uploadError}`)
      setShowTokenInput(true)
    } finally {
      setIsUploading(false)
      setUploadProgress(100)
    }
  }

  const saveToBlockchain = async (link) => {
    try {
      // Connect to local Ganache blockchain
      const provider = new ethers.providers.JsonRpcProvider("http://192.168.239.193:8545")
      const wallet = new ethers.Wallet(PRIVATE_KEY, provider)
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet)

      // Store current timestamp
      const ts = Math.floor(Date.now() / 1000)
      
      // Call the smart contract function
      setStatus("💼 Sending transaction to blockchain...")
      const tx = await contract.storeVideo(link, ts)
      setStatus("⏳ Waiting for transaction confirmation...")
      const receipt = await tx.wait()
      
      console.log("Transaction receipt:", receipt)
      setTimestamp(ts)
      setStatus("✅ Successfully stored on blockchain!")
    } catch (err) {
      console.error("Blockchain error:", err)
      setHasBlockchainError(true)
      
      // Create a mock timestamp for demo purposes
      const ts = Math.floor(Date.now() / 1000)
      setTimestamp(ts)
      
      setStatus(`⚠️ Blockchain demo mode: ${err.message}`)
    }
  }

  return (
    <div className="p-6 flex flex-col items-center bg-gradient-to-b from-[#E2F4FB] to-[#E2F4FB] min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#155F57]">🎥 HerSafe Recording System</h1>
      
      {/* Token input section */}
      {showTokenInput && (
        <div className="mb-6 p-4 bg-white bg-opacity-70 rounded-lg w-full max-w-lg shadow-md">
          <p className="text-[#155F57] font-bold mb-2">Storage API Token:</p>
          <input
            type="password"
            value={apiToken}
            onChange={(e) => setApiToken(e.target.value)}
            placeholder="Enter your storage API token"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            onClick={() => setShowTokenInput(false)}
            className="mt-2 bg-[#5EC6B8] text-white px-4 py-1 rounded text-sm"
          >
            Save Token
          </button>
        </div>
      )}
      
      {/* Video container with responsive styling */}
      <div className="w-full max-w-lg bg-black rounded-lg shadow-xl overflow-hidden mb-6">
        {/* Live video feed (when recording) */}
        {!recordedVideoUrl && (
          <video 
            ref={videoRef} 
            className="w-full h-full aspect-video object-cover" 
            playsInline 
            muted
          ></video>
        )}
        
        {/* Recorded video playback */}
        {recordedVideoUrl && (
          <video 
            ref={recordedVideoRef}
            className="w-full h-full aspect-video" 
            playsInline 
            controls
            src={recordedVideoUrl}
          ></video>
        )}
      </div>
      
      {/* Button container */}
      <div className="mt-2 flex gap-4 flex-wrap justify-center">
        {!recording && !recordedVideoUrl && (
          <button
            onClick={startRecording}
            className="bg-[#4CAF50] hover:bg-[#45a049] text-white font-bold px-6 py-3 rounded-lg shadow-md transition-colors"
            disabled={isUploading}
          >
            🎬 Start Recording
          </button>
        )}
        
        {recording && (
          <button
            onClick={stopRecording}
            className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-lg shadow-md transition-colors animate-pulse"
          >
            ⏹️ Stop Recording
          </button>
        )}
        
        {recordedVideoUrl && !isUploading && !videoUrl && (
          <button
            onClick={uploadToIPFS}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-lg shadow-md transition-colors"
          >
            📤 Upload to IPFS
          </button>
        )}
        
        {recordedVideoUrl && !recording && (
          <button
            onClick={startRecording}
            className="bg-[#5EC6B8] hover:bg-[#4EB3A6] text-white font-bold px-6 py-3 rounded-lg shadow-md transition-colors"
            disabled={isUploading}
          >
            🔄 New Recording
          </button>
        )}
        
        {isUploading && (
          <button
            disabled
            className="bg-gray-400 text-white font-bold px-6 py-3 rounded-lg shadow-md flex items-center"
          >
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Uploading...
          </button>
        )}
      </div>

      {/* Status message */}
      {status && (
        <div className="mt-6 p-4 bg-white bg-opacity-70 rounded-lg shadow-md">
          <p className="text-[#155F57] font-medium">{status}</p>
          
          {/* Progress bar for upload */}
          {isUploading && (
            <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
              <div 
                className="bg-blue-500 h-4 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}
        </div>
      )}
      
      {/* IPFS Link */}
      {videoUrl && (
        <div className="mt-6 p-4 bg-white bg-opacity-80 rounded-lg w-full max-w-lg shadow-md">
          <p className="text-[#155F57] font-bold">📦 IPFS Link:</p>
          <a 
            href={videoUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-900 underline break-all"
          >
            {videoUrl}
          </a>
        </div>
      )}
      
      {/* Blockchain Timestamp */}
      {timestamp && (
        <div className="mt-4 p-4 bg-white bg-opacity-80 rounded-lg w-full max-w-lg shadow-md">
          <p className="text-[#155F57] font-bold">⏰ Timestamp:</p>
          <p className="text-gray-800">{new Date(timestamp * 1000).toLocaleString()}</p>
          <p className="mt-2 text-green-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {hasBlockchainError 
              ? "Demo mode: Data simulated for demonstration purposes" 
              : "Data securely stored on the blockchain"}
          </p>
        </div>
      )}
      
      {/* Footer */}
      <div className="mt-8 text-center text-[#155F57] text-sm">
        <p>HerSafe v1.0 - Secure Video Recording System</p>
        <p className="mt-1">© 2025 HerSafe - All videos are stored on IPFS and secured with blockchain technology</p>
      </div>
    </div>
  )
}

export default App