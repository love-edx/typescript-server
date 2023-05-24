
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { helloWorld } from "../server";

chai.use(chaiHttp);

describe('', function () {
    it('It should return hello-world', function (done) {
        const indexFunction = helloWorld();
        indexFunction.then(data => {
            expect(data)
            done()
        }).catch(error => {
            done(new Error(error.message));
        })
    });
})