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
        console.log(await testing.balanceOf(owner.address));
    });

    it('verify multiple minting', async function () {

        let response = await testing.mintNFT(owner.address, "Testing Minting One");
        await response.wait();
        console.log(await testing.balanceOf(owner.address));
        let tokenId = await testing.balanceOf(owner.address);
        expect(tokenId.toString()).to.equal("1");

        response = await testing.mintNFT(owner.address, "Testing Minting Two");
        await response.wait();
        console.log(await testing.balanceOf(owner.address));
        tokenId = await testing.balanceOf(owner.address);
        expect(tokenId.toString()).to.equal("2");    
    });
});
