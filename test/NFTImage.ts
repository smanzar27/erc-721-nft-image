import {expect} from "chai";
import {ethers} from "hardhat";
import {BigNumber} from "bignumber.js";

describe("Testing MyNFT Contract", async function () {
    let owner, testing;

    beforeEach(async function()  {
        
        [owner] = await ethers.getSigners();
//        console.log("Signers Address: ", owner);

        const Testing = await ethers.getContractFactory("MyNFT");
        testing = await Testing.deploy();
        testing = await testing.deployed();
        let events = testing.events;
        console.log("Testing Contract Deployed With Address: ", testing.address);  
       });

//     it('correctly mints a nft', async function() {
//         const tokenURI= "https://gateway.pinata.cloud/ipfs/Qmby82GBf46UcGTc3DYDb3Ch1KKgVQz5LfxkJQ4mFkN59Z";
//         myNFT.mintNFT(owner,tokenURI);
//         console.log(myNFT._tokenIds);
//   });

    it('verify constructor', async function () {
        const response = await testing.owner();
        expect(response).to.equal(owner.address);

        let logging = await testing.deployTransaction.wait();
        let events = logging.events;
        for (const event of events) {
            console.log(`Event ${event.event} with args ${event.args}`);
        }
        let testEvent = events.filter(({event}) => event == 'TokenEvent')[0];
        expect(testEvent.args.data).to.equal("ZTM Token Constructed");
    });

    it('verify minting', async function () {
        const response = await testing.mintNFT(owner.address, "Testing Minting");
        expect(response.from).to.equal(owner.address);

        const logging = await response.wait()
        let events = logging.events;
        for (const event of events) {
            console.log(`Event ${event.event} with args ${event.args}`);
        }
        let testEvent = events.filter(({event}) => event == 'Transfer')[0];
        const tokenId = testEvent.args.tokenId;
        console.log(tokenId.toString());
        expect(tokenId.toString()).to.equal("1");
    });

    it('verify multiple minting', async function () {
        let response = await testing.mintNFT(owner.address, "Testing Minting One");
        expect(response.from).to.equal(owner.address);

        let logging = await response.wait()
        let events = logging.events;
        for (const event of events) {
            console.log(`Event ${event.event} with args ${event.args}`);
        }
        let testEvent = events.filter(({event}) => event == 'Transfer')[0];
        let tokenId = testEvent.args.tokenId;
        console.log(tokenId.toString());
        expect(tokenId.toString()).to.equal("1");

        response = await testing.mintNFT(owner.address, "Testing Minting Two");
        expect(response.from).to.equal(owner.address);

        logging = await response.wait()
        events = logging.events;
        for (const event of events) {
            console.log(`Event ${event.event} with args ${event.args}`);
        }
        testEvent = events.filter(({event}) => event == 'Transfer')[0];
        tokenId = testEvent.args.tokenId;
        console.log(tokenId.toString());
        expect(tokenId.toString()).to.equal("2");  
    });
});
