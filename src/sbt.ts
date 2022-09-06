import { log, Address } from "@graphprotocol/graph-ts"
import {
  Attest,
  Burn,
  Revoke
} from "../generated/SBT/SBT"
import { 
  SBT
} from "../generated/schema"

const statusValid = "Valid"
const statusBurned = "Burned"
const statusRevoked = "Revoked"

export function handleAttest(event: Attest): void {
    let owner = event.params.to;
    let id = event.params.tokenId;

    let sbt = new SBT(id.toString());
    sbt.owner = owner;
    sbt.status = statusValid;
    sbt.attestBlock = event.block.number;
    sbt.attestTx = event.transaction.hash;
    sbt.save();
}

export function handleBurn(event: Burn): void {
    let id = event.params.tokenId;
    let sbt = SBT.load(id.toString());
    if (sbt === null) {
        log.error("SBT {} not exist", [id.toString()]);
        return;
    }
    sbt.status = statusBurned;
    sbt.save();
}

export function handleRevoke(event: Revoke): void {
    let id = event.params.tokenId;
    let sbt = SBT.load(id.toString());
    if (sbt === null) {
        log.error("SBT {} not exist", [id.toString()]);
        return;
    }
    sbt.status = statusRevoked;
    sbt.save();
}
