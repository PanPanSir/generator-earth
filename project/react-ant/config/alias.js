const path = require('path');

module.exports = {
    commons: path.resolve('src/components_common/'),
    components: path.resolve('src/components/'),
    tools: path.resolve('src/tools/'),
    api: path.resolve('src/api/'),
    config: path.resolve('src/config'),
    public: path.resolve('public/'),
    scss: path.resolve('src/scss_mixin/scss/'),
    scss_mixin: path.resolve('src/scss_mixin/'),
    app_scss: path.resolve('src/static/scss/'),
    ROOT_SOURCE: path.resolve('src'),
    INDEX_ROOT_SOURCE: path.resolve('src/pages/index/')
};
