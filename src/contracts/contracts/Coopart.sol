// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import '../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '../node_modules/@openzeppelin/contracts/access/Ownable.sol';
import '../node_modules/@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '../node_modules/@openzeppelin/contracts/utils/Counters.sol';

contract Coopart is ERC721, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(uint256 => TokenMeta) private _tokenMeta;
    mapping(uint256 => address) private _creators;

    string baseURI;

    Counters.Counter layerCount;
    mapping(uint256 => Layer) private layers;
    struct Layer {
        string imageUri;
        address author;
        uint256 upVotes;
        uint256 downVotes;
    }

    struct TokenMeta {
        uint256 id;
        uint256 price;
        string name;
        string uri;
        bool isOnSale;
        uint256[] layerIds;
    }

    constructor() ERC721('Coop.art', 'COOPART') {}

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory _newBaseURI) public virtual onlyOwner {
        baseURI = _newBaseURI;
    }

    function setTokenMeta(uint256 _tokenId, TokenMeta memory _meta) public {
        require(_exists(_tokenId));
        require(ownerOf(_tokenId) == _msgSender());
        _tokenMeta[_tokenId] = _meta;
    }

    function updateTokenMetaUri(uint256 _tokenId, string memory _uri) public {
        require(_exists(_tokenId));
        require(ownerOf(_tokenId) == _msgSender());
        _tokenMeta[_tokenId].uri = _uri;
    }

    function tokenMeta(uint256 _tokenId) public view returns (TokenMeta memory) {
        require(_exists(_tokenId));
        return _tokenMeta[_tokenId];
    }

    function upVote(uint256 layerId) public {
        layers[layerId].upVotes += 1;
    }

    function downVote(uint256 layerId) public {
        layers[layerId].downVotes += 1;
    }

    function getLayer(uint256 layerId) public view returns (Layer memory) {
        return (layers[layerId]);
    }

    function addLayer(
        uint256 _canvasId,
        string memory _imageUri,
        address _author
    ) public returns (uint256) {
        layerCount.increment();
        uint256 newLayerId = layerCount.current();
        layers[newLayerId] = Layer(_imageUri, _author, 0, 0);
        // _tokenMeta[_canvasId].push(newLayerId);
        TokenMeta storage meta = _tokenMeta[_canvasId];
        meta.layerIds.push(newLayerId);
        setTokenMeta(_canvasId, meta);
        return newLayerId;
    }

    function mintCanvas(
        address _owner,
        string memory _tokenURI,
        string memory _name,
        uint256 _price,
        bool _isOnSale
    ) public returns (uint256) {
        require(_price > 0);
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(_owner, newItemId);
        _creators[newItemId] = msg.sender;
        uint256[] memory layersIds;
        TokenMeta memory meta = TokenMeta(newItemId, _price, _name, _tokenURI, _isOnSale, layersIds);
        setTokenMeta(newItemId, meta);
        return newItemId;
    }
}
