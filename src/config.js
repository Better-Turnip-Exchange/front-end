const dev = {
    api: {
        url: "http://localhost:8080"
    }
}
const prod = {
    api: {
        url: "https://bte-rest-api-x63xqdeyyq-uw.a.run.app/"
    }
}

const config = process.env.REACT_APP === 'prod' ? prod : dev;
export default config;