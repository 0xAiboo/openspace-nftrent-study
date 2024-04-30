import {
  Approval as ApprovalEvent,
  Transfer as TransferEvent
} from "../generated/myToken/myToken"
import { Approval, Transfer, TokenHolder } from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  updateTokenBalance(entity);
}

const updateTokenBalance = (action: Transfer) => {
  //更新Token持仓
  // 先更新from地址，在更新to地址
  const fromInfo = TokenHolder.load(
    action.token.concat(action.from)
  );
  let toInfo = TokenHolder.load(
    action.token.concat(action.to)
  );
  if (fromInfo) {
    fromInfo.balance = fromInfo.balance.minus(action.value);
    fromInfo

  }
  if (toInfo) {
    toInfo.balance = toInfo.balance.plus(action.value);
  } else {
    toInfo = new TokenHolder(action.token.concat(action.to));
    toInfo.balance = action.value;
    // toInfo.holder = action.value;

  }
}