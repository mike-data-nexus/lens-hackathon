# Lens Subgraph for SG Hack

[Lens Documentation](https://docs.lens.xyz/docs/deployed-contract-addresses)

[Subgraph Link](https://thegraph.com/hosted-service/subgraph/mike-data-nexus/lens-sg-hack)


# Lens Protocol Subgraph - Manual Testing QA Document (SG HACKATHON)

**Resources:**

Hosted Service:


https://thegraph.com/hosted-service/subgraph/mike-data-nexus/lens-sg-hack

This covers contract that emit events for the Lens Protocol


## Tests

### Test 1 ✅

- [x] Checking if an Account has created a profile and a  specific profileNFT has been minted to it. 

**PolygonScan Link**
https://polygonscan.com/tx/0x46808ad301b486e89fc8d68f30930f32a87a8bdb0c6b46113caa9002781985ad


**Query**

```

 {
   accounts
    (where:{id:"0x00000000ccd193975907ddb660b4692bb4257f9f"}) {
    id
    profile {
      id
    }
  } 
 
```

**Result**
```
  {
  "data": {
    "accounts": [
      {
        "id": "0x00000000ccd193975907ddb660b4692bb4257f9f",
        "profile": [
          {
            "id": "26490"
          }
        ]
      }
    ]
  }
}
```


---

### Test 2 ✅
- [x] Checking if the Post created is correct created for the user with the same profile ID.
**Polygonscan Link**
https://polygonscan.com/tx/0x799b14e85868fe4fe31427e750220185e09c0d03a89f4aa6421e1978f164db68


**Query**
```
{
    posts
    (orderBy: timestamp
    orderDirection: asc
    where:{id:"2270"}) {
      id
  profile{id}
  contentURI
  collectModule
  collectModuleReturnData
  refernceModule
  refenceModuleReturnData
  timestamp
    }
}
```
**Result**
```
{
  "data": {
    "posts": [
      {
        "id": "2270",
        "profile": {
          "id": "2592"
        },
        "contentURI": "https://data.lens.phaver.com/api/lens/posts/db99fb67-b14a-4d4d-8ef8-bf93db454829",
        "collectModule": "0x23b9467334beb345aaa6fd1545538f3d54436e96",
        "collectModuleReturnData": "0x0000000000000000000000000000000000000000000000000000000000000001",
        "refernceModule": "0x0000000000000000000000000000000000000000",
        "refenceModuleReturnData": "0x",
        "timestamp": "1655083668"
      }
    ]
  }
}
```


---

### Test 3 ✅
- [x] Checking if Profile created is created by a specific user ID with a specific handle  i.e **".lens"**
**PolygonScan Link**
https://polygonscan.com/tx/0x95301bba26683677eb858b6ed0ecd4c1b8db2acdf274fb1f04a2ad22a03ec1a4

**Query**
```
{
  profiles(where:{handle:"jouni.lens"}) {
 
  id
  creator
  owner{id}
  handle
  imageURI
  followModule
  followModuleReturnData
  followNFTURI
  timestamp
  post{id}
  mirror{id}
  }
 
}

```

**Result**

```
{
  "data": {
    "profiles": [
      {
        "id": "10",
        "creator": "0x1eec6eccaa4625da3fa6cd6339dbcc2418710e8a",
        "owner": {
          "id": "0xca1f6d7d8e902617f8bdd87866e00f9844c40a77"
        },
        "handle": "jouni.lens",
        "imageURI": "",
        "followModule": "0x057ccdf5153be1081830a6c3d507c9dfe1ac8e4e",
        "followModuleReturnData": "0x",
        "followNFTURI": "ipfs://QmP2kR1ZSbCSrpKSa5pdu7gB9E6jG6NS3KBVVkmgTgdcKx",
        "timestamp": "1652811450",
        "post": [],
        "mirror": []
      }
    ]
  }
}
```


---

### Test 4 ✅
- [x] Checking a random mirror created on a publication that was made by a specific address

**Polygonscan Link**
https://polygonscan.com/tx/0x50aa67264c1ca818a1ba98fd568bcca4343b4555bf0662e1ce6a6b95f283a793



**Query**
```
{
mirrors (first:1)

  {
  id
  profile{id}
  profileIdPointed
  pubIdPointed
  referenceModuleData
  referenceModule
  referenceModuleReturnData
  timestamp
}
}
```

**Result**
```
{
  "data": {
    "mirrors": [
      {
        "id": "1",
        "profile": {
          "id": "43798"
        },
        "profileIdPointed": "13",
        "pubIdPointed": "48",
        "referenceModuleData": "0x",
        "referenceModule": "0x0000000000000000000000000000000000000000",
        "referenceModuleReturnData": "0x",
        "timestamp": "1657893946"
      }
      ]
    }
      }
```





