import {
  ProfileCreated,
  PostCreated,
  MirrorCreated,
  FollowModuleSet,
  FollowNFTInitialized,
  Followed,
} from "./../generated/LensHub/LensHub";
import {
  AdminChanged as AdminChangedEvent,
  BeaconUpgraded as BeaconUpgradedEvent,
  Upgraded as UpgradedEvent,
} from "../generated/LensHubProxy/LensHubProxy";
import {
  Profile,
  Post,
  Mirror,
  Protocol,
  Followed as FollowedEntity,
  FollowModule,
  Account,
  FollowNFTDeployed,
  FollowNFTTransfered,
  FollowNFTURISet,
} from "../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";
import {
  GetProtocol,
  constants,
  GetOrCreateAccount,
  GetProfile,
} from "./utils";

export function handleProfileCreated(event: ProfileCreated): void {
  let protocol = GetProtocol();

  protocol.totalUsers = protocol.totalUsers.plus(constants.BIGINT_ONE);

  let account = GetOrCreateAccount(event.params.to);

  let profile = new Profile(event.params.profileId.toString());

  profile.creator = event.params.creator;
  profile.owner = account.id;
  profile.handle = event.params.handle;
  profile.imageURI = event.params.imageURI;
  profile.followModule = event.params.followModule.toHexString();
  profile.followModuleReturnData = event.params.followModuleReturnData;
  profile.followNFTURI = event.params.followNFTURI;
  profile.timestamp = event.block.timestamp;

  protocol.save();
  profile.save();
}

export function handlePostCreated(event: PostCreated): void {
  let post = new Post(event.params.pubId.toString());

  post.profile = event.params.profileId.toString();
  post.contentURI = event.params.contentURI;
  post.collectModule = event.params.collectModule;
  post.collectModuleReturnData = event.params.collectModuleReturnData;
  post.refernceModule = event.params.referenceModule;
  post.refenceModuleReturnData = event.params.referenceModuleReturnData;
  post.timestamp = event.block.timestamp;

  post.save();
}

export function handleMirrorCreated(event: MirrorCreated): void {
  let mirror = new Mirror(event.params.pubId.toString());

  mirror.profile = event.params.profileId.toString();
  mirror.profileIdPointed = event.params.profileIdPointed;
  mirror.pubIdPointed = event.params.pubIdPointed;
  mirror.referenceModuleData = event.params.referenceModuleData;
  mirror.referenceModule = event.params.referenceModule;
  mirror.referenceModuleReturnData = event.params.referenceModuleReturnData;
  mirror.timestamp = event.block.timestamp;

  mirror.save();
}

export function handleFollowModuleSet(event: FollowModuleSet): void {
  let followModule = FollowModule.load(event.params.followModule.toHexString());
  let profile = GetProfile(event.params.profileId);

  if (!followModule) {
    followModule = new FollowModule(event.params.followModule.toHexString());
  }

  followModule.profile = event.params.profileId.toString();
  followModule.save();
  profile.followModule = followModule.id;
  profile.timestamp = event.block.timestamp;
  profile.save();
}

export function handleFollowNFTDeployed(event: FollowNFTDeployed): void {}

export function handleFollowNFTTransfered(event: FollowNFTTransfered): void {}

export function handleFollowNFTURISet(event: FollowNFTURISet): void {}

export function handleFollowed(event: Followed): void {
  let followed = FollowedEntity.load(
    event.transaction.hash.toHexString() +
      "-" +
      event.transaction.index.toString()
  );

  if (!followed) {
    followed = new FollowedEntity(
      event.transaction.hash.toHexString() +
        "-" +
        event.transaction.index.toString()
    );

    followed.follower = event.params.follower;
    followed.profileIds = event.params.profileIds;
    followed.followModuleDatas = event.params.followModuleDatas;
    followed.timestamp = event.block.timestamp;
  }

  followed.save();
}
