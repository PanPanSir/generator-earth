/**
 * Created by 战楼 on 16/7/5.
 * Email dewang.fdw@alibaba-inc.com
 */
"use strict";
require('colors');

/**
 * 执行结束提示
 * @param role {String}
 */
module.exports = (role) => {
    console.log(('\n · ' + role + ' initialization done, start happy coding now!😉\n').green);
    console.log((' · ️Need help?') + '  ===>  '.magenta + 'try ' + '"call fengdewang ~"\n'.green);
    console.log((' · Check webpack tasks && package.json?') + '  ===>  '.magenta + 'try ' + '"npm run [tasks]"\n'.green);
    // console.log((' · waiting for install scss_mixin ...\n').magenta);
};
