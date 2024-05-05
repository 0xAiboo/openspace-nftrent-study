import { BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts"
import { ERC721 as ERC721Contract, Transfer } from '../generated/templates/ERC721/ERC721'
import { TokenInfo } from '../generated/schema'
export function handleTransfer(event: Transfer): void {
    const s2nft = ERC721Contract.bind(event.address)
    const tokenId = event.params.tokenId
    const tokenURI = s2nft.tokenURI(tokenId)
    const owner = event.params.to
    const tokenInfo = new TokenInfo(tokenId.toString() + "-" + event.address.toHex())
    tokenInfo.ca = event.address
    tokenInfo.tokenId = tokenId
    tokenInfo.tokenURL = tokenURI
    tokenInfo.name = s2nft.name() // 假设合约有 name() 函数
    tokenInfo.owner = owner
    tokenInfo.blockNumber = event.block.number
    tokenInfo.blockTimestamp = event.block.timestamp
    tokenInfo.transactionHash = event.transaction.hash

    tokenInfo.save()
}