import {
  ProfileCreated,
  PostCreated,
  MirrorCreated,
} from "./../generated/LensHub/LensHub";
import {
  AdminChanged as AdminChangedEvent,
  BeaconUpgraded as BeaconUpgradedEvent,
  Upgraded as UpgradedEvent,
} from "../generated/LensHubProxy/LensHubProxy";
import { Profile, Post, Mirror } from "../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";

export function handleProfileCreated(event: ProfileCreated): void {
  let profile = new Profile(event.params.profileId.toString());

  profile.creator = event.params.creator;
  profile.to = event.params.to;
  profile.handle = event.params.handle;
  profile.imageURI = event.params.imageURI;
  profile.followModule = event.params.followModule.toHexString();
  profile.followModuleReturnData = event.params.followModuleReturnData;
  profile.followNFTURI = event.params.followNFTURI;
  profile.timestamp = event.params.timestamp;

  profile.save();
}

export function handlePostCreated(event: PostCreated): void {
  let post = new Post(event.params.pubId.toString());

  post.profileId = event.params.profileId.toHexString();
  post.contentURI = event.params.contentURI;
  post.collectModule = event.params.collectModule;
  post.collectModuleReturnData = event.params.collectModuleReturnData;
  post.refernceModule = event.params.referenceModule;
  post.refenceModuleReturnData = event.params.referenceModuleReturnData;
  post.timestamp = event.params.timestamp;

  post.save();
}

export function handleMirrorCreated(event: MirrorCreated): void {
  let mirror = new Mirror(event.params.pubId.toString());

  mirror.profileId = event.params.profileId.toHexString();
  mirror.profileIdPointed = event.params.profileIdPointed;
  mirror.pubIdPointed = event.params.pubIdPointed;
  mirror.referenceModuleData = event.params.referenceModuleData;
  mirror.referenceModule = event.params.referenceModule;
  mirror.referenceModuleReturnData = event.params.referenceModuleReturnData;
  mirror.timestamp = event.params.timestamp;

  mirror.save();
}
