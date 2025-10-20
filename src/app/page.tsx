'use client'

import { useState } from 'react'
import CodeEditor from '@/components/CodeEditor'
import ContractPanel from '@/components/ContractPanel'
import AIAssistant from '@/components/AIAssistant'
import WalletInput from '@/components/WalletInput'
import NewFileModal from '@/components/NewFileModal'
import { useToast } from '@/contexts/ToastContext'

const defaultContract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MyContract {
    string public message;
    address public owner;
    
    event MessageUpdated(string newMessage);
    
    constructor(string memory _initialMessage) {
        message = _initialMessage;
        owner = msg.sender;
    }
    
    function updateMessage(string memory _newMessage) public {
        require(msg.sender == owner, "Only owner can update message");
        message = _newMessage;
        emit MessageUpdated(_newMessage);
    }
    
    function getMessage() public view returns (string memory) {
        return message;
    }
}`

export default function Home() {
  const [contractCode, setContractCode] = useState<string>(defaultContract)
  const [isCompiling, setIsCompiling] = useState(false)
  const [isDeploying, setIsDeploying] = useState(false)
  const [compilationResult, setCompilationResult] = useState<any>(null)
  const [deploymentResult, setDeploymentResult] = useState<any>(null)
  const [privateKey, setPrivateKey] = useState('')
  const [walletAddress, setWalletAddress] = useState('')
  const [currentFileName, setCurrentFileName] = useState('MyContract.sol')
  const [isNewFileModalOpen, setIsNewFileModalOpen] = useState(false)
  const [openFiles, setOpenFiles] = useState<string[]>(['MyContract.sol'])
  const [fileContents, setFileContents] = useState<Record<string, string>>({
    'MyContract.sol': defaultContract
  })
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 })
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '$ creditcoin-playground',
    'Welcome to Creditcoin Smart Contract IDE',
    'Ready to compile and deploy contracts to Creditcoin testnet'
  ])
  const { showToast } = useToast()

  const addTerminalLog = (message: string) => {
    setTerminalLogs(prev => [...prev, message])
  }

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white flex flex-col">
      {/* IDE Header/Menu Bar */}
      <div className="bg-[#2d2d30] border-b border-[#3e3e42] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="font-semibold text-sm">Creditcoin Playground</span>
          
          {/* Menu Items */}
          <div className="flex items-center space-x-1 text-sm">
            <button className="px-3 py-1 hover:bg-[#3e3e42] rounded text-gray-300 hover:text-white transition-colors">
              File
            </button>
            <button className="px-3 py-1 hover:bg-[#3e3e42] rounded text-gray-300 hover:text-white transition-colors">
              Edit
            </button>
            <button className="px-3 py-1 hover:bg-[#3e3e42] rounded text-gray-300 hover:text-white transition-colors">
              View
            </button>
            <button className="px-3 py-1 hover:bg-[#3e3e42] rounded text-gray-300 hover:text-white transition-colors">
              Terminal
            </button>
            <button className="px-3 py-1 hover:bg-[#3e3e42] rounded text-gray-300 hover:text-white transition-colors">
              Help
            </button>
          </div>
        </div>

        {/* Right side - Network status */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-gray-300">Creditcoin Testnet</span>
          </div>
          <a 
            href="https://docs.creditcoin.org/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-gray-200 transition-colors"
          >
            Docs ↗
          </a>
          <a 
            href="https://creditcoin-testnet.blockscout.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-gray-200 transition-colors"
          >
            Explorer ↗
          </a>
        </div>
      </div>

      {/* Main IDE Layout */}
      <div className="flex-1 flex">


        {/* Explorer Panel */}
        <div className="w-64 bg-[#252526] border-r border-[#3e3e42] flex flex-col">
          <div className="p-3 border-b border-[#3e3e42] flex items-center justify-between">
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wide">Explorer</h3>
            <button 
              onClick={() => setIsNewFileModalOpen(true)}
              className="text-gray-400 hover:text-white text-lg hover:bg-[#3e3e42] w-6 h-6 rounded flex items-center justify-center transition-colors"
              title="New File"
            >
              +
            </button>
          </div>
          <div className="flex-1 p-2">
            <div className="space-y-1">
              {/* Contract Files */}
              {openFiles.map((fileName) => (
                <div 
                  key={fileName}
                  className={`flex items-center space-x-2 p-2 rounded cursor-pointer ${
                    currentFileName === fileName ? 'bg-[#37373d] text-white' : 'hover:bg-[#2a2d2e] text-gray-300'
                  }`}
                  onClick={() => {
                    setCurrentFileName(fileName)
                    const fileContent = fileContents[fileName] || ''
                    setContractCode(fileContent)
                  }}
                >
                  <span className="text-xs">📄</span>
                  <span className="text-sm">{fileName}</span>
                </div>
              ))}
              
              {/* Static Files */}
              <div className="flex items-center space-x-2 p-2 hover:bg-[#2a2d2e] rounded cursor-pointer text-gray-500">
                <span className="text-xs">⚙️</span>
                <span className="text-sm">hardhat.config.js</span>
              </div>
              <div className="flex items-center space-x-2 p-2 hover:bg-[#2a2d2e] rounded cursor-pointer text-gray-500">
                <span className="text-xs">📦</span>
                <span className="text-sm">package.json</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Tab Bar */}
          <div className="bg-[#2d2d30] border-b border-[#3e3e42] flex items-center px-2">
            <div className="flex items-center bg-[#1e1e1e] border-r border-[#3e3e42]">
              <div className="flex items-center space-x-2 px-4 py-2 bg-[#1e1e1e] text-white border-t-2 border-blue-500">
                <span className="text-xs">📄</span>
                <span className="text-sm">{currentFileName}</span>
                <button className="text-gray-400 hover:text-white ml-2">×</button>
              </div>
            </div>
          </div>

          {/* Editor Area */}
          <div className="flex-1 flex">
            {/* Code Editor */}
            <div className="flex-1 bg-[#1e1e1e]">
              <CodeEditor
                value={fileContents[currentFileName] || ''}
                onChange={(newCode) => {
                  setContractCode(newCode)
                  setFileContents(prev => ({
                    ...prev,
                    [currentFileName]: newCode
                  }))
                }}
                language="solidity"
                height="calc(100vh - 120px)"
              />
            </div>

            {/* Right Panel */}
            <div className="w-80 bg-[#252526] border-l border-[#3e3e42] flex flex-col">
              {/* Panel Header */}
              <div className="bg-[#2d2d30] border-b border-[#3e3e42] px-4 py-3">
                <h3 className="text-sm font-semibold text-gray-300">Contract Tools</h3>
              </div>

              {/* Panel Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 space-y-4">
                  <WalletInput 
                    onWalletChange={(key, address) => {
                      setPrivateKey(key)
                      setWalletAddress(address)
                    }}
                  />
                  
                  <ContractPanel
              contractCode={contractCode}
              isCompiling={isCompiling}
              isDeploying={isDeploying}
              compilationResult={compilationResult}
              deploymentResult={deploymentResult}
              onCompile={async () => {
                setIsCompiling(true)
                addTerminalLog(`$ Compiling ${currentFileName}...`)
                
                try {
                  // Try simple compiler first, fallback to hardhat
                  let response = await fetch('/api/compile-simple', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ code: contractCode })
                  })
                  
                  let result = await response.json()
                  
                  // If simple compiler fails, try hardhat
                  if (!result.success) {
                    addTerminalLog('Simple compiler failed, trying Hardhat...')
                    response = await fetch('/api/compile', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ code: contractCode })
                    })
                    result = await response.json()
                  }
                  
                  setCompilationResult(result)
                  
                  if (result.success) {
                    addTerminalLog('✅ Compilation successful!')
                    showToast('Contract compiled successfully!', 'success')
                  } else {
                    addTerminalLog(`❌ Compilation failed: ${result.error}`)
                    showToast('Compilation failed', 'error')
                  }
                } catch (error) {
                  const errorResult = { error: 'Compilation failed: ' + error }
                  setCompilationResult(errorResult)
                  addTerminalLog(`❌ Compilation error: ${error}`)
                  showToast('Compilation error occurred', 'error')
                } finally {
                  setIsCompiling(false)
                }
              }}
              onDeploy={async () => {
                if (!compilationResult?.success) return
                if (!privateKey) {
                  showToast('Please configure your wallet first', 'warning')
                  return
                }
                
                setIsDeploying(true)
                addTerminalLog(`$ Deploying ${currentFileName} to Creditcoin testnet...`)
                
                try {
                  const response = await fetch('/api/deploy', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                      bytecode: compilationResult.bytecode,
                      abi: compilationResult.abi,
                      privateKey: privateKey
                    })
                  })
                  const result = await response.json()
                  setDeploymentResult(result)
                  
                  if (result.success) {
                    addTerminalLog('🚀 Deployment successful!')
                    addTerminalLog(`📍 Contract: ${result.contractAddress}`)
                    addTerminalLog(`🔗 Transaction: ${result.transactionHash}`)
                    showToast('Contract deployed successfully!', 'success')
                  } else {
                    addTerminalLog(`❌ Deployment failed: ${result.error}`)
                    showToast('Deployment failed', 'error')
                  }
                } catch (error) {
                  const errorResult = { error: 'Deployment failed' }
                  setDeploymentResult(errorResult)
                  addTerminalLog(`❌ Deployment error: ${error}`)
                  showToast('Deployment error occurred', 'error')
                } finally {
                  setIsDeploying(false)
                }
              }}
              walletAddress={walletAddress}
              hasWallet={!!privateKey}
            />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Panel - Terminal/Output */}
          <div className="h-48 bg-[#1e1e1e] border-t border-[#3e3e42] flex flex-col">
            {/* Terminal Tabs */}
            <div className="bg-[#2d2d30] border-b border-[#3e3e42] flex items-center px-2">
              <button className="px-3 py-1 text-sm bg-[#1e1e1e] text-white border-t-2 border-green-500">
                Terminal
              </button>
              <button className="px-3 py-1 text-sm text-gray-400 hover:text-white hover:bg-[#3e3e42] transition-colors">
                Output
              </button>
              <button className="px-3 py-1 text-sm text-gray-400 hover:text-white hover:bg-[#3e3e42] transition-colors">
                Problems
              </button>
            </div>

            {/* Terminal Content */}
            <div className="flex-1 p-3 font-mono text-xs text-gray-300 bg-[#1e1e1e] overflow-y-auto">
              <div className="space-y-1">
                {terminalLogs.map((log, index) => (
                  <div key={index} className={`${
                    log.startsWith('$') ? 'text-green-400' : 
                    log.includes('✅') ? 'text-green-300' :
                    log.includes('❌') ? 'text-red-300' :
                    log.includes('🚀') ? 'text-blue-300' :
                    log.includes('📍') ? 'text-yellow-300' :
                    log.includes('🔗') ? 'text-cyan-300' :
                    'text-gray-400'
                  }`}>
                    {log}
                  </div>
                ))}
                <div className="flex items-center">
                  <span className="text-green-400">$ </span>
                  <div className="w-1 h-3 bg-white ml-1 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#007acc] text-white px-4 py-1 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-4">
          <span>Ln 1, Col 1</span>
          <span>Solidity</span>
          <span>UTF-8</span>
          <span>CRLF</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Chain ID: 102031</span>
          <span>Gas Price: 20 gwei</span>
          <span className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Connected</span>
          </span>
        </div>
      </div>

      {/* New File Modal */}
      <NewFileModal
        isOpen={isNewFileModalOpen}
        onClose={() => setIsNewFileModalOpen(false)}
        onConfirm={(fileName) => {
          const newFileName = fileName + '.sol'
          const newFileContent = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ${fileName} {
    // Your contract code here
}`
          
          setCurrentFileName(newFileName)
          setOpenFiles(prev => [...prev, newFileName])
          setFileContents(prev => ({
            ...prev,
            [newFileName]: newFileContent
          }))
          setContractCode(newFileContent)
          showToast(`Created new contract: ${newFileName}`, 'success')
        }}
      />

      {/* AI Assistant */}
      <AIAssistant contractCode={contractCode} />
    </div>
  )
}