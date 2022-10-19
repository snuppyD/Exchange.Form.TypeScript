import crypto from "crypto";

function getSignature(queryString: string, stockName: string) : string{
    switch (stockName){
        case 'binance':
            return crypto
                .createHmac('sha256',typeof process.env.BINANCE_SECRET_API_KEY === 'string' ? process.env.BINANCE_SECRET_API_KEY : '')
                .update(queryString)
                .digest('hex');

        case 'kuna':
            return crypto
                .createHmac('sha384',  typeof process.env.KUNA_SECRET_API_KEY === 'string' ? process.env.KUNA_SECRET_API_KEY : '')
                .update(queryString)
                .digest('hex');
        default:
            throw new Error(`Wrong stockName "${stockName}"`)
    }
}

export default getSignature;

