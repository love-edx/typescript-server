
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { helloWorld } from "../server";
import { exit } from "process";

chai.use(chaiHttp);

describe('', function () {
    it('It should return hello-world', function (done) {
        const indexFunction = helloWorld();
        indexFunction.then(data => {
            expect(data).to.be.an('object').with.all.keys('status', 'message');
            expect(data.status).to.be.an('number');
            expect(data.message).to.be.an('number');
            done()
        }).catch(error => {
            done(new Error(error.message));
        });
        after(() => {
            exit()
        })
    });
})
