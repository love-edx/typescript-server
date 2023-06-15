var axios = require("axios");
import { createHash, randomBytes } from 'crypto';

const BSTAMP_URL = {
    LOCAL: 'http://localhost:4005/v2/hash',
    DEVELOPMENT: 'https://api-edexagw.io-world.com/bstamp'
};


var config = {
    method: "post",
    url: BSTAMP_URL.LOCAL,
    headers: {
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJVMkZzZEdWa1gxL1VwWDZkNldyMzc0S0hXTFBoNWs2MVlkMnRMajZ1RlpGT254UHAvRzZMcTRKSGJVNG44dW1Na2cwTXdLVG9tMm9ZZ29VNy9MVDk2WjY1ZTZLNGd3MCtSWlFzSHM3RnRQZVZWSGNRS1NENmtaU2ZZMVpKeXdGWkF6YWw2QWNQZDN3ZE1yNVBDdGsxWUdHNTVIQlBPNHlHdWVFbHVwRW1BZ1FyV0ZxVVZDQTYyVU1MbGhVZXh0NXQxODRuOWp3TzQ1Q2V4WXNTcDhkQ1IzODVzL1NRRlY5eDJmUVhsb2JhUFdjPSIsImlhdCI6MTY4NjgzNTE3NCwiZXhwIjoxNjg3NDM5OTc0fQ.eth3KKeHSEnpZpt0H3VjLotMLYVZDhrLObpB6nm17Yw",
        "Content-Type": "application/json",
    },
    data: JSON.stringify({
        hash: Buffer.from(createHash('sha256').update(randomBytes(48).toString('hex')).digest('hex')).toString('base64'),
        userId: "1",
    })
};

export async function hashFunction() {
    try {
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
                return error;
            });
    } catch (error) {
        console.log(error);
    }
}
