import keys from '../config';
const fb = {
    initFB: function () {
        window.fbAsyncInit = function () {
            FB.init({
                appId: "295257131477564",
                autoLogAppEvents: true,
                xfbml: true,
                version: "v7.0",
            });
        };
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    },
    getLoginStatus: function () {
        window.FB.getLoginStatus((res) => {
            console.log(res);
            return res.status;
        })
    }
}
export default fb;