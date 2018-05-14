const URL_PREFIX = process.env.NODE_ENV === 'development' ?
    `//${window.location.host}` :
    `//${window.location.host}/app/lottery_m/index.html`;

export {
    URL_PREFIX,
}