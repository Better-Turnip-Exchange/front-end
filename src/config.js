const dev = {
    api: {
        url: "https://bte-rest-api-x63xqdeyyq-uw.a.run.app/"

    }
}
const prod = {
    api: {
        url: "https://bte-rest-api-x63xqdeyyq-uw.a.run.app/"
    }
}

const config = process.env.REACT_APP === 'prod' ? prod : dev;
export default config;