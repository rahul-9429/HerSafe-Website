

pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract hersafe {
   
    event VideoStored(address indexed user, string ipfsHash, uint256 timestamp);
    
   
    struct Video {
        string ipfsHash;
        uint256 timestamp;
    }
    
    
    mapping(address => Video[]) private userVideos;
    
   
    uint256 public totalVideosStored;
    
    /**
     * @dev Store a video's IPFS hash and timestamp
     * @param _ipfsHash The IPFS hash of the video
     * @param _timestamp The timestamp when the video was recorded
     */
    function storeVideo(string memory _ipfsHash, uint256 _timestamp) public {
        require(bytes(_ipfsHash).length > 0, "IPFS hash cannot be empty");
        require(_timestamp > 0, "Timestamp must be valid");
        
        userVideos[msg.sender].push(Video(_ipfsHash, _timestamp));
        totalVideosStored++;
        
        emit VideoStored(msg.sender, _ipfsHash, _timestamp);
    }
    
    /**
     * @dev Get all videos stored by the caller
     * @return Array of Video structs
     */
    function getMyVideos() public view returns (Video[] memory) {
        return userVideos[msg.sender];
    }
    
    /**
     * @dev Get the number of videos stored by a specific user
     * @param _user The address of the user
     * @return Number of videos stored
     */
    function getUserVideoCount(address _user) public view returns (uint256) {
        return userVideos[_user].length;
    }
    
    /**
     * @dev Get the most recent video stored by the caller
     * @return The most recent Video struct or an empty struct if no videos
     */
    function getMyMostRecentVideo() public view returns (Video memory) {
        if (userVideos[msg.sender].length == 0) {
            return Video("", 0);
        }
        
        return userVideos[msg.sender][userVideos[msg.sender].length - 1];
    }
    
    /**
     * @dev Check if a video with a specific IPFS hash exists for the caller
     * @param _ipfsHash The IPFS hash to check
     * @return True if the video exists, false otherwise
     */
    function videoExists(string memory _ipfsHash) public view returns (bool) {
        for (uint i = 0; i < userVideos[msg.sender].length; i++) {
            if (keccak256(bytes(userVideos[msg.sender][i].ipfsHash)) == keccak256(bytes(_ipfsHash))) {
                return true;
            }
        }
        return false;
    }
}
