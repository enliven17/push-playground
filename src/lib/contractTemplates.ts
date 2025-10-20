import { ContractTemplate } from '@/types/contract'

export const CONTRACT_TEMPLATES: ContractTemplate[] = [
  {
    name: 'Simple Token',
    category: 'token',
    description: 'Basic ERC20-like token contract',
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SimpleToken {
    string public name = "My Token";
    string public symbol = "MTK";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    constructor(uint256 _initialSupply) {
        totalSupply = _initialSupply * 10**decimals;
        balanceOf[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }
    
    function transfer(address _to, uint256 _value) public returns (bool) {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        require(_to != address(0), "Invalid address");
        
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
    
    function approve(address _spender, uint256 _value) public returns (bool) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
    
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
        require(_value <= balanceOf[_from], "Insufficient balance");
        require(_value <= allowance[_from][msg.sender], "Insufficient allowance");
        require(_to != address(0), "Invalid address");
        
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        
        emit Transfer(_from, _to, _value);
        return true;
    }
}`
  },
  {
    name: 'Push Notification Manager',
    category: 'utility',
    description: 'Contract for managing push notifications',
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PushNotificationManager {
    mapping(address => string[]) public notifications;
    mapping(address => uint256) public notificationCount;
    mapping(address => bool) public authorizedSenders;
    
    address public owner;
    uint256 public maxNotifications = 100;
    
    event NotificationSent(address indexed user, string message, address sender);
    event SenderAuthorized(address indexed sender, bool authorized);
    event NotificationCleared(address indexed user, uint256 count);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }
    
    modifier onlyAuthorized() {
        require(authorizedSenders[msg.sender] || msg.sender == owner, "Not authorized");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        authorizedSenders[msg.sender] = true;
    }
    
    function sendNotification(address _user, string memory _message) public onlyAuthorized {
        require(bytes(_message).length > 0, "Message cannot be empty");
        
        // Remove oldest notification if at max capacity
        if (notifications[_user].length >= maxNotifications) {
            for (uint256 i = 0; i < notifications[_user].length - 1; i++) {
                notifications[_user][i] = notifications[_user][i + 1];
            }
            notifications[_user].pop();
        }
        
        notifications[_user].push(_message);
        notificationCount[_user]++;
        
        emit NotificationSent(_user, _message, msg.sender);
    }
    
    function getNotifications(address _user) public view returns (string[] memory) {
        return notifications[_user];
    }
    
    function getNotificationCount(address _user) public view returns (uint256) {
        return notificationCount[_user];
    }
    
    function clearNotifications(address _user) public {
        require(msg.sender == _user || msg.sender == owner, "Not authorized");
        
        uint256 count = notifications[_user].length;
        delete notifications[_user];
        
        emit NotificationCleared(_user, count);
    }
    
    function authorizeSender(address _sender, bool _authorized) public onlyOwner {
        authorizedSenders[_sender] = _authorized;
        emit SenderAuthorized(_sender, _authorized);
    }
    
    function setMaxNotifications(uint256 _maxNotifications) public onlyOwner {
        require(_maxNotifications > 0, "Max notifications must be greater than 0");
        maxNotifications = _maxNotifications;
    }
    
    function broadcastNotification(address[] memory _users, string memory _message) public onlyAuthorized {
        for (uint256 i = 0; i < _users.length; i++) {
            sendNotification(_users[i], _message);
        }
    }
}`
  },
  {
    name: 'Simple Voting',
    category: 'governance',
    description: 'Basic voting system',
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SimpleVoting {
    struct Proposal {
        string description;
        uint256 voteCount;
        uint256 deadline;
        bool executed;
        mapping(address => bool) hasVoted;
    }
    
    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;
    address public owner;
    
    event ProposalCreated(uint256 indexed proposalId, string description, uint256 deadline);
    event Voted(uint256 indexed proposalId, address indexed voter);
    event ProposalExecuted(uint256 indexed proposalId);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    function createProposal(string memory _description, uint256 _votingPeriod) public onlyOwner {
        uint256 proposalId = proposalCount++;
        Proposal storage proposal = proposals[proposalId];
        
        proposal.description = _description;
        proposal.deadline = block.timestamp + _votingPeriod;
        proposal.voteCount = 0;
        proposal.executed = false;
        
        emit ProposalCreated(proposalId, _description, proposal.deadline);
    }
    
    function vote(uint256 _proposalId) public {
        Proposal storage proposal = proposals[_proposalId];
        
        require(block.timestamp < proposal.deadline, "Voting period ended");
        require(!proposal.hasVoted[msg.sender], "Already voted");
        
        proposal.hasVoted[msg.sender] = true;
        proposal.voteCount++;
        
        emit Voted(_proposalId, msg.sender);
    }
    
    function executeProposal(uint256 _proposalId) public onlyOwner {
        Proposal storage proposal = proposals[_proposalId];
        
        require(block.timestamp >= proposal.deadline, "Voting still active");
        require(!proposal.executed, "Already executed");
        require(proposal.voteCount > 0, "No votes received");
        
        proposal.executed = true;
        emit ProposalExecuted(_proposalId);
    }
    
    function getProposal(uint256 _proposalId) public view returns (
        string memory description,
        uint256 voteCount,
        uint256 deadline,
        bool executed
    ) {
        Proposal storage proposal = proposals[_proposalId];
        return (proposal.description, proposal.voteCount, proposal.deadline, proposal.executed);
    }
    
    function hasVoted(uint256 _proposalId, address _voter) public view returns (bool) {
        return proposals[_proposalId].hasVoted[_voter];
    }
}`
  },
  {
    name: 'Simple Marketplace',
    category: 'defi',
    description: 'Basic NFT marketplace',
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SimpleMarketplace {
    struct Item {
        uint256 id;
        address seller;
        string name;
        string description;
        uint256 price;
        bool sold;
    }
    
    mapping(uint256 => Item) public items;
    uint256 public itemCount;
    uint256 public feePercent = 250; // 2.5%
    address public owner;
    
    event ItemListed(uint256 indexed itemId, address indexed seller, string name, uint256 price);
    event ItemSold(uint256 indexed itemId, address indexed buyer, address indexed seller, uint256 price);
    event ItemRemoved(uint256 indexed itemId);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    function listItem(string memory _name, string memory _description, uint256 _price) public {
        require(_price > 0, "Price must be greater than zero");
        
        uint256 itemId = itemCount++;
        items[itemId] = Item(
            itemId,
            msg.sender,
            _name,
            _description,
            _price,
            false
        );
        
        emit ItemListed(itemId, msg.sender, _name, _price);
    }
    
    function buyItem(uint256 _itemId) public payable {
        Item storage item = items[_itemId];
        
        require(_itemId < itemCount, "Item does not exist");
        require(!item.sold, "Item already sold");
        require(msg.value >= item.price, "Insufficient payment");
        require(msg.sender != item.seller, "Cannot buy your own item");
        
        // Calculate fee
        uint256 fee = (item.price * feePercent) / 10000;
        uint256 sellerAmount = item.price - fee;
        
        // Mark as sold
        item.sold = true;
        
        // Transfer payments
        payable(item.seller).transfer(sellerAmount);
        payable(owner).transfer(fee);
        
        // Refund excess payment
        if (msg.value > item.price) {
            payable(msg.sender).transfer(msg.value - item.price);
        }
        
        emit ItemSold(_itemId, msg.sender, item.seller, item.price);
    }
    
    function removeItem(uint256 _itemId) public {
        Item storage item = items[_itemId];
        
        require(_itemId < itemCount, "Item does not exist");
        require(msg.sender == item.seller || msg.sender == owner, "Not authorized");
        require(!item.sold, "Item already sold");
        
        item.sold = true; // Mark as removed
        emit ItemRemoved(_itemId);
    }
    
    function setFeePercent(uint256 _feePercent) public onlyOwner {
        require(_feePercent <= 1000, "Fee too high"); // Max 10%
        feePercent = _feePercent;
    }
    
    function getActiveItems() public view returns (uint256[] memory) {
        uint256 activeCount = 0;
        
        // Count active items
        for (uint256 i = 0; i < itemCount; i++) {
            if (!items[i].sold) {
                activeCount++;
            }
        }
        
        // Create array of active item IDs
        uint256[] memory activeItems = new uint256[](activeCount);
        uint256 index = 0;
        
        for (uint256 i = 0; i < itemCount; i++) {
            if (!items[i].sold) {
                activeItems[index] = i;
                index++;
            }
        }
        
        return activeItems;
    }
}`
  }
]

export function getTemplateByName(name: string): ContractTemplate | undefined {
  return CONTRACT_TEMPLATES.find(template => template.name === name)
}

export function getTemplatesByCategory(category: string): ContractTemplate[] {
  return CONTRACT_TEMPLATES.filter(template => template.category === category)
}