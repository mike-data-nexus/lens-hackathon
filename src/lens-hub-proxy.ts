import {
  ProfileCreated,
  PostCreated,
  MirrorCreated,
  Followed,
  FollowModuleSet,
  FollowNFTInitialized,
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
  //  ProfileFollowing,
  Protocol,
  FollowModule,
  Account,
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
  profile.timestamp = event.params.timestamp;

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
  post.timestamp = event.params.timestamp;

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
  mirror.timestamp = event.params.timestamp;

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
  profile.save();
}

// export function handleFollowNFTInitialized(event: FollowNFTInitialized): void {
//let followNFTInitialized = FollowNFTInitialized();

//export function handleFollowed(event: Followed): void {
//let followed = new Followed()

//load follower profile
// let follower = Profile.load(event.params.follower.toHexString());

//load following profile
// export function handle
// let profileFollowing = new ProfileFollowing();

// if (!profileFollowing) {
//   profileFollowing = new ProfileFollowing();

//   profileFollowing.follower = "blah";
// }
